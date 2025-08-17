import { reactive } from "vue";

// Calculator store state
export const calculatorStore = reactive({
  // Down Payment Calculator data
  downPayment: {
    propertyPrice: "",
    downPayment: "",
    closingCosts: "3.5",
    existingSavings: "",
    timeline: "",
    monthlyIncome: "",
    results: null,
  },

  // Net Worth Calculator data
  netWorth: {
    assets: {
      cashChecking: "",
      highInterestSavings: "",
      tfsa: "",
      rrsp: "",
      fhsa: "",
      investments: "",
      otherAssets: "",
    },
    liabilities: {
      creditCards: "",
      linesOfCredit: "",
      carLoans: "",
      studentLoans: "",
      otherDebts: "",
    },
    results: null,
  },

  // Cash Flow Calculator data
  cashFlow: {
    income: {
      monthlyIncome: "",
    },
    fixedExpenses: {
      rentMortgage: "",
      utilities: "",
      internet: "",
      phone: "",
      insurance: "",
      transitCar: "",
      subscriptions: "",
      minimumDebtPayments: "",
    },
    variableExpenses: {
      groceries: "",
      dining: "",
      gas: "",
      shopping: "",
      personal: "",
      travel: "",
      miscellaneous: "",
    },
    savings: {
      emergencyFund: "",
      homeFund: "",
      rrspFhsa: "",
    },
    results: null,
  },

  // Mortgage Affordability Calculator data
  mortgageAffordability: {
    annualIncome: "",
    downPayment: "",
    creditCardPayments: "",
    carPayments: "",
    otherDebts: "",
    propertyTaxes: "",
    heatingCosts: "",
    condoFees: "",
    otherHousingCosts: "",
    results: null,
  },

  // Cross-calculator shared data
  shared: {
    monthlyIncome: "",
    monthlySavings: "",
    homeFundTarget: "",
  },
});

// Actions for updating calculator data
export const calculatorActions = {
  // Update down payment calculator data
  updateDownPaymentData(data) {
    Object.assign(calculatorStore.downPayment, data);
    this.saveToLocalStorage();
  },

  // Update net worth calculator data
  updateNetWorthData(data) {
    Object.assign(calculatorStore.netWorth, data);
    this.saveToLocalStorage();
  },

  // Update cash flow calculator data
  updateCashFlowData(data) {
    Object.assign(calculatorStore.cashFlow, data);
    this.saveToLocalStorage();
  },

  // Update mortgage affordability calculator data
  updateMortgageAffordabilityData(data) {
    Object.assign(calculatorStore.mortgageAffordability, data);
    this.saveToLocalStorage();
  },

  // Update shared data
  updateSharedData(data) {
    Object.assign(calculatorStore.shared, data);
    this.saveToLocalStorage();
  },

  // Save results to store
  saveDownPaymentResults(results) {
    calculatorStore.downPayment.results = results;
    this.saveToLocalStorage();
  },

  saveNetWorthResults(results) {
    calculatorStore.netWorth.results = results;
    this.saveToLocalStorage();
  },

  saveCashFlowResults(results) {
    calculatorStore.cashFlow.results = results;
    this.saveToLocalStorage();
  },

  saveMortgageAffordabilityResults(results) {
    calculatorStore.mortgageAffordability.results = results;
    this.saveToLocalStorage();
  },

  // Load data from local storage
  loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem("threeWiseMenCalculators");
      if (stored) {
        const parsed = JSON.parse(stored);
        Object.assign(calculatorStore, parsed);
      }
    } catch (error) {
      console.warn("Failed to load calculator data from localStorage:", error);
    }
  },

  // Save data to local storage
  saveToLocalStorage() {
    try {
      localStorage.setItem(
        "threeWiseMenCalculators",
        JSON.stringify(calculatorStore)
      );
    } catch (error) {
      console.warn("Failed to save calculator data to localStorage:", error);
    }
  },

  // Clear all calculator data
  clearAllData() {
    calculatorStore.downPayment = {
      propertyPrice: "",
      downPayment: "",
      closingCosts: "3.5",
      existingSavings: "",
      timeline: "",
      monthlyIncome: "",
      results: null,
    };
    calculatorStore.netWorth = {
      assets: {
        cashChecking: "",
        highInterestSavings: "",
        tfsa: "",
        rrsp: "",
        fhsa: "",
        investments: "",
        otherAssets: "",
      },
      liabilities: {
        creditCards: "",
        linesOfCredit: "",
        carLoans: "",
        studentLoans: "",
        otherDebts: "",
      },
      results: null,
    };
    calculatorStore.cashFlow = {
      income: {
        monthlyIncome: "",
      },
      fixedExpenses: {
        rentMortgage: "",
        utilities: "",
        internet: "",
        phone: "",
        insurance: "",
        transitCar: "",
        subscriptions: "",
        minimumDebtPayments: "",
      },
      variableExpenses: {
        groceries: "",
        dining: "",
        gas: "",
        shopping: "",
        personal: "",
        travel: "",
        miscellaneous: "",
      },
      savings: {
        emergencyFund: "",
        homeFund: "",
        rrspFhsa: "",
      },
      results: null,
    };
    calculatorStore.mortgageAffordability = {
      annualIncome: "",
      downPayment: "",
      creditCardPayments: "",
      carPayments: "",
      otherDebts: "",
      propertyTaxes: "",
      heatingCosts: "",
      condoFees: "",
      otherHousingCosts: "",
      results: null,
    };
    calculatorStore.shared = {
      monthlyIncome: "",
      monthlySavings: "",
      homeFundTarget: "",
    };
    this.saveToLocalStorage();
  },

  // Sync data between calculators
  syncData() {
    // Sync monthly income across calculators
    if (calculatorStore.downPayment.monthlyIncome) {
      calculatorStore.cashFlow.income.monthlyIncome =
        calculatorStore.downPayment.monthlyIncome;
      calculatorStore.shared.monthlyIncome =
        calculatorStore.downPayment.monthlyIncome;
    }

    // Sync home fund target from down payment calculator to cash flow calculator
    if (calculatorStore.downPayment.results?.monthlySavingsTarget) {
      calculatorStore.cashFlow.savings.homeFund =
        calculatorStore.downPayment.results.monthlySavingsTarget;
      calculatorStore.shared.homeFundTarget =
        calculatorStore.downPayment.results.monthlySavingsTarget;
    }

    // Sync monthly savings from cash flow calculator
    if (calculatorStore.cashFlow.results?.totalSavings) {
      calculatorStore.shared.monthlySavings =
        calculatorStore.cashFlow.results.totalSavings;
    }

    this.saveToLocalStorage();
  },
};

// Initialize store by loading from localStorage
calculatorActions.loadFromLocalStorage();

// Export store and actions
export default {
  store: calculatorStore,
  actions: calculatorActions,
};
