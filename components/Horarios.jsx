import Reveal from "./Reveal"

const horarios = [
  {
    dias: "Lunes - Viernes",
    turno1Apertura: "6:15 AM",
    turno1Cierre: "1:20 PM",
    turno2Apertura: "3:30 PM",
    turno2Cierre: "10:00 PM",
  },
  {
    dias: "Sabados",
    turno1Apertura: "7:00 AM",
    turno1Cierre: "5:00 PM",
    turno2Apertura: "-",
    turno2Cierre: "-",
  },
  {
    dias: "Domingos y Feriados",
    turno1Apertura: "Cerrado",
    turno1Cierre: "-",
    turno2Apertura: "-",
    turno2Cierre: "-",
  },
]

function Cell({ value, accent = false }) {
  const isClosed = value === "Cerrado" || value === "-"
  return (
    <div className="px-4 py-5 text-center border-x border-dark-border">
      <span
        className={`font-heading text-base sm:text-lg font-bold ${
          isClosed ? "text-gray-600" : accent ? "text-primary" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  )
}

export default function Horarios() {
  return (
    <section id="horarios" className="py-24 sm:py-32 bg-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            Horarios
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-3 mb-4">
            PLANIFICA TU <span className="text-primary">SESION</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Horarios de apertura por turnos. Dias de entrenamiento.
          </p>
        </Reveal>

        <Reveal variant="scale">
          <div className="bg-dark-card rounded-2xl border border-dark-border overflow-x-auto">
          <div className="min-w-[640px]">
            {/* Header */}
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] bg-primary/10 border-b border-dark-border">
              <div className="px-5 py-4">
                <span className="font-heading font-bold text-white text-sm tracking-wider uppercase">
                  Dias
                </span>
              </div>
              <div className="px-4 py-4 text-center border-x border-dark-border">
                <span className="font-heading font-bold text-white text-xs tracking-wider uppercase">
                  1er Turno Apertura
                </span>
              </div>
              <div className="px-4 py-4 text-center border-r border-dark-border">
                <span className="font-heading font-bold text-white text-xs tracking-wider uppercase">
                  1er Turno Cierre
                </span>
              </div>
              <div className="px-4 py-4 text-center border-r border-dark-border">
                <span className="font-heading font-bold text-white text-xs tracking-wider uppercase">
                  2do Turno Apertura
                </span>
              </div>
              <div className="px-4 py-4 text-center">
                <span className="font-heading font-bold text-white text-xs tracking-wider uppercase">
                  2do Turno Cierre
                </span>
              </div>
            </div>

            {/* Rows */}
            {horarios.map((row, i) => (
              <div
                key={row.dias}
                className={`grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] items-center ${
                  i < horarios.length - 1 ? "border-b border-dark-border" : ""
                } hover:bg-white/[0.02] transition-colors`}
              >
                <div className="px-5 py-5">
                  <span className="text-white font-medium">{row.dias}</span>
                </div>
                <Cell value={row.turno1Apertura} accent />
                <Cell value={row.turno1Cierre} />
                <Cell value={row.turno2Apertura} accent />
                <Cell value={row.turno2Cierre} />
              </div>
            ))}
          </div>
          </div>
        </Reveal>

        <p className="text-center text-gray-600 text-sm mt-6">
          <svg
            className="w-4 h-4 inline-block mr-1 -mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Nota: los dias festivos pueden tener horarios especiales. Contactanos
          para confirmar.
        </p>
      </div>
    </section>
  )
}
