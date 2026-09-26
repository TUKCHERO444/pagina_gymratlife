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
            Ubicanos en Av. Cajamarca Mz E Lote 22, Chiclayo.
            Facil acceso en transporte publico y estacionamiento disponible.
          </p>
          <p className="mt-3 text-dark font-semibold">
            Tel: +51 981 367 600
          </p>
        </Reveal>

        <Reveal variant="scale">
          <div className="rounded-2xl overflow-hidden border border-light-border bg-white">
            <div className="aspect-[16/7] min-h-[320px]">
              <Mapa />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
