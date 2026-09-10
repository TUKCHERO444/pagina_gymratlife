import dynamic from "next/dynamic"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Footer from "@/components/Footer"
import SectionGradient from "@/components/SectionGradient"

const Planes = dynamic(() => import("@/components/Planes"))
const Horarios = dynamic(() => import("@/components/Horarios"))
const Tienda = dynamic(() => import("@/components/Tienda"))
const Areas = dynamic(() => import("@/components/Areas"))
const Ubicacion = dynamic(() => import("@/components/Ubicacion"))
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"))

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionGradient from="dark" to="light" />
        <Planes />
        <SectionGradient from="light" to="dark" />
        <Horarios />
        <SectionGradient from="dark" to="light" />
        <Tienda />
        <SectionGradient from="light" to="dark" />
        <Areas />
        <SectionGradient from="dark" to="light" />
        <Ubicacion />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
