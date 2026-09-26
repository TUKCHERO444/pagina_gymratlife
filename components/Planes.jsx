import Reveal from "./Reveal"

const planes = [
  {
    name: "Diario",
    price: "S/ 8",
    period: "/día",
    description: "Entrena un día y vive la experiencia GymRat",
    features: [
      "Acceso completo por un día",
      "Todas las zonas de entrenamiento",
      "Horario: lunes a sábado",
      "Coaches en sala para tu seguimiento",
    ],
    popular: false,
  },
  {
    name: "Mensual",
    price: "S/ 80",
    period: "/mes",
    description: "Para quienes entrenan en serio cada semana",
    features: [
      "Acceso ilimitado de lunes a sábado",
      "Todas las zonas del gimnasio",
      "Horarios amplios de lunes a sábado",
      "Seguimiento personalizado de los coaches",
    ],
    popular: true,
  },
  {
    name: "Promoción Alumnos Nuevos",
    price: "S/ 60",
    period: "/mes",
    description: "Precio especial solo para nuevos integrantes",
    features: [
      "Acceso ilimitado de lunes a sábado",
      "Todo lo del plan mensual",
      "Horario de lunes a sábado",
      "Seguimiento de los coaches desde el día 1",
    ],
    popular: false,
  },
]

export default function Planes() {
  return (
    <section id="planes" className="py-24 sm:py-32 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            Planes
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-3 mb-4 text-dark">
            ELIGE TU <span className="text-primary">NIVEL</span>
          </h2>
          <p className="text-light-muted max-w-xl mx-auto">
            Planes flexibles sin permanencia. Cancela cuando quieras.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {planes.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 100}>
              <div
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  plan.popular
                    ? "bg-white border-2 border-primary shadow-xl shadow-primary/10 scale-[1.02]"
                    : "bg-white border border-light-border hover:border-gray-300"
                }`}
              >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full tracking-wide">
                  MAS POPULAR
                </div>
              )}

              <h3 className="font-heading text-2xl font-bold mb-2 text-dark">
                {plan.name}
              </h3>
              <p className="text-light-muted text-sm mb-6">
                {plan.description}
              </p>

              <div className="mb-8">
                <span className="font-heading text-5xl font-bold text-dark">
                  {plan.price}
                </span>
                <span className="text-light-muted text-lg">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <svg
                      className={`w-5 h-5 mt-0.5 shrink-0 ${
                        plan.popular ? "text-primary" : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/51981367600"
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-3.5 rounded-xl font-semibold text-center transition-all duration-200 ${
                  plan.popular
                    ? "bg-primary hover:bg-primary-dark text-white"
                    : "bg-dark hover:bg-gray-800 text-white border border-dark"
                }`}
              >
                Empezar ahora
              </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
