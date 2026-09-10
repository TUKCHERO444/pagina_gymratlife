import Reveal from "./Reveal"

const productos = [
  {
    nombre: "Proteina Whey 2kg",
    precio: "$45.000",
    categoria: "Suplementos",
    descripcion: "Proteina de suero concentrada sabor chocolate",
    imagen: "/tienda/proteina-whey.jpg",
    alt: "Proteina en polvo mezclandose en un shaker",
  },
  {
    nombre: "Camiseta GymRat",
    precio: "$35.000",
    categoria: "Merchandise",
    descripcion: "Poliester tecnico, colores negro y rojo",
    imagen: "/tienda/camiseta.jpg",
    alt: "Camisetas negras y blancas dobladas",
  },
  {
    nombre: "Guantes de Entrenamiento",
    precio: "$28.000",
    categoria: "Accesorios",
    descripcion: "Cuero sintetico, agarre reforzado",
    imagen: "/tienda/guantes.jpg",
    alt: "Guantes de entrenamiento",
  },
  {
    nombre: "Shaker GymRat 700ml",
    precio: "$18.000",
    categoria: "Accesorios",
    descripcion: "BPA free, con compartimento para pastillas",
    imagen: "/tienda/shaker.jpg",
    alt: "Botonella de proteina sobre una maquina del gimnasio",
  },
  {
    nombre: "Creatina Monohidratada",
    precio: "$32.000",
    categoria: "Suplementos",
    descripcion: "500g, pureza farmaceutica",
    imagen: "/tienda/creatina.jpg",
    alt: "Creatina monohidratada en su envase",
  },
  {
    nombre: "Short Deportivo",
    precio: "$40.000",
    categoria: "Merchandise",
    descripcion: "Tela dry-fit, bolsillos laterales",
    imagen: "/tienda/short-deportivo.jpg",
    alt: "Deportista con short deportivo",
  },
]

export default function Tienda() {
  return (
    <section id="tienda" className="py-24 sm:py-32 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            Tienda
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-3 mb-4 text-dark">
            EQUIPO <span className="text-primary">GYMRAT</span>
          </h2>
          <p className="text-light-muted max-w-xl mx-auto">
            Suplementos, accesorios y merchandise oficial. Despacho a todo el
            pais.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto, i) => (
            <Reveal key={producto.nombre} delay={(i % 3) * 90}>
            <div
              className="group bg-white rounded-2xl border border-light-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Product image */}
              <div className="aspect-[4/3] bg-light-surface relative overflow-hidden">
                <img
                  src={producto.imagen}
                  alt={producto.alt}
                  loading="lazy"
                  className="relative w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              </div>

              <div className="p-6">
                <span className="text-primary text-xs font-semibold tracking-wider uppercase">
                  {producto.categoria}
                </span>
                <h3 className="font-heading text-xl font-bold text-dark mt-2 mb-1">
                  {producto.nombre}
                </h3>
                <p className="text-light-muted text-sm mb-4">
                  {producto.descripcion}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-heading text-2xl font-bold text-dark">
                    {producto.precio}
                  </span>
                  <button className="px-4 py-2 bg-dark hover:bg-primary hover:text-white text-gray-300 text-sm font-medium rounded-lg border border-dark hover:border-primary transition-all duration-200">
                    Agregar
                  </button>
                </div>
              </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
