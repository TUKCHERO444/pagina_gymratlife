"use client"

import dynamic from "next/dynamic"

const GymMap = dynamic(() => import("./GymMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-light-surface flex items-center justify-center">
      <p className="text-light-muted text-sm">Cargando mapa...</p>
    </div>
  ),
})

export default function Mapa() {
  return <GymMap />
}
