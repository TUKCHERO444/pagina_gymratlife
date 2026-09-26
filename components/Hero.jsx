import MediaCarousel from "./MediaCarousel"
import Reveal from "./Reveal"
import { getYearsOfHistory } from "@/lib/fechas"

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-dark"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--color-primary)_0%,_transparent_50%)] opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <Reveal className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary text-sm font-medium tracking-wide">
                Abierto ahora
              </span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tight">
                GYM
                <br />
                <span className="text-primary">RAT</span>
                <br />
                LIFE
              </h1>
              <img
                src="/imgs/gymrat-life-logo-removebg-preview.png"
                alt="GymRatLife Logo"
                className="h-[7em] sm:h-[8.5em] lg:h-[11em] xl:h-[13em] w-auto object-contain"
              />
            </div>

            <p className="max-w-md text-gray-400 text-lg leading-relaxed">
              Mas que un gimnasio, somos una comunidad. Equipamiento de ultima
              generacion, coaches certificados y el ambiente que necesitas para
              superar tus limites.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#planes"
                className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 text-center"
              >
                Ver Planes
              </a>
              <a
                href="#horarios"
                className="px-8 py-4 border border-dark-border hover:border-gray-500 text-gray-300 hover:text-white font-medium text-lg rounded-xl transition-all duration-200 text-center"
              >
                Horarios
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {[
                { value: "1000+", label: "Clientes" },
                { value: "6", label: "Dias/semana de atencion" },
                { value: `${getYearsOfHistory()}+`, label: "Anos de historia" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right: Media Carousel */}
          <Reveal variant="blur" delay={150} className="relative">
            <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]">
              <MediaCarousel />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-primary/20 rounded-2xl -z-10" />
          </Reveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-600 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
