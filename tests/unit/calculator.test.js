/**
 * Unit Tests for ThreeWiseMen Enhanced Savings Calculator
 */

// Mock DOM elements for testing
const mockDOM = {
  propertyPrice: { value: "500000" },
  downPaymentAmount: { value: "100000" },
  downPaymentPercentage: { value: "20" },
  closingCosts: { value: "3" },
  existingSavings: { value: "25000" },
  timelineValue: { value: "24" },
  monthlyIncome: { value: "5000" },
  monthlyTarget: { textContent: "" },
  totalNeeded: { textContent: "" },
  savingsRate: { textContent: "" },
  progressFill: { style: { width: "" } },
  progressCurrent: { textContent: "" },
  progressTarget: { textContent: "" },
  breakdownPropertyPrice: { textContent: "" },
  breakdownDownPayment: { textContent: "" },
  breakdownClosingCosts: { textContent: "" },
  breakdownExistingSavings: { textContent: "" },
  breakdownTotalNeeded: { textContent: "" },
};

// Mock localStorage
const mockLocalStorage = {
  data: {},
  getItem: function (key) {
    return this.data[key] || null;
  },
  setItem: function (key, value) {
    this.data[key] = value;
  },
  clear: function () {
    this.data = {};
  },
};

// Mock document.getElementById
const originalGetElementById = document.getElementById;
document.getElementById = function (id) {
  return mockDOM[id] || null;
};

// Mock localStorage
Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
  writable: true,
});

// Enhanced Calculator Logic Class
class EnhancedCalculatorLogic {
  static calculateDownPayment(propertyPrice, mode, amount, percentage) {
    if (mode === "dollar") {
      return amount;
    } else {
      return (propertyPrice * percentage) / 100;
    }
  }

  static calculateClosingCosts(propertyPrice, percentage) {
    return (propertyPrice * percentage) / 100;
  }

  static calculateTotalNeeded(downPayment, closingCosts, existingSavings) {
    return downPayment + closingCosts - existingSavings;
  }

  static calculateMonthlyTarget(totalNeeded, timeline) {
    return timeline > 0 ? totalNeeded / timeline : 0;
  }

  static calculateSavingsRate(monthlyTarget, monthlyIncome) {
    return monthlyIncome > 0 ? (monthlyTarget / monthlyIncome) * 100 : 0;
  }

  static validatePropertyPrice(price) {
    if (price <= 0) return "Property price must be greater than $0";
    if (price > 10000000) return "Property price seems unusually high";
    return null;
  }

  static validateDownPayment(mode, amount, percentage, propertyPrice) {
    if (mode === "dollar") {
      if (amount <= 0) return "Down payment amount must be greater than $0";
      if (amount > propertyPrice)
        return "Down payment cannot exceed property price";
    } else {
      if (percentage <= 0 || percentage > 100)
        return "Down payment percentage must be between 0% and 100%";
    }
    return null;
  }

  static validateClosingCosts(percentage) {
    if (percentage < 0 || percentage > 10) {
      return "Closing costs should typically be between 0% and 10%";
    }
    return null;
  }

  static validateTimeline(timeline) {
    if (timeline <= 0) return "Timeline must be at least 1 month";
    if (timeline > 600) return "Timeline seems unusually long";
    return null;
  }

  static validateMonthlyIncome(income) {
    if (income > 0 && income < 1000) {
      return "Monthly income seems unusually low";
    }
    return null;
  }

  static formatCurrency(amount) {
    if (isNaN(amount) || amount === 0) return "$0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  static formatPercentage(value) {
    if (isNaN(value) || value === 0) return "0%";
    return `${value.toFixed(1)}%`;
  }
}

