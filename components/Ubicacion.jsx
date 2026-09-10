import Mapa from "./Mapa"
import Reveal from "./Reveal"

export default function Ubicacion() {
  return (
    <section id="ubicacion" className="py-24 sm:py-32 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            Ubicacion
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-3 mb-4 text-dark">
            ENCUENTRANOS
          </h2>
          <p className="text-light-muted max-w-xl mx-auto">
            Estamos en el corazon de la ciudad. Facil acceso en transporte
            publico y estacionamiento disponible.
          </p>
        </Reveal>

        <Reveal variant="scale">
          <div className="rounded-2xl overflow-hidden border border-light-border bg-white">
            <div className="aspect-[16/7] min-h-[320px]">
              <Mapa />
            </div>
          </div>
        </Reveal>

        {/* Transport info */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21a.75.75 0 00.75-.75V11.25a3 3 0 00-3-3h-1.5l-1.72-4.575A1.5 1.5 0 0013.12 2.25H10.88a1.5 1.5 0 00-1.41.975L7.75 7.75H6a3 3 0 00-3 3v6.375c0 .621.504 1.125 1.125 1.125h10.5",
              title: "Estacionamiento",
              detail: "Gratuito para miembros",
            },
            {
              icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21",
              title: "Metro",
              detail: "Estacion Universidad (linea 5) - 3 min caminando",
            },
            {
              icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21",
              title: "Bus",
              detail: "Parada frente al gimnasio - lineas 101, 204",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div
                className="bg-white rounded-xl border border-light-border p-5 text-center hover:shadow-md transition-shadow"
              >
                <svg
                  className="w-8 h-8 text-primary mx-auto mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={item.icon}
                  />
                </svg>
                <h3 className="font-heading font-bold text-dark text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-light-muted text-xs">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
