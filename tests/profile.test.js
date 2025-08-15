import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { profileStore, profileActions } from "../src/store/profile";
import SaveToProfile from "../src/components/SaveToProfile.vue";
import LoadFromProfile from "../src/components/LoadFromProfile.vue";
import FinancialProfile from "../src/views/FinancialProfile.vue";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("Profile Store", () => {
  beforeEach(() => {
    // Reset store before each test
    profileStore.financialState = {
      monthlyIncome: 0,
      existingSavings: 0,
      emergencyFund: 0,
      homeFund: 0,
      rrspFhsa: 0,
      assets: {
        cashChecking: 0,
        highInterestSavings: 0,
        tfsa: 0,
        rrsp: 0,
        fhsa: 0,
        investments: 0,
        otherAssets: 0,
      },
      liabilities: {
        creditCards: 0,
        linesOfCredit: 0,
        carLoans: 0,
        studentLoans: 0,
        otherDebts: 0,
      },
      budget: {
        fixedExpenses: {
          rentMortgage: 0,
          utilities: 0,
          internet: 0,
          phone: 0,
          insurance: 0,
          transitCar: 0,
          subscriptions: 0,
          minimumDebtPayments: 0,
        },
        variableExpenses: {
          groceries: 0,
          dining: 0,
          gas: 0,
          shopping: 0,
          personal: 0,
          travel: 0,
          miscellaneous: 0,
        },
        savings: {
          emergencyFund: 0,
          homeFund: 0,
          rrspFhsa: 0,
        },
      },
      goals: {
        downPaymentTarget: 0,
        monthlySavingsGoal: 0,
        targetTimeline: 0,
      },
    };

    profileStore.netWorthHistory = [];
    profileStore.cashFlowHistory = [];
    profileStore.lastUpdated = {
      financialState: null,
      netWorth: null,
      cashFlow: null,
      goals: null,
    };

    // Clear localStorage mocks
    vi.clearAllMocks();
  });

  describe("Profile Actions", () => {
    it("should save down payment data correctly", () => {
      const testData = {
        monthlyIncome: 5000,
        existingSavings: 25000,
        downPaymentTarget: 100000,
        monthlySavingsGoal: 2000,
        timeline: 36,
      };

      profileActions.saveDownPaymentData(testData);

      expect(profileStore.financialState.monthlyIncome).toBe(5000);
      expect(profileStore.financialState.existingSavings).toBe(25000);
      expect(profileStore.financialState.goals.downPaymentTarget).toBe(100000);
      expect(profileStore.financialState.goals.monthlySavingsGoal).toBe(2000);
      expect(profileStore.financialState.goals.targetTimeline).toBe(36);
      expect(profileStore.lastUpdated.financialState).toBeTruthy();
      expect(profileStore.lastUpdated.goals).toBeTruthy();
    });

    it("should save net worth data correctly", () => {
      const testData = {
        assets: {
          cashChecking: 5000,
          investments: 50000,
        },
        liabilities: {
          creditCards: 2000,
          carLoans: 15000,
        },
        totalNetWorth: 38000,
      };

      profileActions.saveNetWorthData(testData);

      expect(profileStore.financialState.assets.cashChecking).toBe(5000);
      expect(profileStore.financialState.assets.investments).toBe(50000);
      expect(profileStore.financialState.liabilities.creditCards).toBe(2000);
      expect(profileStore.financialState.liabilities.carLoans).toBe(15000);
      expect(profileStore.netWorthHistory).toHaveLength(1);
      expect(profileStore.netWorthHistory[0].totalNetWorth).toBe(38000);
      expect(profileStore.lastUpdated.netWorth).toBeTruthy();
    });

    it("should save cash flow data correctly", () => {
      const testData = {
        income: { monthlyIncome: 5000 },
        fixedExpenses: { rentMortgage: 1500, utilities: 200 },
        variableExpenses: { groceries: 400, dining: 200 },
        savings: { emergencyFund: 500, homeFund: 1000 },
        totalCashFlow: 1200,
      };

      profileActions.saveCashFlowData(testData);

      expect(profileStore.financialState.monthlyIncome).toBe(5000);
      expect(
        profileStore.financialState.budget.fixedExpenses.rentMortgage
      ).toBe(1500);
      expect(
        profileStore.financialState.budget.variableExpenses.groceries
      ).toBe(400);
      expect(profileStore.financialState.budget.savings.emergencyFund).toBe(
        500
      );
      expect(profileStore.cashFlowHistory).toHaveLength(1);
      expect(profileStore.cashFlowHistory[0].totalCashFlow).toBe(1200);
      expect(profileStore.lastUpdated.cashFlow).toBeTruthy();
    });

    it("should update specific profile fields", () => {
      profileActions.updateProfileField("monthlyIncome", 6000);
      profileActions.updateProfileField("assets.cashChecking", 10000);

      expect(profileStore.financialState.monthlyIncome).toBe(6000);
      expect(profileStore.financialState.assets.cashChecking).toBe(10000);
      expect(profileStore.lastUpdated.financialState).toBeTruthy();
    });

    it("should get profile comparison data correctly", () => {
      // Set up some test data
      profileStore.financialState.monthlyIncome = 5000;
      profileStore.financialState.existingSavings = 25000;
      profileStore.financialState.assets.cashChecking = 5000;

      const downPaymentComparison =
        profileActions.getProfileComparison("downPayment");
      const netWorthComparison =
        profileActions.getProfileComparison("netWorth");
      const cashFlowComparison =
        profileActions.getProfileComparison("cashFlow");

      expect(downPaymentComparison.monthlyIncome).toBe(5000);
      expect(downPaymentComparison.existingSavings).toBe(25000);
      expect(netWorthComparison.assets.cashChecking).toBe(5000);
      expect(cashFlowComparison.monthlyIncome).toBe(5000);
    });

    it("should check if profile has data correctly", () => {
      expect(profileActions.hasProfileData("downPayment")).toBe(false);

      profileStore.financialState.monthlyIncome = 5000;
      expect(profileActions.hasProfileData("downPayment")).toBe(true);

      profileStore.financialState.assets.cashChecking = 10000;
      expect(profileActions.hasProfileData("netWorth")).toBe(true);
    });

    it("should clear profile data correctly", () => {
      // Set up some test data
      profileStore.financialState.monthlyIncome = 5000;
      profileStore.financialState.assets.cashChecking = 10000;
      profileStore.netWorthHistory = [
        { timestamp: "2024-01-01", totalNetWorth: 50000 },
      ];

      profileActions.clearProfileData();

      expect(profileStore.financialState.monthlyIncome).toBe(0);
      expect(profileStore.financialState.assets.cashChecking).toBe(0);
      expect(profileStore.netWorthHistory).toHaveLength(0);
      expect(profileStore.lastUpdated.financialState).toBeNull();
    });

    it("should save to localStorage", () => {
      profileActions.saveToLocalStorage();
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "threeWiseMenProfile",
        expect.any(String)
      );
    });

    it("should load from localStorage", () => {
      const mockData = {
        financialState: { monthlyIncome: 5000 },
        lastUpdated: { financialState: "2024-01-01" },
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));

      profileActions.loadFromLocalStorage();

      expect(profileStore.financialState.monthlyIncome).toBe(5000);
      expect(profileStore.lastUpdated.financialState).toBe("2024-01-01");
    });

    it("should handle localStorage errors gracefully", () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error("Storage error");
      });

      // Should not throw error
      expect(() => profileActions.saveToLocalStorage()).not.toThrow();
    });
  });

  describe("Net Worth History Management", () => {
    it("should limit net worth history to 12 snapshots", () => {
      // Add 15 snapshots
      for (let i = 0; i < 15; i++) {
        profileActions.saveNetWorthData({
          assets: { cashChecking: i * 1000 },
          liabilities: { creditCards: 1000 },
          totalNetWorth: i * 1000 - 1000,
        });
      }

      expect(profileStore.netWorthHistory).toHaveLength(12);
      expect(profileStore.netWorthHistory[0].totalNetWorth).toBe(3000); // 4th snapshot
      expect(profileStore.netWorthHistory[11].totalNetWorth).toBe(14000); // 15th snapshot
    });
  });

  describe("Cash Flow History Management", () => {
    it("should limit cash flow history to 12 snapshots", () => {
      // Add 15 snapshots
      for (let i = 0; i < 15; i++) {
        profileActions.saveCashFlowData({
          income: { monthlyIncome: 5000 },
          fixedExpenses: { rentMortgage: 1500 },
          variableExpenses: { groceries: 400 },
          savings: { emergencyFund: 500 },
          totalCashFlow: i * 100,
        });
      }

      expect(profileStore.cashFlowHistory).toHaveLength(12);
      expect(profileStore.cashFlowHistory[0].totalCashFlow).toBe(300); // 4th snapshot
      expect(profileStore.cashFlowHistory[11].totalCashFlow).toBe(1400); // 15th snapshot
    });
  });
});