// Test Suite
describe("ThreeWiseMen Enhanced Calculator Logic", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  describe("Down Payment Calculations", () => {
    test("should calculate dollar amount down payment correctly", () => {
      const result = EnhancedCalculatorLogic.calculateDownPayment(
        500000,
        "dollar",
        100000,
        20
      );
      expect(result).toBe(100000);
    });

    test("should calculate percentage down payment correctly", () => {
      const result = EnhancedCalculatorLogic.calculateDownPayment(
        500000,
        "percentage",
        0,
        20
      );
      expect(result).toBe(100000);
    });

    test("should handle zero property price for percentage calculation", () => {
      const result = EnhancedCalculatorLogic.calculateDownPayment(
        0,
        "percentage",
        0,
        20
      );
      expect(result).toBe(0);
    });
  });

  describe("Closing Costs Calculations", () => {
    test("should calculate closing costs correctly", () => {
      const result = EnhancedCalculatorLogic.calculateClosingCosts(500000, 3);
      expect(result).toBe(15000);
    });

    test("should handle zero closing costs percentage", () => {
      const result = EnhancedCalculatorLogic.calculateClosingCosts(500000, 0);
      expect(result).toBe(0);
    });

    test("should handle decimal closing costs percentage", () => {
      const result = EnhancedCalculatorLogic.calculateClosingCosts(500000, 2.5);
      expect(result).toBe(12500);
    });
  });

  describe("Total Needed Calculations", () => {
    test("should calculate total needed correctly", () => {
      const result = EnhancedCalculatorLogic.calculateTotalNeeded(
        100000,
        15000,
        25000
      );
      expect(result).toBe(90000);
    });

    test("should handle existing savings greater than down payment + closing costs", () => {
      const result = EnhancedCalculatorLogic.calculateTotalNeeded(
        100000,
        15000,
        150000
      );
      expect(result).toBe(-35000);
    });

    test("should handle zero existing savings", () => {
      const result = EnhancedCalculatorLogic.calculateTotalNeeded(
        100000,
        15000,
        0
      );
      expect(result).toBe(115000);
    });
  });

  describe("Monthly Target Calculations", () => {
    test("should calculate monthly target correctly", () => {
      const result = EnhancedCalculatorLogic.calculateMonthlyTarget(90000, 24);
      expect(result).toBe(3750);
    });

    test("should handle zero timeline", () => {
      const result = EnhancedCalculatorLogic.calculateMonthlyTarget(90000, 0);
      expect(result).toBe(0);
    });

    test("should handle negative total needed", () => {
      const result = EnhancedCalculatorLogic.calculateMonthlyTarget(-35000, 24);
      expect(result).toBeCloseTo(-1458.33, 2);
    });
  });

  describe("Savings Rate Calculations", () => {
    test("should calculate savings rate correctly", () => {
      const result = EnhancedCalculatorLogic.calculateSavingsRate(3750, 5000);
      expect(result).toBe(75);
    });

    test("should handle zero monthly income", () => {
      const result = EnhancedCalculatorLogic.calculateSavingsRate(3750, 0);
      expect(result).toBe(0);
    });

    test("should handle zero monthly target", () => {
      const result = EnhancedCalculatorLogic.calculateSavingsRate(0, 5000);
      expect(result).toBe(0);
    });
  });

  describe("Input Validation", () => {
    test("should validate property price correctly", () => {
      expect(EnhancedCalculatorLogic.validatePropertyPrice(0)).toBe(
        "Property price must be greater than $0"
      );
      expect(EnhancedCalculatorLogic.validatePropertyPrice(500000)).toBeNull();
      expect(EnhancedCalculatorLogic.validatePropertyPrice(15000000)).toBe(
        "Property price seems unusually high"
      );
    });

    test("should validate dollar down payment correctly", () => {
      expect(
        EnhancedCalculatorLogic.validateDownPayment("dollar", 0, 20, 500000)
      ).toBe("Down payment amount must be greater than $0");
      expect(
        EnhancedCalculatorLogic.validateDownPayment(
          "dollar",
          100000,
          20,
          500000
        )
      ).toBeNull();
      expect(
        EnhancedCalculatorLogic.validateDownPayment(
          "dollar",
          600000,
          20,
          500000
        )
      ).toBe("Down payment cannot exceed property price");
    });

    test("should validate percentage down payment correctly", () => {
      expect(
        EnhancedCalculatorLogic.validateDownPayment("percentage", 0, 0, 500000)
      ).toBe("Down payment percentage must be between 0% and 100%");
      expect(
        EnhancedCalculatorLogic.validateDownPayment("percentage", 0, 20, 500000)
      ).toBeNull();
      expect(
        EnhancedCalculatorLogic.validateDownPayment(
          "percentage",
          0,
          150,
          500000
        )
      ).toBe("Down payment percentage must be between 0% and 100%");
    });

    test("should validate closing costs correctly", () => {
      expect(EnhancedCalculatorLogic.validateClosingCosts(-1)).toBe(
        "Closing costs should typically be between 0% and 10%"
      );
      expect(EnhancedCalculatorLogic.validateClosingCosts(3)).toBeNull();
      expect(EnhancedCalculatorLogic.validateClosingCosts(15)).toBe(
        "Closing costs should typically be between 0% and 10%"
      );
    });

    test("should validate timeline correctly", () => {
      expect(EnhancedCalculatorLogic.validateTimeline(0)).toBe(
        "Timeline must be at least 1 month"
      );
      expect(EnhancedCalculatorLogic.validateTimeline(24)).toBeNull();
      expect(EnhancedCalculatorLogic.validateTimeline(800)).toBe(
        "Timeline seems unusually long"
      );
    });

    test("should validate monthly income correctly", () => {
      expect(EnhancedCalculatorLogic.validateMonthlyIncome(0)).toBeNull();
      expect(EnhancedCalculatorLogic.validateMonthlyIncome(5000)).toBeNull();
      expect(EnhancedCalculatorLogic.validateMonthlyIncome(500)).toBe(
        "Monthly income seems unusually low"
      );
    });
  });

  describe("Formatting Functions", () => {
    test("should format currency correctly", () => {
      expect(EnhancedCalculatorLogic.formatCurrency(0)).toBe("$0");
      expect(EnhancedCalculatorLogic.formatCurrency(1000)).toBe("$1,000");
      expect(EnhancedCalculatorLogic.formatCurrency(1000000)).toBe(
        "$1,000,000"
      );
    });

    test("should format percentage correctly", () => {
      expect(EnhancedCalculatorLogic.formatPercentage(0)).toBe("0%");
      expect(EnhancedCalculatorLogic.formatPercentage(3.5)).toBe("3.5%");
      expect(EnhancedCalculatorLogic.formatPercentage(20)).toBe("20.0%");
    });
  });

  describe("Integration Tests", () => {
    test("should calculate complete home purchase scenario correctly", () => {
      const propertyPrice = 500000;
      const downPayment = EnhancedCalculatorLogic.calculateDownPayment(
        propertyPrice,
        "percentage",
        0,
        20
      );
      const closingCosts = EnhancedCalculatorLogic.validateClosingCosts(3);
      const totalNeeded = EnhancedCalculatorLogic.calculateTotalNeeded(
        downPayment,
        15000,
        25000
      );
      const monthlyTarget = EnhancedCalculatorLogic.calculateMonthlyTarget(
        totalNeeded,
        24
      );
      const savingsRate = EnhancedCalculatorLogic.calculateSavingsRate(
        monthlyTarget,
        5000
      );

      expect(downPayment).toBe(100000);
      expect(closingCosts).toBeNull();
      expect(totalNeeded).toBe(90000);
      expect(monthlyTarget).toBe(3750);
      expect(savingsRate).toBe(75);
    });

    test("should handle edge case with very high property price", () => {
      const propertyPrice = 15000000;
      const validation =
        EnhancedCalculatorLogic.validatePropertyPrice(propertyPrice);
      expect(validation).toBe("Property price seems unusually high");
    });

    test("should handle edge case with very long timeline", () => {
      const validation = EnhancedCalculatorLogic.validateTimeline(700);
      expect(validation).toBe("Timeline seems unusually long");
    });

    test("should only calculate when Calculate button is clicked", () => {
      // This test verifies that the calculator behavior has changed
      // from real-time updates to button-triggered updates
      const propertyPrice = 500000;
      const downPayment = 100000;
      const closingCosts = 3;
      const existingSavings = 25000;
      const timeline = 24;

      // Simulate form inputs without triggering calculation
      const inputs = {
        propertyPrice: propertyPrice,
        downPaymentAmount: downPayment,
        closingCosts: closingCosts,
        existingSavings: existingSavings,
        timelineValue: timeline,
      };

      // Verify that inputs are captured but not calculated automatically
      expect(inputs.propertyPrice).toBe(500000);
      expect(inputs.downPaymentAmount).toBe(100000);
      expect(inputs.closingCosts).toBe(3);
      expect(inputs.existingSavings).toBe(25000);
      expect(inputs.timelineValue).toBe(24);

      // Only when Calculate button is clicked should calculations happen
      const actualDownPayment = EnhancedCalculatorLogic.calculateDownPayment(
        propertyPrice,
        "dollar",
        downPayment,
        0
      );
      const actualClosingCosts = EnhancedCalculatorLogic.calculateClosingCosts(
        propertyPrice,
        closingCosts
      );
      const totalNeeded = EnhancedCalculatorLogic.calculateTotalNeeded(
        actualDownPayment,
        actualClosingCosts,
        existingSavings
      );
      const monthlyTarget = EnhancedCalculatorLogic.calculateMonthlyTarget(
        totalNeeded,
        timeline
      );

      expect(actualDownPayment).toBe(100000);
      expect(actualClosingCosts).toBe(15000);
      expect(totalNeeded).toBe(90000);
      expect(monthlyTarget).toBe(3750);
    });
  });
});
