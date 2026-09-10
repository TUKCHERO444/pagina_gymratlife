"use client"

import { useState, useEffect, useCallback } from "react"
import Reveal from "./Reveal"

const areas = [
  {
    num: "01",
    title: "Sala de Musculacion",
    desc: "Pesas libres, maquinas de fuerza y racks para que desarrolles cada grupo muscular a tu ritmo.",
    media: { type: "image", src: "/areas/sala-musculacion.jpg", alt: "Sala de musculacion" },
    tags: ["Pesas libres", "Maquinas", "Racks"],
  },
  {
    num: "02",
    title: "Zona de Musculacion",
    desc: "Espacio amplio con barras, mancuernas y accesorios para tus entrenamientos de hipertrofia.",
    media: { type: "image", src: "/areas/zona-musculacion.jpg", alt: "Zona de musculacion" },
    tags: ["Barras", "Mancuernas", "Hipertrofia"],
  },
  {
    num: "03",
    title: "Zona de Cardio",
    desc: "Cintas, elipticas, bicicletas y remo para mejorar tu condicion fisica y quemar calorias.",
    media: { type: "video", src: "/areas/zona-cardio.mp4", alt: "Zona de cardio" },
    tags: ["Cintas", "Elipticas", "Remo"],
  },
]

function Media({ area, large = false }) {
  const [invalid, setInvalid] = useState(false)

  if (area.media.type === "video") {
    return (
      <video
        src={area.media.src}
        className={
          large
            ? "w-full h-full object-contain"
            : "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        }
        muted
        loop
        autoPlay={large}
        playsInline
        aria-label={area.media.alt}
        onError={() => setInvalid(true)}
      />
    )
  }

  if (invalid) {
    return <Placeholder area={area} />
  }

  return (
    <img
      src={area.media.src}
      alt={area.media.alt}
      className={
        large
          ? "w-full h-full object-contain"
          : "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      }
      onError={() => setInvalid(true)}
    />
  )
}

function Placeholder({ area }) {
  return (
    <div className="w-full h-full bg-dark-surface flex items-center justify-center">
      <div className="text-center px-4">
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
        <p className="text-gray-600 text-sm">{area.title}</p>
        <p className="text-gray-700 text-xs mt-1">
          Coloca el archivo en{" "}
          <code className="text-primary/50">public/areas/</code>
        </p>
      </div>
    </div>
  )
}

function Modal({ area, onClose }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [handleKeyDown])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={area.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-dark-card border border-dark-border rounded-2xl overflow-hidden shadow-2xl w-full max-w-5xl max-h-[85vh] flex flex-col animate-modal-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-primary/90 text-white font-heading font-bold text-sm rounded-lg">
              {area.num}
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
              {area.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-surface transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="relative flex-1 bg-black flex items-center justify-center min-h-0">
          <div className="w-full h-full">
            <Media area={area} large />
          </div>
        </div>

        <div className="px-5 py-4 border-t border-dark-border">
          <p className="text-gray-400 text-sm leading-relaxed">{area.desc}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {area.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs bg-dark-surface border border-dark-border text-gray-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Areas() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="areas" className="py-24 sm:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            Nuestras Areas
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-3 mb-4">
            TODO PARA TU ENTRENAMIENTO
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Espacios disenados para cada objetivo. Encuentra tu zona ideal y
            supera tus limites.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, i) => (
            <Reveal key={area.num} delay={i * 100}>
              <article
                onClick={() => setSelected(area)}
                className="bg-dark-card rounded-2xl border border-dark-border overflow-hidden group cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Media area={area} />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-white font-heading font-bold text-sm rounded-lg">
                  {area.num}
                </span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-4 py-2 bg-primary text-white font-heading font-bold text-sm rounded-lg flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Ver mas
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-heading text-2xl font-bold text-white mb-3">
                  {area.title}
                </h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                  {area.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {area.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-dark-surface border border-dark-border text-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              </article>
            </Reveal>
          ))}
        </div>

        {selected && <Modal area={selected} onClose={() => setSelected(null)} />}
      </div>
    </section>
  )
}
