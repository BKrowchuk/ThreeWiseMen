import { reactive } from 'vue'

// Profile store state for persistent user financial data
export const profileStore = reactive({
  // User's current financial state
  financialState: {
    // Income
    monthlyIncome: 0,
    
    // Savings
    existingSavings: 0,
    emergencyFund: 0,
    homeFund: 0,
    rrspFhsa: 0,
    
    // Assets
    assets: {
      cashChecking: 0,
      highInterestSavings: 0,
      tfsa: 0,
      rrsp: 0,
      fhsa: 0,
      investments: 0,
      otherAssets: 0
    },
    
    // Liabilities
    liabilities: {
      creditCards: 0,
      linesOfCredit: 0,
      carLoans: 0,
      studentLoans: 0,
      otherDebts: 0
    },
    
    // Budget
    budget: {
      fixedExpenses: {
        rentMortgage: 0,
        utilities: 0,
        internet: 0,
        phone: 0,
        insurance: 0,
        transitCar: 0,
        subscriptions: 0,
        minimumDebtPayments: 0
      },
      variableExpenses: {
        groceries: 0,
        dining: 0,
        gas: 0,
        shopping: 0,
        personal: 0,
        travel: 0,
        miscellaneous: 0
      },
      savings: {
        emergencyFund: 0,
        homeFund: 0,
        rrspFhsa: 0
      }
    },
    
    // Financial goals
    goals: {
      downPaymentTarget: 0,
      monthlySavingsGoal: 0,
      targetTimeline: 0
    }
  },
  
  // Historical snapshots
  netWorthHistory: [],
  cashFlowHistory: [],
  
  // Last updated timestamps
  lastUpdated: {
    financialState: null,
    netWorth: null,
    cashFlow: null,
    goals: null
  }
})