describe("SaveToProfile Component", () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(SaveToProfile, {
      props: {
        calculatorType: "downPayment",
        calculatedData: {
          monthlyIncome: 5000,
          existingSavings: 25000,
          downPaymentTarget: 100000,
          monthlySavingsGoal: 2000,
        },
      },
      global: {
        mocks: {
          $emit: vi.fn(),
        },
      },
    });
  });

  it("should render save button when showSaveButton is true", () => {
    expect(wrapper.find(".save-btn").exists()).toBe(true);
    expect(wrapper.find(".save-btn").text()).toContain("💾 Save to Profile");
  });

  it("should not render save button when showSaveButton is false", () => {
    wrapper = mount(SaveToProfile, {
      props: {
        calculatorType: "downPayment",
        calculatedData: {},
        showSaveButton: false,
      },
    });
    expect(wrapper.find(".save-btn").exists()).toBe(false);
  });

  it("should open modal when save button is clicked", async () => {
    await wrapper.find(".save-btn").trigger("click");
    expect(wrapper.vm.showModal).toBe(true);
    expect(wrapper.find(".save-modal").exists()).toBe(true);
  });

  it("should close modal when close button is clicked", async () => {
    wrapper.vm.showModal = true;
    await wrapper.vm.$nextTick();

    await wrapper.find(".close-btn").trigger("click");
    expect(wrapper.vm.showModal).toBe(false);
  });

  it("should initialize saveable fields correctly for down payment calculator", () => {
    expect(wrapper.vm.saveableFields.income).toBeDefined();
    expect(wrapper.vm.saveableFields.savings).toBeDefined();
    expect(wrapper.vm.saveableFields.goals).toBeDefined();
    expect(wrapper.vm.saveableFields.income.fields.monthlyIncome.value).toBe(
      5000
    );
  });

  it("should toggle group selection correctly", async () => {
    wrapper.vm.showModal = true;
    await wrapper.vm.$nextTick();

    const groupKey = "income";
    const initialSelection = wrapper.vm.isGroupSelected(groupKey);

    await wrapper.vm.toggleGroup(groupKey);

    expect(wrapper.vm.isGroupSelected(groupKey)).toBe(!initialSelection);
  });

  it("should emit saved event when saving to profile", async () => {
    wrapper.vm.showModal = true;
    await wrapper.vm.$nextTick();

    await wrapper.vm.saveToProfile();

    expect(wrapper.emitted("saved")).toBeTruthy();
    expect(wrapper.emitted("saved")[0][0]).toEqual({
      income: { monthlyIncome: 5000 },
      savings: { existingSavings: 25000 },
      goals: { downPaymentTarget: 100000, monthlySavingsGoal: 2000 },
    });
  });

  it("should show success message after saving", async () => {
    wrapper.vm.showModal = true;
    await wrapper.vm.$nextTick();

    await wrapper.vm.saveToProfile();

    expect(wrapper.vm.showSuccess).toBe(true);
    expect(wrapper.vm.successMessage).toContain("Successfully saved");
  });
});

