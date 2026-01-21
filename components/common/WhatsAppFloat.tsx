'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppAnalytics from '@/lib/whatsapp-analytics';

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Show button after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Auto-show tooltip on first load
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 4000);
      }, 1000);
      return () => clearTimeout(tooltipTimer);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const whatsappNumber = '6281235003655';
  const defaultMessage = encodeURIComponent(
    'Halo, saya ingin informasi mengenai pupuk dari PT Centra Biotech Indonesia.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  // Handle click tracking
  const handleClick = () => {
    // Track the click
    WhatsAppAnalytics.trackClick();
    
    // Log to console for verification
    console.log('WhatsApp button clicked! Total local clicks:', WhatsAppAnalytics.getLocalClickCount());
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="fixed bottom-6 right-6 z-50"
          onMouseEnter={() => {
            setIsHovered(true);
            setShowTooltip(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setShowTooltip(false);
          }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-full right-0 mb-3 mr-2 pointer-events-none"
              >
                <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200 min-w-max max-w-xs">
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    Ada pertanyaan?
                  </p>
                  <p className="text-xs text-gray-600">
                    Chat dengan kami via WhatsApp
                  </p>
                  {/* Arrow */}
                  <div className="absolute bottom-0 right-6 transform translate-y-1/2">
                    <div className="w-3 h-3 bg-white border-r border-b border-gray-200 rotate-45"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp Button */}
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative"
            onClick={handleClick}
          >
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="relative"
            >
              {/* Pulse animation rings */}
              <motion.div
                animate={{
                  scale: [1, 1.4, 1.4],
                  opacity: [0.7, 0, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                className="absolute inset-0 rounded-full bg-green-500"
              />
              <motion.div
                animate={{
                  scale: [1, 1.4, 1.4],
                  opacity: [0.7, 0, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: 0.5,
                }}
                className="absolute inset-0 rounded-full bg-green-500"
              />

              {/* Main button */}
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="relative w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {/* Shine effect */}
                <motion.div
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />

                {/* WhatsApp Icon */}
                <svg
                  className="w-9 h-9 text-white relative z-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>

                {/* Notification badge */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
                >
                  <span className="text-[9px] font-bold text-white">1</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
