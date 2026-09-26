"use client"

import { useState, useEffect, useCallback, useRef } from "react"

const slides = [
  { type: "video", src: "/imgs/espalda2.mp4", alt: "GymRatLife entrenamiento de espalda" },
  { type: "video", src: "/imgs/sesionpierna.mp4", alt: "GymRatLife sesion de pierna" },
  { type: "video", src: "/imgs/triceps2.mp4", alt: "GymRatLife entrenamiento de triceps" },
  { type: "video", src: "/imgs/femoral.mp4", alt: "GymRatLife entrenamiento de femoral" },
]

const INTERVAL = 5000

function SlidePlaceholder({ index }) {
  return (
    <div className="w-full h-full bg-dark-surface flex items-center justify-center">
      <div className="text-center">
        <svg
          className="w-16 h-16 text-dark-border mx-auto mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
          />
        </svg>
        <p className="text-gray-600 text-sm">slide-{index + 1}</p>
        <p className="text-gray-700 text-xs mt-1">
          Coloca el archivo en <code className="text-primary/50">public/hero/</code>
        </p>
      </div>
    </div>
  )
}

function VideoSlide({ src, alt, isActive }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (isActive) {
      video.currentTime = 0
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isActive])

  return (
    <video
      ref={ref}
      src={src}
      className="w-full h-full object-cover"
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
    />
  )
}

export default function MediaCarousel() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [loaded, setLoaded] = useState({})

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(next, INTERVAL)
    return function cleanup() {
      clearInterval(id)
    }
  }, [isPaused, next])

  const handleImageLoad = (i) => setLoaded((prev) => ({ ...prev, [i]: true }))
  const handleImageError = (i) => setLoaded((prev) => ({ ...prev, [i]: false }))

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden border border-dark-border bg-dark-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-label="Galeria de imagenes del gimnasio"
      role="region"
    >
      {/* Slides */}
      {slides.map((slide, i) => {
        const isActive = i === current
        const isLoaded = loaded[i]

        return (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            aria-hidden={!isActive}
          >
            {slide.type === "video" ? (
              <VideoSlide src={slide.src} alt={slide.alt} isActive={isActive} />
            ) : isLoaded !== false ? (
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                onLoad={() => handleImageLoad(i)}
                onError={() => handleImageError(i)}
              />
            ) : (
              <SlidePlaceholder index={i} />
            )}
          </div>
        )
      })}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent z-20 pointer-events-none" />

      {/* Dots */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30"
        role="tablist"
        aria-label="Slides"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-primary w-8"
                : "bg-white/30 hover:bg-white/50"
            }`}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Pause indicator */}
      {isPaused && (
        <div className="absolute top-4 right-4 z-30 px-2 py-1 bg-dark/70 rounded text-xs text-gray-400">
          Pausado
        </div>
      )}
    </div>
  )
}
