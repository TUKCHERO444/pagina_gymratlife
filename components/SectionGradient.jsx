const gradients = {
  "dark-to-light": "bg-gradient-to-b from-dark to-light",
  "light-to-dark": "bg-gradient-to-b from-light to-dark",
}

export default function SectionGradient({ from = "dark", to = "light" }) {
  const direction = `${from}-to-${to}`
  const classes = gradients[direction] ?? gradients["dark-to-light"]

  return (
    <div
      aria-hidden="true"
      className={`section-gradient h-12 sm:h-16 ${classes}`}
    />
  )
}