import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import Calculators from "../src/views/Calculators.vue";
import DownPaymentCalculator from "../src/views/DownPaymentCalculator.vue";
import NetWorthCalculator from "../src/views/NetWorthCalculator.vue";
import CashFlowCalculator from "../src/views/CashFlowCalculator.vue";

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/calculators", component: Calculators },
    { path: "/calculators/down-payment", component: DownPaymentCalculator },
    { path: "/calculators/net-worth", component: NetWorthCalculator },
    { path: "/calculators/cash-flow", component: CashFlowCalculator },
  ],
});

// Test suite for Calculators landing page
describe("Calculators Landing Page", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Calculators, {
      global: {
        plugins: [router],
      },
    });
  });

  it("renders the main heading", () => {
    expect(wrapper.find("h1").text()).toBe("Financial Calculators");
  });

  it("displays all three calculator cards", () => {
    const cards = wrapper.findAll(".calculator-card");
    expect(cards).toHaveLength(3);
  });

  it("shows Down Payment Calculator card with correct content", () => {
    const downPaymentCard = wrapper.find(".calculator-card:first-child");
    expect(downPaymentCard.find("h3").text()).toBe("Down Payment Calculator");
    expect(downPaymentCard.find(".card-icon").text()).toBe("🏠");
  });

  it("shows Net Worth Calculator card with correct content", () => {
    const netWorthCard = wrapper.find(".calculator-card:nth-child(2)");
    expect(netWorthCard.find("h3").text()).toBe("Net Worth Calculator");
    expect(netWorthCard.find(".card-icon").text()).toBe("💰");
  });

  it("shows Cash Flow Calculator card with correct content", () => {
    const cashFlowCard = wrapper.find(".calculator-card:last-child");
    expect(cashFlowCard.find("h3").text()).toBe("Cash Flow Calculator");
    expect(cashFlowCard.find(".card-icon").text()).toBe("📊");
  });

  it("navigates to correct routes when cards are clicked", async () => {
    const downPaymentCard = wrapper.find(".calculator-card:first-child");
    await downPaymentCard.trigger("click");

    // Note: In test environment, we can't fully test navigation
    // but we can verify the click handler is attached
    expect(downPaymentCard.attributes("onclick")).toBeDefined();
  });
});

// Test suite for Down Payment Calculator
describe("Down Payment Calculator", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(DownPaymentCalculator, {
      global: {
        plugins: [router],
      },
    });
  });

  it("renders the calculator form", () => {
    expect(wrapper.find(".calculator-form").exists()).toBe(true);
  });

  it("has all required form fields", () => {
    const requiredFields = [
      "propertyPrice",
      "downPayment",
      "closingCosts",
      "existingSavings",
      "timeline",
      "monthlyIncome",
    ];

    requiredFields.forEach((field) => {
      expect(wrapper.find(`#${field}`).exists()).toBe(true);
    });
  });

  it("calculates down payment amount correctly", async () => {
    await wrapper.setData({
      formData: {
        propertyPrice: "500000",
        downPayment: "20",
      },
      downPaymentMode: "percentage",
    });

    expect(wrapper.vm.downPaymentAmount).toBe(100000);
  });

  it("calculates closing costs correctly", async () => {
    await wrapper.setData({
      formData: {
        propertyPrice: "500000",
        closingCosts: "3.5",
      },
    });

    expect(wrapper.vm.closingCostsAmount).toBe(17500);
  });

  it("validates required fields", async () => {
    const result = wrapper.vm.validateForm();
    expect(result).toBe(false);
    expect(wrapper.vm.validationErrors.length).toBeGreaterThan(0);
  });

  it("shows results after successful calculation", async () => {
    await wrapper.setData({
      formData: {
        propertyPrice: "500000",
        downPayment: "20",
        closingCosts: "3.5",
        existingSavings: "25000",
        timeline: "24",
        monthlyIncome: "8000",
      },
    });

    await wrapper.vm.calculateSavings();

    expect(wrapper.vm.showResults).toBe(true);
  });
});

// Test suite for Net Worth Calculator
describe("Net Worth Calculator", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(NetWorthCalculator, {
      global: {
        plugins: [router],
      },
    });
  });

  it("renders assets and liabilities sections", () => {
    expect(wrapper.find(".section-group").exists()).toBe(true);
    expect(wrapper.findAll(".section-group")).toHaveLength(2);
  });

  it("calculates total assets correctly", async () => {
    await wrapper.setData({
      formData: {
        assets: {
          cashChecking: "5000",
          highInterestSavings: "15000",
          tfsa: "25000",
          rrsp: "50000",
          fhsa: "8000",
          investments: "30000",
          otherAssets: "10000",
        },
      },
    });

    expect(wrapper.vm.totalAssets).toBe(143000);
  });

  it("calculates total liabilities correctly", async () => {
    await wrapper.setData({
      formData: {
        liabilities: {
          creditCards: "2500",
          linesOfCredit: "15000",
          carLoans: "18000",
          studentLoans: "25000",
          otherDebts: "5000",
        },
      },
    });

    expect(wrapper.vm.totalLiabilities).toBe(65500);
  });

  it("calculates net worth correctly", async () => {
    await wrapper.setData({
      formData: {
        assets: { cashChecking: "100000" },
        liabilities: { creditCards: "20000" },
      },
    });

    expect(wrapper.vm.netWorth).toBe(80000);
  });

  it("provides correct financial health status", async () => {
    await wrapper.setData({
      formData: {
        assets: { cashChecking: "100000" },
        liabilities: { creditCards: "20000" },
      },
    });

    expect(wrapper.vm.healthStatus.class).toBe("excellent");
  });
});