describe("LoadFromProfile Component", () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(LoadFromProfile, {
      props: {
        calculatorType: "downPayment",
      },
      global: {
        mocks: {
          $emit: vi.fn(),
        },
      },
    });
  });

  it("should render load button", () => {
    expect(wrapper.find(".load-btn").exists()).toBe(true);
    expect(wrapper.find(".load-btn").text()).toContain("📊 Load from Profile");
  });

  it("should disable load button when no profile data is available", () => {
    expect(wrapper.find(".load-btn").attributes("disabled")).toBeDefined();
  });

  it("should enable load button when profile data is available", async () => {
    // Set up profile data
    profileStore.financialState.monthlyIncome = 5000;
    profileStore.financialState.existingSavings = 25000;

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".load-btn").attributes("disabled")).toBeUndefined();
  });

  it("should open modal when load button is clicked", async () => {
    // Enable button first
    profileStore.financialState.monthlyIncome = 5000;

    await wrapper.vm.$nextTick();
    await wrapper.find(".load-btn").trigger("click");

    expect(wrapper.vm.showLoadModal).toBe(true);
    expect(wrapper.find(".load-modal").exists()).toBe(true);
  });

  it("should close modal when close button is clicked", async () => {
    wrapper.vm.showLoadModal = true;
    await wrapper.vm.$nextTick();

    await wrapper.find(".close-btn").trigger("click");
    expect(wrapper.vm.showLoadModal).toBe(false);
  });

  it("should emit load event when loading data", async () => {
    // Set up profile data
    profileStore.financialState.monthlyIncome = 5000;
    profileStore.financialState.existingSavings = 25000;

    wrapper.vm.showLoadModal = true;
    await wrapper.vm.$nextTick();

    await wrapper.vm.loadToCalculator();

    expect(wrapper.emitted("load")).toBeTruthy();
    expect(wrapper.emitted("load")[0][0]).toEqual({
      income: { monthlyIncome: 5000 },
      savings: { existingSavings: 25000 },
    });
  });

  it("should show data source information correctly", async () => {
    profileStore.lastUpdated.financialState = "2024-01-01T10:00:00.000Z";
    profileStore.lastUpdated.goals = "2024-01-01T11:00:00.000Z";

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.dataSource).toBe("Financial Profile");
    expect(wrapper.vm.lastUpdated).toBe("2024-01-01T10:00:00.000Z");
  });
});

