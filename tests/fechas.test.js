import { test } from "node:test"
import assert from "node:assert/strict"
import { FOUNDING_DATE, getCurrentYear, getYearsOfHistory } from "../lib/fechas.js"

test("FOUNDING_DATE es una fecha valida de 2018", () => {
  assert.ok(FOUNDING_DATE instanceof Date)
  assert.ok(!isNaN(FOUNDING_DATE.getTime()))
  assert.equal(FOUNDING_DATE.getFullYear(), 2018)
})

test("getCurrentYear devuelve el anio correcto", () => {
  assert.equal(getCurrentYear(new Date(2018, 0, 1)), 2018)
  assert.equal(getCurrentYear(new Date(2026, 8, 21)), 2026)
  assert.equal(getCurrentYear(new Date(2035, 11, 31)), 2035)
})

test("getYearsOfHistory coincide con la fecha de fundacion ano a ano", () => {
  const casos = [
    [new Date(2018, 4, 1), 0],
    [new Date(2018, 11, 31), 0],
    [new Date(2019, 0, 1), 1],
    [new Date(2024, 8, 21), 6],
    [new Date(2025, 8, 21), 7],
    [new Date(2026, 8, 21), 8],
    [new Date(2030, 0, 1), 12],
  ]
  for (const [fecha, esperado] of casos) {
    assert.equal(getYearsOfHistory(fecha), esperado, `para ${fecha.toISOString()}`)
  }
})

test("getYearsOfHistory nunca es negativo", () => {
  assert.equal(getYearsOfHistory(new Date(2017, 5, 30)), 0)
  assert.ok(getYearsOfHistory() >= 0)
})

test("los años de historia + anio de fundacion == anio actual (consistencia Hero/Footer)", () => {
  const now = new Date(2026, 8, 21)
  assert.equal(
    getYearsOfHistory(now) + FOUNDING_DATE.getFullYear(),
    getCurrentYear(now)
  )
  const actual = new Date()
  assert.equal(
    getYearsOfHistory(actual) + FOUNDING_DATE.getFullYear(),
    getCurrentYear(actual)
  )
})

test("el anio de derechos reservados del Footer es el anio actual", () => {
  assert.equal(getCurrentYear(), new Date().getFullYear())
})