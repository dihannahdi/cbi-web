'use client'

import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import type { Swiper as SwiperType } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Video {
  id: string
  title: string
  embedUrl: string
  type: 'youtube' | 'tiktok'
}

interface VideoGallerySliderProps {
  videos: Video[]
}

export default function VideoGallerySlider({ videos }: VideoGallerySliderProps) {
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [modalVideo, setModalVideo] = useState<Video | null>(null)

  const openModal = (video: Video) => {
    setModalVideo(video)
  }

  const closeModal = () => {
    setModalVideo(null)
  }
  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Container with side navigation */}
      <div className="flex items-center gap-6">
        {/* Previous Button - Outside on Left */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-[#119f40] hover:bg-[#0d7a31] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex-shrink-0 z-10 self-center"
          aria-label="Previous videos"
        >
          <ChevronLeft className="h-7 w-7" strokeWidth={2.5} />
        </button>

        {/* Swiper Container */}
        <div className="flex-1 overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24
              }
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex)
            }}
            className="!pb-16"
          >
            {videos.map((video) => (
              <SwiperSlide key={video.id}>
                <div className="group relative cursor-pointer" onClick={() => openModal(video)}>
                  {/* Video Card */}
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300">
                    {/* Thumbnail/Poster */}
                    {video.type === 'youtube' ? (
                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <img 
                          src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: '20% center' }}
                        />
                      </div>
                    ) : (
                      <iframe
                        src={video.embedUrl}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        loading="lazy"
                        scrolling="no"
                        style={{ border: 'none' }}
                      />
                    )}
                    
                    {/* Overlay with play icon */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#119f40] group-hover:bg-[#0d7a31] group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-xl">
                        <Play className="h-8 w-8 fill-white text-white ml-1" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-white text-sm font-semibold line-clamp-2">{video.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Next Button - Outside on Right */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-[#119f40] hover:bg-[#0d7a31] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex-shrink-0 z-10 self-center"
          aria-label="Next videos"
        >
          <ChevronRight className="h-7 w-7" strokeWidth={2.5} />
        </button>
      </div>

      {/* Mobile Navigation Buttons (Overlaid for small screens) */}
      <div className="lg:hidden absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 flex justify-between px-4 pointer-events-none">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-[#119f40]/90 hover:bg-[#119f40] text-white shadow-lg transition-all duration-300"
          aria-label="Previous videos"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
        
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-[#119f40]/90 hover:bg-[#119f40] text-white shadow-lg transition-all duration-300"
          aria-label="Next videos"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>

      {/* Custom Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'w-8 bg-[#119f40]' 
                : 'w-2 bg-gray-300 hover:bg-[#119f40]/50'
            }`}
            aria-label={`Go to video ${index + 1}`}
          />
        ))}
      </div>

      {/* Modal for Video Playback */}
      {modalVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Close video"
          >
            <X className="h-6 w-6" strokeWidth={2.5} />
          </button>

          {/* Video Container */}
          <div 
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {modalVideo.type === 'youtube' ? (
              <iframe
                src={`${modalVideo.embedUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={modalVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <iframe
                src={modalVideo.embedUrl}
                title={modalVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                scrolling="no"
                style={{ border: 'none' }}
              />
            )}
          </div>

          {/* Video Title */}
          <div className="absolute bottom-8 left-0 right-0 text-center px-4">
            <p className="text-white text-lg font-semibold drop-shadow-lg">{modalVideo.title}</p>
          </div>
        </div>
      )}
    </div>
  )
}