describe("FinancialProfile Component", () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(FinancialProfile, {
      global: {
        mocks: {
          $router: {
            push: vi.fn(),
          },
        },
      },
    });
  });

  it("should render profile overview section", () => {
    expect(wrapper.find(".profile-summary").exists()).toBe(true);
    expect(wrapper.find(".summary-header h2").text()).toBe("Profile Overview");
  });

  it("should render profile sections", () => {
    expect(wrapper.find(".profile-sections").exists()).toBe(true);
    expect(wrapper.findAll(".profile-section")).toHaveLength(4); // income, assets, liabilities, goals
  });

  it("should show correct summary values", async () => {
    profileStore.financialState.monthlyIncome = 5000;
    profileStore.financialState.existingSavings = 25000;
    profileStore.financialState.assets.cashChecking = 10000;
    profileStore.financialState.liabilities.creditCards = 2000;

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.totalSavings).toBe(25000);
    expect(wrapper.vm.totalNetWorth).toBe(8000); // 10000 - 2000
  });

  it("should toggle edit mode correctly", async () => {
    const editBtn = wrapper.find(".edit-btn");
    await editBtn.trigger("click");

    expect(wrapper.vm.editingSection).toBe("income");
    expect(wrapper.find(".edit-input").exists()).toBe(true);
  });

  it("should save section changes correctly", async () => {
    wrapper.vm.editingSection = "income";
    wrapper.vm.editData.monthlyIncome = 6000;
    wrapper.vm.editData.existingSavings = 30000;

    await wrapper.vm.saveSection("income");

    expect(profileStore.financialState.monthlyIncome).toBe(6000);
    expect(profileStore.financialState.existingSavings).toBe(30000);
    expect(wrapper.vm.editingSection).toBeNull();
  });

  it("should clear profile data when clear button is clicked", async () => {
    // Mock confirm to return true
    global.confirm = vi.fn(() => true);

    const clearBtn = wrapper.find(".clear-btn");
    await clearBtn.trigger("click");

    expect(global.confirm).toHaveBeenCalledWith(
      "Are you sure you want to clear all profile data? This action cannot be undone."
    );
    expect(profileStore.financialState.monthlyIncome).toBe(0);
  });

  it("should show historical data when available", async () => {
    profileStore.netWorthHistory = [
      { timestamp: "2024-01-01", totalNetWorth: 50000 },
      { timestamp: "2024-01-02", totalNetWorth: 51000 },
    ];

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.hasHistoricalData).toBe(true);
    expect(wrapper.find(".historical-data").exists()).toBe(true);
  });

  it("should format numbers correctly", () => {
    expect(wrapper.vm.formatNumber(1234567)).toBe("1,234,567");
    expect(wrapper.vm.formatNumber(0)).toBe("0");
  });

  it("should format dates correctly", () => {
    const testDate = "2024-01-01T10:00:00.000Z";
    const formatted = wrapper.vm.formatDate(testDate);
    expect(formatted).toMatch(/Jan 1, 2024/);
  });
});

describe("Profile Integration Tests", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it("should maintain data separation between calculators and profile", () => {
    // Calculator data
    const calculatorData = {
      monthlyIncome: 5000,
      existingSavings: 25000,
    };

    // Profile data
    profileStore.financialState.monthlyIncome = 6000;
    profileStore.financialState.existingSavings = 30000;

    // They should be different
    expect(calculatorData.monthlyIncome).not.toBe(
      profileStore.financialState.monthlyIncome
    );
    expect(calculatorData.existingSavings).not.toBe(
      profileStore.financialState.existingSavings
    );
  });

  it("should handle profile data updates correctly", () => {
    // Initial state
    expect(profileStore.financialState.monthlyIncome).toBe(0);

    // Update via actions
    profileActions.updateProfileField("monthlyIncome", 5000);
    expect(profileStore.financialState.monthlyIncome).toBe(5000);

    // Update via save method
    profileActions.saveDownPaymentData({ monthlyIncome: 6000 });
    expect(profileStore.financialState.monthlyIncome).toBe(6000);
  });

  it("should maintain historical data integrity", () => {
    // Add some history
    profileActions.saveNetWorthData({
      assets: { cashChecking: 10000 },
      liabilities: { creditCards: 2000 },
      totalNetWorth: 8000,
    });

    expect(profileStore.netWorthHistory).toHaveLength(1);
    expect(profileStore.netWorthHistory[0].totalNetWorth).toBe(8000);

    // Verify snapshot contains correct data
    const snapshot = profileStore.netWorthHistory[0];
    expect(snapshot.assets.cashChecking).toBe(10000);
    expect(snapshot.liabilities.creditCards).toBe(2000);
  });
});
