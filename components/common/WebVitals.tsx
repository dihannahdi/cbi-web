"use client";

/**
 * WEB VITALS MONITORING COMPONENT
 * =================================
 * Comprehensive Core Web Vitals tracking for GSC 2025-2026 standards
 * Includes INP (Interaction to Next Paint), LCP, CLS, FCP, TTFB
 * With attribution for detailed debugging and GA4 integration
 * 
 * @version 2.0.0
 * @date 2026-01-19
 */

import { useEffect, useCallback } from "react";
import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from "web-vitals";

// Extended window interface for gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      target: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

// Web Vitals thresholds (2025-2026 standards)
const VITALS_THRESHOLDS = {
  // INP: Good < 200ms, Needs Improvement 200-500ms, Poor > 500ms
  INP: { good: 200, poor: 500 },
  // LCP: Good < 2.5s, Needs Improvement 2.5-4s, Poor > 4s
  LCP: { good: 2500, poor: 4000 },
  // CLS: Good < 0.1, Needs Improvement 0.1-0.25, Poor > 0.25
  CLS: { good: 0.1, poor: 0.25 },
  // FCP: Good < 1.8s, Needs Improvement 1.8-3s, Poor > 3s
  FCP: { good: 1800, poor: 3000 },
  // TTFB: Good < 800ms, Needs Improvement 800-1800ms, Poor > 1800ms
  TTFB: { good: 800, poor: 1800 },
};

interface VitalsData {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  id: string;
  delta: number;
  navigationType: string;
  attribution?: Record<string, unknown>;
}

/**
 * Send Web Vitals to Google Analytics 4
 */
function sendToAnalytics(metric: Metric): void {
  if (typeof window === "undefined" || !window.gtag) return;

  const vitalsData: VitalsData = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    id: metric.id,
    delta: metric.delta,
    navigationType: metric.navigationType,
  };

  // Send to GA4 as custom event
  window.gtag("event", metric.name, {
    // Use delta for summing purposes
    value: Math.round(metric.name === "CLS" ? metric.delta * 1000 : metric.delta),
    // Custom parameters
    metric_id: metric.id,
    metric_value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
    metric_rating: metric.rating,
    metric_delta: Math.round(metric.name === "CLS" ? metric.delta * 1000 : metric.delta),
    navigation_type: metric.navigationType,
    // Avoid affecting bounce rate
    non_interaction: true,
    // Debug info for development
    debug_target: getDebugTarget(metric),
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      entries: metric.entries,
    });
  }
}

/**
 * Get debug target information from metric entries
 */
function getDebugTarget(metric: Metric): string {
  const firstEntry = metric.entries[0];
  if (!firstEntry) return "unknown";

  switch (metric.name) {
    case "LCP":
      // LargestContentfulPaint entry has element property
      return (firstEntry as PerformanceEntry & { element?: Element }).element?.tagName || "unknown";
    case "INP":
      // PerformanceEventTiming has target property
      return (firstEntry as PerformanceEntry & { target?: Element }).target?.tagName || "unknown";
    case "CLS":
      // LayoutShift entries have sources
      const sources = (firstEntry as PerformanceEntry & { sources?: Array<{ node?: Element }> }).sources;
      return sources?.[0]?.node?.tagName || "unknown";
    default:
      return firstEntry.name || "unknown";
  }
}

/**
 * Batch metrics for efficient sending
 */
const metricsQueue = new Set<Metric>();

function addToQueue(metric: Metric): void {
  metricsQueue.add(metric);
  sendToAnalytics(metric);
}

function flushQueue(): void {
  if (metricsQueue.size === 0) return;
  
  // Could send batched data to custom analytics endpoint
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    const body = JSON.stringify(
      [...metricsQueue].map((m) => ({
        name: m.name,
        value: m.value,
        id: m.id,
        rating: m.rating,
        delta: m.delta,
        navigationType: m.navigationType,
        timestamp: Date.now(),
        url: typeof window !== "undefined" ? window.location.href : "",
      }))
    );

    // Use sendBeacon for reliable delivery during page unload
    if (navigator.sendBeacon) {
      navigator.sendBeacon(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, body);
    }
  }
  
  metricsQueue.clear();
}

/**
 * Main Web Vitals component
 * Tracks all Core Web Vitals and sends to GA4
 */
export default function WebVitals(): null {
  const handleMetric = useCallback((metric: Metric) => {
    addToQueue(metric);
  }, []);

  useEffect(() => {
    // Register all Web Vitals listeners
    // INP (Interaction to Next Paint) - NEW Core Web Vital replacing FID
    onINP(handleMetric, { reportAllChanges: true });
    
    // LCP (Largest Contentful Paint) - Loading performance
    onLCP(handleMetric, { reportAllChanges: true });
    
    // CLS (Cumulative Layout Shift) - Visual stability
    onCLS(handleMetric, { reportAllChanges: true });
    
    // FCP (First Contentful Paint) - Initial render
    onFCP(handleMetric);
    
    // TTFB (Time to First Byte) - Server response time
    onTTFB(handleMetric);

    // Flush queue when page is hidden or unloaded
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flushQueue();
      }
    };

    const handlePageHide = () => {
      flushQueue();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [handleMetric]);

  return null;
}

/**
 * Export thresholds for use in other components
 */
export { VITALS_THRESHOLDS };

/**
 * Export utility to check if a value meets the "good" threshold
 */
export function isGoodVital(name: keyof typeof VITALS_THRESHOLDS, value: number): boolean {
  return value <= VITALS_THRESHOLDS[name].good;
}

/**
 * Export utility to get rating based on value
 */
export function getVitalRating(
  name: keyof typeof VITALS_THRESHOLDS,
  value: number
): "good" | "needs-improvement" | "poor" {
  const thresholds = VITALS_THRESHOLDS[name];
  if (value <= thresholds.good) return "good";
  if (value <= thresholds.poor) return "needs-improvement";
  return "poor";
}
