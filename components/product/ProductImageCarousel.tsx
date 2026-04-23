'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import type { Swiper as SwiperType } from 'swiper'
import { Locale } from '@/i18n-config'

// Import Swiper React components - must be imported directly for proper functionality
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, Thumbs, Zoom } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/zoom'

interface ProductImage {
  id: number | string
  url: string
  alternativeText?: string | null
  caption?: string | null
  width?: number
  height?: number
}

interface ProductImageCarouselProps {
  /** Main product image */
  mainImage?: ProductImage | null
  /** Gallery of additional product images */
  gallery?: ProductImage[] | null
  /** Product name for alt text fallback */
  productName: string
  /** Primary brand color for styling */
  primaryColor?: string
  /** Enable/disable autoplay */
  autoplay?: boolean
  /** Autoplay delay in milliseconds */
  autoplayDelay?: number
  /** Show thumbnail navigation */
  showThumbnails?: boolean
  /** Enable zoom on click */
  enableZoom?: boolean
  /** Class name for the container */
  className?: string
  /** Current locale for UI text */
  lang?: Locale
}

export default function ProductImageCarousel({
  mainImage,
  gallery = [],
  productName,
  primaryColor = '#006622',
  autoplay = true,
  autoplayDelay = 5000,
  showThumbnails = true,
  enableZoom = true,
  className = '',
  lang = 'id'
}: ProductImageCarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const mainSwiperRef = useRef<SwiperType | null>(null)

  // Wait for client-side hydration to complete before rendering Swiper
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Combine main image and gallery into single array
  const allImages: ProductImage[] = []
  
  if (mainImage?.url) {
    allImages.push(mainImage)
  }
  
  if (gallery && gallery.length > 0) {
    gallery.forEach(img => {
      // Avoid duplicates
      if (img.url && !allImages.find(existing => existing.url === img.url)) {
        allImages.push(img)
      }
    })
  }

  // If no images, show placeholder
  if (allImages.length === 0) {
    return (
      <div className={`relative aspect-square bg-gray-100 rounded-2xl flex items-center justify-center ${className}`}>
        <div className="text-gray-400 text-center">
          <ZoomIn className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">{lang === 'en' ? 'No image available' : 'Gambar tidak tersedia'}</p>
        </div>
      </div>
    )
  }

  // Helper function to get full image URL
  const getImageUrl = (url: string) => {
    if (url.startsWith('http')) return url
    return `${process.env.NEXT_PUBLIC_URL_API || 'https://backend.centrabiotechindonesia.com'}${url}`
  }

  // Show static first image during SSR and before client hydration completes
  // This prevents the flash/disappear issue caused by Swiper hydration mismatch
  if (!isMounted) {
    return (
      <div className={`relative ${className}`}>
        <div className="relative aspect-square bg-white rounded-2xl overflow-hidden">
          <Image
            src={getImageUrl(allImages[0].url)}
            alt={allImages[0].alternativeText || `${productName} - Product Image`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {/* Show image count indicator if multiple images */}
          {allImages.length > 1 && (
            <div 
              className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: `${primaryColor}CC` }}
            >
              1 / {allImages.length}
            </div>
          )}
        </div>
        {/* Show thumbnail placeholders */}
        {showThumbnails && allImages.length > 1 && (
          <div className="mt-4 flex gap-3">
            {allImages.slice(0, 4).map((image, index) => (
              <div 
                key={image.id || index}
                className={`relative aspect-square w-16 h-16 rounded-lg overflow-hidden border-2 ${
                  index === 0 ? 'border-current' : 'border-transparent'
                }`}
                style={{ borderColor: index === 0 ? primaryColor : 'transparent' }}
              >
                <Image
                  src={getImageUrl(image.url)}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // If only one image, show simple view without carousel
  if (allImages.length === 1) {
    return (
      <div className={`relative ${className}`}>
        <div 
          className="relative aspect-square bg-white rounded-2xl overflow-hidden cursor-zoom-in group"
          onClick={() => enableZoom && setIsZoomed(!isZoomed)}
        >
          <Image
            src={getImageUrl(allImages[0].url)}
            alt={allImages[0].alternativeText || `${productName} - Product Image`}
            fill
            className={`object-contain transition-transform duration-300 ${isZoomed ? 'scale-150' : 'group-hover:scale-105'}`}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {enableZoom && (
            <div className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Carousel */}
      <div className="relative group">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, Thumbs, Zoom]}
          spaceBetween={0}
          slidesPerView={1}
          loop={allImages.length > 1}
          autoplay={autoplay ? {
            delay: autoplayDelay,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          } : false}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          zoom={{ maxRatio: 2 }}
          onSwiper={(swiper: SwiperType) => {
            mainSwiperRef.current = swiper
          }}
          onSlideChange={(swiper: SwiperType) => {
            setActiveIndex(swiper.realIndex)
          }}
          className="rounded-2xl overflow-hidden bg-white aspect-square"
          style={{
            // Custom CSS variables for pagination colors
            '--swiper-pagination-color': primaryColor,
            '--swiper-pagination-bullet-inactive-color': '#d1d5db',
            '--swiper-pagination-bullet-inactive-opacity': '0.5',
          } as React.CSSProperties}
        >
          {allImages.map((image, index) => (
            <SwiperSlide key={image.id || index} className="!h-full">
              <div className="swiper-zoom-container h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={getImageUrl(image.url)}
                    alt={image.alternativeText || `${productName} - Image ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => mainSwiperRef.current?.slidePrev()}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              style={{ color: primaryColor }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => mainSwiperRef.current?.slideNext()}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              style={{ color: primaryColor }}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {allImages.length > 1 && (
          <div 
            className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: `${primaryColor}CC` }}
          >
            {activeIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {showThumbnails && allImages.length > 1 && (
        <div className="mt-4">
          <Swiper
            modules={[Navigation, Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView={4}
            watchSlidesProgress
            breakpoints={{
              640: { slidesPerView: 5, spaceBetween: 12 },
              768: { slidesPerView: 6, spaceBetween: 12 },
            }}
            className="thumbnail-swiper"
          >
            {allImages.map((image, index) => (
              <SwiperSlide key={`thumb-${image.id || index}`}>
                <div 
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-200 border-2 ${
                    activeIndex === index 
                      ? 'ring-2 ring-offset-2' 
                      : 'hover:opacity-80 border-transparent'
                  }`}
                  style={{ 
                    borderColor: activeIndex === index ? primaryColor : 'transparent',
                    // @ts-expect-error - Custom CSS property for ring color
                    '--tw-ring-color': activeIndex === index ? primaryColor : 'transparent'
                  }}
                >
                  <Image
                    src={getImageUrl(image.url)}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Caption */}
      {allImages[activeIndex]?.caption && (
        <p className="mt-3 text-sm text-gray-500 text-center">
          {allImages[activeIndex].caption}
        </p>
      )}

      {/* Custom Styles */}
      <style jsx global>{`
        .thumbnail-swiper .swiper-slide {
          opacity: 0.6;
          transition: opacity 0.2s ease;
        }
        .thumbnail-swiper .swiper-slide-thumb-active {
          opacity: 1;
        }
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          transition: all 0.2s ease;
        }
        .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}
