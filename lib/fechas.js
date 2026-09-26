export const FOUNDING_DATE = new Date(2018, 0, 1)

export function getCurrentYear(date = new Date()) {
  const now = date instanceof Date ? date : new Date(date)
  return now.getFullYear()
}

export function getYearsOfHistory(date = new Date()) {
  const now = date instanceof Date ? date : new Date(date)
  let years = now.getFullYear() - FOUNDING_DATE.getFullYear()
  const anniversary = new Date(
    now.getFullYear(),
    FOUNDING_DATE.getMonth(),
    FOUNDING_DATE.getDate()
  )
  if (now < anniversary) years -= 1
  return Math.max(years, 0)
}