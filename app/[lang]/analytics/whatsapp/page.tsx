'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnalyticsData {
  totalClicks: number;
  lastUpdated: string | null;
  recentClicks: Array<{
    timestamp: string;
    page: string;
    locale: string;
  }>;
}

export default function WhatsAppAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [localClicks, setLocalClicks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
    
    // Check local storage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('wa_button_clicks');
        const clicks = stored ? JSON.parse(stored) : [];
        setLocalClicks(clicks.length);
      } catch (err) {
        console.error('Error reading local storage:', err);
      }
    }

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics/whatsapp-click');
      const data = await response.json();
      setAnalytics(data);
      setError(null);
    } catch (err) {
      setError('Failed to load analytics');
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📊 WhatsApp Button Analytics
          </h1>
          <p className="text-gray-600">
            Track engagement with your WhatsApp contact button
          </p>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
          >
            <p className="text-red-800">{error}</p>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && !analytics ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading analytics...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {/* Total Clicks Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Clicks (Server)
                </h3>
                <span className="text-3xl">🖱️</span>
              </div>
              <div className="text-4xl font-bold text-green-600">
                {analytics?.totalClicks || 0}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                All-time button clicks
              </p>
            </motion.div>

            {/* Local Storage Clicks */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Local Clicks
                </h3>
                <span className="text-3xl">💾</span>
              </div>
              <div className="text-4xl font-bold text-blue-600">
                {localClicks}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Clicks from this browser
              </p>
            </motion.div>

            {/* Last Updated */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Last Updated
                </h3>
                <span className="text-3xl">🕐</span>
              </div>
              <div className="text-sm font-medium text-purple-600">
                {analytics?.lastUpdated
                  ? formatDate(analytics.lastUpdated)
                  : 'No data yet'}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Most recent activity
              </p>
            </motion.div>
          </div>
        )}

        {/* Recent Clicks Table */}
        {analytics && analytics.recentClicks && analytics.recentClicks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-blue-600">
              <h2 className="text-xl font-semibold text-white">
                Recent Clicks (Last 10)
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Page
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Locale
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analytics.recentClicks.map((click, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(click.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {click.page || '/'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {click.locale || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Refresh Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <button
            onClick={fetchAnalytics}
            disabled={loading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg"
          >
            {loading ? 'Refreshing...' : '🔄 Refresh Data'}
          </button>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📝 How it works
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Every time someone clicks the WhatsApp floating button, it's
                tracked automatically
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Data is stored in <code className="bg-blue-100 px-1 rounded">data/whatsapp-clicks.json</code> file on the server
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Local clicks show data from your browser only (useful for testing)
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Page automatically refreshes data every 30 seconds
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                For Google Analytics integration, add your GA4 tracking code to the site
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
