import { getYearsOfHistory } from "@/lib/fechas"

export const site = {
  name: "GymRatLife",
  legalName: "GymRatLife Chiclayo",
  url: "https://gymratlifechiclayo.netlify.app",
  slogan: "Tu gimnasio, tu estilo de vida",
  description: `Gimnasio en Chiclayo con más de ${getYearsOfHistory()} años de historia. Planes desde S/ 8 por día y S/ 80 mensuales, suplementos y farmacología deportiva. Atención de lunes a sábado.`,
  keywords: [
    "gimnasio chiclayo",
    "gymratlife chiclayo",
    "gymrat life chiclayo",
    "gimnasio av cajamarca chiclayo",
    "planes de gimnasio chiclayo",
    "suplementos chiclayo",
    "proteína chiclayo",
    "creatina chiclayo",
    "pre entreno chiclayo",
    "farmacología deportiva chiclayo",
    "entrenamiento coaching chiclayo",
  ],
  phone: {
    display: "+51 981 367 600",
    e164: "+51981367600",
    wa: "51981367600",
  },
  whatsappLink: "https://wa.me/51981367600",
  instagram: "https://www.instagram.com/gymratlife__/",
  foundingYear: 2018,
  address: {
    streetAddress: "Av. Cajamarca Mz E Lote 22",
    locality: "Chiclayo",
    region: "Lambayeque",
    country: "Perú",
    countryCode: "PE",
  },
  geo: {
    lat: -6.777421600472736,
    lng: -79.8551391134683,
  },
  hours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "06:15",
      closes: "13:20",
    },
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "15:30",
      closes: "22:00",
    },
    {
      days: ["Saturday"],
      opens: "07:15",
      closes: "17:00",
    },
  ],
  plans: [
    { name: "Diario", price: 8 },
    { name: "Plan Mensual", price: 80 },
    { name: "Promoción Alumnos Nuevos", price: 60 },
  ],
  logo: "/imgs/gymrat-life-logo-removebg-preview.png",
}