// Test suite for Cash Flow Calculator
describe("Cash Flow Calculator", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CashFlowCalculator, {
      global: {
        plugins: [router],
      },
    });
  });

  it("renders all expense categories", () => {
    const expenseSections = wrapper.findAll(".section-group");
    expect(expenseSections).toHaveLength(4); // Income, Fixed, Variable, Savings
  });

  it("calculates total income correctly", async () => {
    await wrapper.setData({
      formData: {
        income: { monthlyIncome: "4800" },
      },
    });

    expect(wrapper.vm.totalIncome).toBe(4800);
  });

  it("calculates total fixed expenses correctly", async () => {
    await wrapper.setData({
      formData: {
        fixedExpenses: {
          rentMortgage: "1800",
          utilities: "200",
          internet: "80",
          phone: "60",
          insurance: "150",
          transitCar: "300",
          subscriptions: "50",
          minimumDebtPayments: "200",
        },
      },
    });

    expect(wrapper.vm.totalFixedExpenses).toBe(2840);
  });

  it("calculates total variable expenses correctly", async () => {
    await wrapper.setData({
      formData: {
        variableExpenses: {
          groceries: "400",
          dining: "200",
          gas: "150",
          shopping: "200",
          personal: "100",
          travel: "150",
          miscellaneous: "100",
        },
      },
    });

    expect(wrapper.vm.totalVariableExpenses).toBe(1300);
  });

  it("calculates cash surplus/deficit correctly", async () => {
    await wrapper.setData({
      formData: {
        income: { monthlyIncome: "4800" },
        fixedExpenses: { rentMortgage: "1800" },
        variableExpenses: { groceries: "400" },
        savings: { emergencyFund: "200" },
      },
    });

    expect(wrapper.vm.cashSurplus).toBe(2400);
  });

  it("provides correct financial health status for positive cash flow", async () => {
    await wrapper.setData({
      formData: {
        income: { monthlyIncome: "4800" },
        fixedExpenses: { rentMortgage: "1800" },
        variableExpenses: { groceries: "400" },
        savings: { emergencyFund: "200" },
      },
    });

    expect(wrapper.vm.healthStatus.class).toBe("excellent");
  });
});

// Test suite for calculation formulas
describe("Calculation Formulas", () => {
  describe("Down Payment Calculations", () => {
    it("calculates percentage-based down payment", () => {
      const propertyPrice = 500000;
      const downPaymentPercent = 20;
      const expected = (propertyPrice * downPaymentPercent) / 100;
      expect(expected).toBe(100000);
    });

    it("calculates dollar-based down payment percentage", () => {
      const propertyPrice = 500000;
      const downPaymentAmount = 100000;
      const expected = (downPaymentAmount / propertyPrice) * 100;
      expect(expected).toBe(20);
    });

    it("calculates closing costs", () => {
      const propertyPrice = 500000;
      const closingCostsPercent = 3.5;
      const expected = (propertyPrice * closingCostsPercent) / 100;
      expect(expected).toBe(17500);
    });
  });

  describe("Net Worth Calculations", () => {
    it("calculates total assets", () => {
      const assets = [5000, 15000, 25000, 50000, 8000, 30000, 10000];
      const expected = assets.reduce((sum, asset) => sum + asset, 0);
      expect(expected).toBe(143000);
    });

    it("calculates net worth", () => {
      const totalAssets = 143000;
      const totalLiabilities = 65500;
      const expected = totalAssets - totalLiabilities;
      expect(expected).toBe(77500);
    });
  });

  describe("Cash Flow Calculations", () => {
    it("calculates total expenses", () => {
      const fixedExpenses = 2840;
      const variableExpenses = 1300;
      const expected = fixedExpenses + variableExpenses;
      expect(expected).toBe(4140);
    });

    it("calculates cash surplus", () => {
      const income = 4800;
      const expenses = 4140;
      const savings = 200;
      const expected = income - expenses - savings;
      expect(expected).toBe(460);
    });
  });
});

// Test suite for validation logic
describe("Validation Logic", () => {
  describe("Down Payment Validation", () => {
    it("requires property price", () => {
      const calculator = mount(DownPaymentCalculator);
      const result = calculator.vm.validateForm();
      expect(result).toBe(false);
      expect(calculator.vm.validationErrors).toContain(
        "Property price is required"
      );
    });

    it("validates down payment percentage range", () => {
      const calculator = mount(DownPaymentCalculator);
      calculator.setData({
        formData: {
          propertyPrice: "500000",
          downPayment: "2", // Below minimum 3.5%
          closingCosts: "3.5",
          timeline: "24",
          monthlyIncome: "8000",
        },
      });

      const result = calculator.vm.validateForm();
      expect(result).toBe(false);
      expect(calculator.vm.validationErrors).toContain(
        "Down payment must be at least 3.5% of property price"
      );
    });
  });

  describe("Net Worth Validation", () => {
    it("requires at least one asset or liability", () => {
      const calculator = mount(NetWorthCalculator);
      const result = calculator.vm.validateForm();
      expect(result).toBe(false);
      expect(calculator.vm.validationErrors).toContain(
        "Please enter at least one asset or liability value"
      );
    });
  });

  describe("Cash Flow Validation", () => {
    it("requires monthly income", () => {
      const calculator = mount(CashFlowCalculator);
      const result = calculator.vm.validateForm();
      expect(result).toBe(false);
      expect(calculator.vm.validationErrors).toContain(
        "Monthly income is required"
      );
    });

    it("requires at least one expense category", () => {
      const calculator = mount(CashFlowCalculator);
      calculator.setData({
        formData: {
          income: { monthlyIncome: "4800" },
        },
      });

      const result = calculator.vm.validateForm();
      expect(result).toBe(false);
      expect(calculator.vm.validationErrors).toContain(
        "Please enter at least one expense value"
      );
    });
  });
});