// Actions for managing profile data
export const profileActions = {
  // Save down payment calculator results to profile
  saveDownPaymentData(data) {
    const { monthlyIncome, existingSavings, downPaymentTarget, monthlySavingsGoal, timeline } = data
    
    if (monthlyIncome !== undefined) {
      profileStore.financialState.monthlyIncome = monthlyIncome
      profileStore.lastUpdated.financialState = new Date().toISOString()
    }
    
    if (existingSavings !== undefined) {
      profileStore.financialState.existingSavings = existingSavings
      profileStore.lastUpdated.financialState = new Date().toISOString()
    }
    
    if (downPaymentTarget !== undefined) {
      profileStore.financialState.goals.downPaymentTarget = downPaymentTarget
      profileStore.lastUpdated.goals = new Date().toISOString()
    }
    
    if (monthlySavingsGoal !== undefined) {
      profileStore.financialState.goals.monthlySavingsGoal = monthlySavingsGoal
      profileStore.financialState.goals.targetTimeline = timeline
      profileStore.lastUpdated.goals = new Date().toISOString()
    }
    
    this.saveToLocalStorage()
  },
  
  // Save net worth calculator results to profile
  saveNetWorthData(data) {
    const { assets, liabilities, totalNetWorth } = data
    
    if (assets) {
      Object.assign(profileStore.financialState.assets, assets)
    }
    
    if (liabilities) {
      Object.assign(profileStore.financialState.liabilities, liabilities)
    }
    
    // Add to history
    profileStore.netWorthHistory.push({
      timestamp: new Date().toISOString(),
      assets: { ...profileStore.financialState.assets },
      liabilities: { ...profileStore.financialState.liabilities },
      totalNetWorth
    })
    
    // Keep only last 12 snapshots
    if (profileStore.netWorthHistory.length > 12) {
      profileStore.netWorthHistory.shift()
    }
    
    profileStore.lastUpdated.netWorth = new Date().toISOString()
    this.saveToLocalStorage()
  },
  
  // Save cash flow calculator results to profile
  saveCashFlowData(data) {
    const { income, fixedExpenses, variableExpenses, savings, totalCashFlow } = data
    
    if (income?.monthlyIncome !== undefined) {
      profileStore.financialState.monthlyIncome = income.monthlyIncome
    }
    
    if (fixedExpenses) {
      Object.assign(profileStore.financialState.budget.fixedExpenses, fixedExpenses)
    }
    
    if (variableExpenses) {
      Object.assign(profileStore.financialState.budget.variableExpenses, variableExpenses)
    }
    
    if (savings) {
      Object.assign(profileStore.financialState.budget.savings, savings)
    }
    
    // Add to history
    profileStore.cashFlowHistory.push({
      timestamp: new Date().toISOString(),
      income: { ...profileStore.financialState.budget.fixedExpenses },
      expenses: { ...profileStore.financialState.budget.variableExpenses },
      savings: { ...profileStore.financialState.budget.savings },
      totalCashFlow
    })
    
    // Keep only last 12 snapshots
    if (profileStore.cashFlowHistory.length > 12) {
      profileStore.cashFlowHistory.shift()
    }
    
    profileStore.lastUpdated.cashFlow = new Date().toISOString()
    profileStore.lastUpdated.financialState = new Date().toISOString()
    this.saveToLocalStorage()
  },
  
  // Update specific profile field
  updateProfileField(path, value) {
    const pathArray = path.split('.')
    let current = profileStore.financialState
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      current = current[pathArray[i]]
    }
    
    current[pathArray[pathArray.length - 1]] = value
    profileStore.lastUpdated.financialState = new Date().toISOString()
    this.saveToLocalStorage()
  },
  
  // Load profile data from local storage
  loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem('threeWiseMenProfile')
      if (stored) {
        const parsed = JSON.parse(stored)
        Object.assign(profileStore, parsed)
      }
    } catch (error) {
      console.warn('Failed to load profile data from localStorage:', error)
    }
  },
  
  // Save profile data to local storage
  saveToLocalStorage() {
    try {
      localStorage.setItem('threeWiseMenProfile', JSON.stringify(profileStore))
    } catch (error) {
      console.warn('Failed to save profile data to localStorage:', error)
    }
  },
  
  // Clear all profile data
  clearProfileData() {
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
        otherAssets: 0
      },
      liabilities: {
        creditCards: 0,
        linesOfCredit: 0,
        carLoans: 0,
        studentLoans: 0,
        otherDebts: 0
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
          minimumDebtPayments: 0
        },
        variableExpenses: {
          groceries: 0,
          dining: 0,
          gas: 0,
          shopping: 0,
          personal: 0,
          travel: 0,
          miscellaneous: 0
        },
        savings: {
          emergencyFund: 0,
          homeFund: 0,
          rrspFhsa: 0
        }
      },
      goals: {
        downPaymentTarget: 0,
        monthlySavingsGoal: 0,
        targetTimeline: 0
      }
    }
    
    profileStore.netWorthHistory = []
    profileStore.cashFlowHistory = []
    profileStore.lastUpdated = {
      financialState: null,
      netWorth: null,
      cashFlow: null,
      goals: null
    }
    
    this.saveToLocalStorage()
  },
  
  // Get profile data for comparison
  getProfileComparison(calculatorType) {
    switch (calculatorType) {
      case 'downPayment':
        return {
          monthlyIncome: profileStore.financialState.monthlyIncome,
          existingSavings: profileStore.financialState.existingSavings,
          downPaymentTarget: profileStore.financialState.goals.downPaymentTarget,
          monthlySavingsGoal: profileStore.financialState.goals.monthlySavingsGoal
        }
      case 'netWorth':
        return {
          assets: { ...profileStore.financialState.assets },
          liabilities: { ...profileStore.financialState.liabilities }
        }
      case 'cashFlow':
        return {
          monthlyIncome: profileStore.financialState.monthlyIncome,
          fixedExpenses: { ...profileStore.financialState.budget.fixedExpenses },
          variableExpenses: { ...profileStore.financialState.budget.variableExpenses },
          savings: { ...profileStore.financialState.budget.savings }
        }
      default:
        return {}
    }
  },
  
  // Check if profile has data for a specific calculator
  hasProfileData(calculatorType) {
    const comparison = this.getProfileComparison(calculatorType)
    return Object.values(comparison).some(value => 
      value && (typeof value === 'number' ? value > 0 : Object.values(value).some(v => v > 0))
    )
  }
}

// Initialize store by loading from localStorage
profileActions.loadFromLocalStorage()

// Export store and actions
export default {
  store: profileStore,
  actions: profileActions
}
