// WhatsApp Button Analytics Tracker
// Tracks button clicks with multiple methods for redundancy

interface ClickEvent {
  timestamp: string;
  page: string;
  userAgent: string;
  referrer: string;
  locale: string;
}

class WhatsAppAnalytics {
  private static readonly STORAGE_KEY = 'wa_button_clicks';
  private static readonly API_ENDPOINT = '/api/analytics/whatsapp-click';

  /**
   * Track WhatsApp button click
   * Uses multiple tracking methods for reliability
   */
  static async trackClick(): Promise<void> {
    const clickData: ClickEvent = {
      timestamp: new Date().toISOString(),
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      locale: typeof navigator !== 'undefined' ? navigator.language : '',
    };

    // Method 1: Google Analytics 4 (if available)
    this.trackWithGA4(clickData);

    // Method 2: Local Storage (for backup counting)
    this.trackLocally(clickData);

    // Method 3: API Endpoint (for server-side logging)
    this.trackWithAPI(clickData);
  }

  /**
   * Track with Google Analytics 4
   */
  private static trackWithGA4(data: ClickEvent): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_button_click', {
        event_category: 'engagement',
        event_label: 'WhatsApp Float Button',
        page_path: data.page,
        timestamp: data.timestamp,
        user_locale: data.locale,
      });
      console.log('✅ Tracked with GA4');
    }
  }

  /**
   * Track in Local Storage
   */
  private static trackLocally(data: ClickEvent): void {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      const clicks: ClickEvent[] = stored ? JSON.parse(stored) : [];
      
      // Keep only last 100 clicks to avoid storage limits
      if (clicks.length >= 100) {
        clicks.shift();
      }
      
      clicks.push(data);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(clicks));
      console.log('✅ Tracked locally, total clicks:', clicks.length);
    } catch (error) {
      console.error('Local tracking error:', error);
    }
  }

  /**
   * Track with API endpoint
   */
  private static async trackWithAPI(data: ClickEvent): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      console.log('✅ Tracked with API');
    } catch (error) {
      console.error('API tracking error:', error);
      // Silent fail - don't disrupt user experience
    }
  }

  /**
   * Get local click count
   */
  static getLocalClickCount(): number {
    if (typeof window === 'undefined') return 0;

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      const clicks: ClickEvent[] = stored ? JSON.parse(stored) : [];
      return clicks.length;
    } catch {
      return 0;
    }
  }

  /**
   * Get all local click data
   */
  static getLocalClickData(): ClickEvent[] {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
}

export default WhatsAppAnalytics;
