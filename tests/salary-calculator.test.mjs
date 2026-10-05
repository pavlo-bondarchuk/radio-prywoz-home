import test from "node:test";
import assert from "node:assert/strict";
import { calculateSalary, calculateYoungMonthlyPit, TAX_RULES } from "../assets/scripts/calculators/salary-calculator.js";

test("2026 rules expose official baseline parameters", () => {
  assert.equal(TAX_RULES[2026].minimumMonthly, 4806);
  assert.equal(TAX_RULES[2026].minimumHourly, 31.4);
  assert.equal(TAX_RULES[2026].firstThreshold, 120000);
  assert.equal(TAX_RULES[2026].under26Limit, 85528);
});

test("UoP sample calculates statutory employee ZUS and never negative take-home", () => {
  const result = calculateSalary(6000, { contract: "employment", age: 30, pit2: true });
  assert.equal(Number(result.social.toFixed(2)), 822.6);
  assert.equal(Number(result.health.toFixed(2)), 465.97);
  assert.equal(Number(result.pit.toFixed(2)), 291);
  assert.equal(Number(result.netto.toFixed(2)), 4420.43);
  assert.equal(Number(result.employerTotal.toFixed(2)), 7228.8);
  assert.ok(result.netto > 0 && result.netto < 6000);
  assert.ok(result.employerTotal > 6000);
});

test("student under 26 on zlecenie has no ZUS or health deductions", () => {
  const result = calculateSalary(6000, { contract: "mandate", age: 22, student: true });
  assert.equal(result.social, 0);
  assert.equal(result.health, 0);
  assert.equal(result.pit, 0);
  assert.equal(result.netto, 6000);
});

test("other insurance title can waive zlecenie social ZUS without hiding its health contribution", () => {
  const result = calculateSalary(6000, { contract: "mandate", age: 30, otherTitle: true });
  assert.equal(result.social, 0);
  assert.equal(result.health, 540);
});

test("young relief allocates standard KUP only against taxable annual revenue", () => {
  const result = calculateYoungMonthlyPit({ gross: 15000, socialRate: .1371, kup: 250 });
  assert.equal(result.taxableRevenue, 94472);
  assert.equal(Number(result.deductibleSocial.toFixed(4)), 12952.1112);
  assert.equal(result.deductibleKup, 3000);
  assert.equal(result.annualTaxBase, 78519);
  assert.equal(result.monthlyTax, 485.19);
  const calculatorResult = calculateSalary(15000, { contract: "employment", age: 25, pit2: true });
  assert.equal(calculatorResult.pit, 485.19);
});

test("employer PPK is included in PIT and employer cost, not social or health bases", () => {
  const without = calculateSalary(6000, { contract: "employment", age: 30, pit2: true, ppk: false });
  const withPpk = calculateSalary(6000, { contract: "employment", age: 30, pit2: true, ppk: true });
  assert.equal(withPpk.social, without.social);
  assert.equal(withPpk.health, without.health);
  assert.equal(withPpk.employerTotal - without.employerTotal, 90);
  assert.equal(withPpk.pit - without.pit, 11);
  assert.equal(withPpk.ppk, 120);
});

test("dzieło does not apply under-26 exemption, and uses the independent-contract assumption", () => {
  const young = calculateSalary(6000, { contract: "work", age: 22 });
  const adult = calculateSalary(6000, { contract: "work", age: 30 });
  assert.equal(young.social, 0);
  assert.equal(young.health, 0);
  assert.equal(young.exempt, false);
  assert.ok(young.pit > 0);
  assert.equal(young.pit, adult.pit);
});

test("fractional input stays finite and zero is a valid amount", () => {
  assert.equal(calculateSalary(0, { contract: "employment" }).netto, 0);
  const fractional = calculateSalary(6000.5, { contract: "employment" });
  assert.ok(Number.isFinite(fractional.netto));
  assert.ok(fractional.netto >= 0);
  assert.equal(calculateSalary(-1), null);
  assert.equal(calculateSalary(Number.POSITIVE_INFINITY), null);
});

test("PIT calculation crosses the annual 120,000 PLN threshold", () => {
  const below = calculateSalary(9000, { contract: "employment", age: 35, pit2: false });
  const above = calculateSalary(12000, { contract: "employment", age: 35, pit2: false });
  assert.ok(above.pit > below.pit);
  assert.ok(above.pit < 12000 * .32);
});
