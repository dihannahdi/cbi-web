import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cbi-backend.my.id",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "9337",
      },
      {
        protocol: "http",
        hostname: "213.210.21.45",
        port: "9337",
      },
    ],
    // Disable optimization for external images to avoid Vercel 402 errors
    unoptimized: false,
    // Optimize image formats
    formats: ['image/avif', 'image/webp'],
    // Minimize image sizes for performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable blur placeholder
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Add loader config to bypass Vercel's image optimization for external URLs
    loader: 'default',
  },
  
  // Enable compression
  compress: true,
  
  // Generate source maps for production (for error tracking)
  productionBrowserSourceMaps: false,
  
  // Strict mode for better development
  reactStrictMode: true,
  
  // Power TypeScript checking
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Security and performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security Headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache JavaScript and CSS
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Redirects for SEO (handle trailing slashes, old routes, etc.)
  // NOTE: www to non-www redirect is handled by Vercel domain settings
  // Do NOT add www redirect here to avoid redirect loops
  async redirects() {
    return [
      // SEO Optimization: Product section URL restructure for INDONESIAN only
      // Indonesian uses produk-layanan paths, English uses product paths
      {
        source: '/id/product',
        destination: '/id/produk-layanan',
        permanent: true, // 301 redirect for SEO
      },
      {
        source: '/id/product/agriculture',
        destination: '/id/produk-layanan/pertanian',
        permanent: true, // 301 redirect for SEO
      },
      {
        source: '/id/product/livestock',
        destination: '/id/produk-layanan/peternakan',
        permanent: true, // 301 redirect for SEO
      },
      {
        source: '/id/product/fishery',
        destination: '/id/produk-layanan/perikanan',
        permanent: true, // 301 redirect for SEO
      },
      // SEO Optimization: RAJABIO URL restructure
      {
        source: '/:lang(id|en)/rajabio-pupuk-organik-cair',
        destination: '/:lang/produk-layanan/pertanian/rajabio-pupuk-organik',
        permanent: true, // 301 redirect for SEO
      },
      {
        source: '/:lang(id|en)/produk/pertanian/rajabio-pupuk-organik-cair',
        destination: '/:lang/produk-layanan/pertanian/rajabio-pupuk-organik',
        permanent: true, // 301 redirect for SEO
      },
      // Fix common URL mistakes - mixing language prefixes (Indonesian locale with English words)
      {
        source: '/id/produk-layanan/agriculture',
        destination: '/id/produk-layanan/pertanian',
        permanent: true,
      },
      {
        source: '/id/produk-layanan/agriculture/:slug*',
        destination: '/id/produk-layanan/pertanian/:slug*',
        permanent: true,
      },
      {
        source: '/id/produk-layanan/livestock',
        destination: '/id/produk-layanan/peternakan',
        permanent: true,
      },
      {
        source: '/id/produk-layanan/livestock/:slug*',
        destination: '/id/produk-layanan/peternakan/:slug*',
        permanent: true,
      },
      {
        source: '/id/produk-layanan/fishery',
        destination: '/id/produk-layanan/perikanan',
        permanent: true,
      },
      {
        source: '/id/produk-layanan/fishery/:slug*',
        destination: '/id/produk-layanan/perikanan/:slug*',
        permanent: true,
      },
      {
        source: '/id/product/:path*',
        destination: '/id/produk-layanan/:path*',
        permanent: true,
      },
      // Fix English locale with mixed path words (produk-layanan + English category)
      // These redirect to the proper Indonesian path structure which supports both languages
      {
        source: '/en/produk-layanan/agriculture',
        destination: '/en/produk-layanan/pertanian',
        permanent: true,
      },
      {
        source: '/en/produk-layanan/agriculture/:slug*',
        destination: '/en/produk-layanan/pertanian/:slug*',
        permanent: true,
      },
      {
        source: '/en/produk-layanan/livestock',
        destination: '/en/produk-layanan/peternakan',
        permanent: true,
      },
      {
        source: '/en/produk-layanan/livestock/:slug*',
        destination: '/en/produk-layanan/peternakan/:slug*',
        permanent: true,
      },
      {
        source: '/en/produk-layanan/fishery',
        destination: '/en/produk-layanan/perikanan',
        permanent: true,
      },
      {
        source: '/en/produk-layanan/fishery/:slug*',
        destination: '/en/produk-layanan/perikanan/:slug*',
        permanent: true,
      },
      // Redirect English /product paths to Indonesian /produk-layanan paths (which support both languages)
      {
        source: '/en/product',
        destination: '/en/produk-layanan',
        permanent: true,
      },
      {
        source: '/en/product/agriculture',
        destination: '/en/produk-layanan/pertanian',
        permanent: true,
      },
      {
        source: '/en/product/agriculture/:slug*',
        destination: '/en/produk-layanan/pertanian/:slug*',
        permanent: true,
      },
      {
        source: '/en/product/livestock',
        destination: '/en/produk-layanan/peternakan',
        permanent: true,
      },
      {
        source: '/en/product/livestock/:slug*',
        destination: '/en/produk-layanan/peternakan/:slug*',
        permanent: true,
      },
      {
        source: '/en/product/fishery',
        destination: '/en/produk-layanan/perikanan',
        permanent: true,
      },
      {
        source: '/en/product/fishery/:slug*',
        destination: '/en/produk-layanan/perikanan/:slug*',
        permanent: true,
      },
      // Fix incorrect mixed language URLs (someone types Indonesian category in English /product/ path)
      {
        source: '/en/product/pertanian',
        destination: '/en/produk-layanan/pertanian',
        permanent: true,
      },
      {
        source: '/en/product/pertanian/:path*',
        destination: '/en/produk-layanan/pertanian/:path*',
        permanent: true,
      },
      {
        source: '/en/product/peternakan',
        destination: '/en/produk-layanan/peternakan',
        permanent: true,
      },
      {
        source: '/en/product/peternakan/:path*',
        destination: '/en/produk-layanan/peternakan/:path*',
        permanent: true,
      },
      {
        source: '/en/product/perikanan',
        destination: '/en/produk-layanan/perikanan',
        permanent: true,
      },
      {
        source: '/en/product/perikanan/:path*',
        destination: '/en/produk-layanan/perikanan/:path*',
        permanent: true,
      },
      // Old routes redirects (add as needed)
      {
        source: '/produk/:path*',
        destination: '/product/:path*',
        permanent: true,
      },
      {
        source: '/berita/:path*',
        destination: '/news/:path*',
        permanent: true,
      },
      {
        source: '/tentang-kami',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/kontak',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
  
  // Experimental features for performance
  experimental: {
    // Enable Web Vitals attribution for detailed debugging
    // This provides more context for INP, LCP, CLS issues
    webVitalsAttribution: ['CLS', 'LCP', 'INP', 'FCP', 'TTFB'],
    // Optimize package imports - reduces bundle size by tree-shaking
    optimizePackageImports: [
      'lucide-react', 
      '@radix-ui/react-accordion', 
      '@radix-ui/react-dialog',
      'swiper',
      'swiper/modules',
    ],
  },
};

export default nextConfig;
