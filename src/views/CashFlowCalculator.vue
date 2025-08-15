<template>
  <div class="cash-flow-calculator">
    <div class="page-header">
      <div class="header-content">
        <h1>Cash Flow Calculator</h1>
        <p>
          Analyze your monthly income vs expenses and identify savings
          opportunities
        </p>
      </div>
      <div class="header-navigation">
        <router-link to="/calculators" class="back-link"
          >← Back to Calculators</router-link
        >
      </div>
    </div>

    <div class="calculator-container">
      <div class="form-section">
        <h2>Your Monthly Financial Information</h2>

        <form @submit.prevent="calculateCashFlow" class="calculator-form">
          <!-- Left Column: Income & Fixed Expenses -->
          <div class="form-column left-column">
            <!-- Income Section -->
            <div class="section-group income-section">
              <h3>💰 Income</h3>
              <p class="section-description">
                Enter your monthly take-home income after taxes and benefits
              </p>

              <div class="form-group">
                <label for="monthlyIncome">
                  Monthly Income (After Tax & Benefits)
                  <span
                    class="tooltip"
                    title="Your take-home pay after all deductions"
                    >ⓘ</span
                  >
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="monthlyIncome"
                    v-model="formData.income.monthlyIncome"
                    type="text"
                    placeholder="4,800"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
                <div class="example-text">Example: $4,800</div>
              </div>
            </div>

            <!-- Fixed Expenses Section -->
            <div class="section-group expenses-section">
              <h3>🏠 Fixed Expenses</h3>
              <p class="section-description">
                Monthly expenses that stay relatively consistent
              </p>

              <div class="form-group">
                <label for="rentMortgage">
                  Rent/Mortgage
                  <span class="tooltip" title="Monthly housing payment">ⓘ</span>
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="rentMortgage"
                    v-model="formData.fixedExpenses.rentMortgage"
                    type="text"
                    placeholder="1,800"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="utilities">
                  Utilities
                  <span class="tooltip" title="Electricity, water, gas, etc."
                    >ⓘ</span
                  >
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="utilities"
                    v-model="formData.fixedExpenses.utilities"
                    type="text"
                    placeholder="200"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="internet">
                  Internet
                  <span class="tooltip" title="Monthly internet service"
                    >ⓘ</span
                  >
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="internet"
                    v-model="formData.fixedExpenses.internet"
                    type="text"
                    placeholder="80"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="phone">
                  Phone
                  <span class="tooltip" title="Monthly phone service">ⓘ</span>
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="phone"
                    v-model="formData.fixedExpenses.phone"
                    type="text"
                    placeholder="60"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="insurance">
                  Insurance
                  <span
                    class="tooltip"
                    title="Health, car, home, life insurance"
                    >ⓘ</span
                  >
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="insurance"
                    v-model="formData.fixedExpenses.insurance"
                    type="text"
                    placeholder="150"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="transitCar">
                  Transit/Car
                  <span
                    class="tooltip"
                    title="Gas, parking, transit passes, car maintenance"
                    >ⓘ</span
                  >
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="transitCar"
                    v-model="formData.fixedExpenses.transitCar"
                    type="text"
                    placeholder="300"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="subscriptions">
                  Subscriptions
                  <span class="tooltip" title="Streaming, gym, software, etc."
                    >ⓘ</span
                  >
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="subscriptions"
                    v-model="formData.fixedExpenses.subscriptions"
                    type="text"
                    placeholder="50"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="minimumDebtPayments">
                  Minimum Debt Payments
                  <span
                    class="tooltip"
                    title="Minimum payments on credit cards, loans"
                    >ⓘ</span
                  >
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="minimumDebtPayments"
                    v-model="formData.fixedExpenses.minimumDebtPayments"
                    type="text"
                    placeholder="200"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Variable Expenses & Savings -->
          <div class="form-column right-column">
            <!-- Variable Expenses Section -->
            <div class="section-group variable-section">
              <h3>🛒 Variable Expenses</h3>
              <p class="section-description">
                Expenses that can vary month to month
              </p>

              <div class="form-group">
                <label for="groceries">
                  Groceries
                  <span class="tooltip" title="Food and household items"
                    >ⓘ</span
                  >
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="groceries"
                    v-model="formData.variableExpenses.groceries"
                    type="text"
                    placeholder="400"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="dining">
                  Dining Out
                  <span
                    class="tooltip"
                    title="Restaurants, takeout, coffee shops"
                    >ⓘ</span
                  >
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="dining"
                    v-model="formData.variableExpenses.dining"
                    type="text"
                    placeholder="200"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="gas">
                  Gas
                  <span class="tooltip" title="Fuel for your vehicle">ⓘ</span>
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="gas"
                    v-model="formData.variableExpenses.gas"
                    type="text"
                    placeholder="150"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="shopping">
                  Shopping
                  <span
                    class="tooltip"
                    title="Clothing, electronics, home goods"
                    >ⓘ</span
                  >
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="shopping"
                    v-model="formData.variableExpenses.shopping"
                    type="text"
                    placeholder="200"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="personal">
                  Personal
                  <span class="tooltip" title="Haircuts, personal care, hobbies"
                    >ⓘ</span
                  >
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="personal"
                    v-model="formData.variableExpenses.personal"
                    type="text"
                    placeholder="100"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="travel">
                  Travel
                  <span
                    class="tooltip"
                    title="Vacations, weekend trips, travel expenses"
                    >ⓘ</span
                  >
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="travel"
                    v-model="formData.variableExpenses.travel"
                    type="text"
                    placeholder="150"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="miscellaneous">
                  Miscellaneous
                  <span class="tooltip" title="Other variable expenses">ⓘ</span>
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="miscellaneous"
                    v-model="formData.variableExpenses.miscellaneous"
                    type="text"
                    placeholder="100"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
              </div>
            </div>

            <!-- Savings/Transfers Section -->
            <div class="section-group savings-section">
              <h3>💎 Savings & Transfers</h3>
              <p class="section-description">
                Money you're setting aside for future goals
              </p>

              <div class="form-group">
                <label for="emergencyFund">
                  Emergency Fund
                  <span
                    class="tooltip"
                    title="Monthly contribution to emergency savings"
                    >ⓘ</span
                  >
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="emergencyFund"
                    v-model="formData.savings.emergencyFund"
                    type="text"
                    placeholder="200"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="homeFund">
                  Home Fund
                  <span
                    class="tooltip"
                    title="Monthly savings for home purchase"
                    >ⓘ</span
                  >
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="homeFund"
                    v-model="formData.savings.homeFund"
                    type="text"
                    placeholder="2,167"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
                <div class="example-text">
                  Example: $2,167 (from Down Payment Calculator)
                </div>
              </div>

              <div class="form-group">
                <label for="rrspFhsa">
                  RRSP/FHSA Contributions
                  <span
                    class="tooltip"
                    title="Monthly retirement and home savings contributions"
                    >ⓘ</span
                  >
                </label>
                <div class="input-wrapper">
                  <span class="currency-symbol">$</span>
                  <input
                    id="rrspFhsa"
                    v-model="formData.savings.rrspFhsa"
                    type="text"
                    placeholder="400"
                    @blur="formatCurrency"
                    @input="clearValidation"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        <!-- Calculate Button -->
        <div class="calculate-section">
          <button
            type="submit"
            class="calculate-btn"
            :disabled="isCalculating"
            @click="calculateCashFlow"
          >
            {{ isCalculating ? "Calculating..." : "Calculate Cash Flow" }}
          </button>
        </div>
      </div>

      <!-- Results Section -->
      <div class="results-section" v-if="showResults">
        <h2>Your Cash Flow Analysis</h2>

        <div class="results-grid">
          <!-- Total Income -->
          <div class="result-card income">
            <h3>Total Income</h3>
            <div class="result-value positive">
              ${{ formatNumber(totalIncome) }}
            </div>
            <div class="result-detail">Monthly take-home income</div>
          </div>

          <!-- Total Fixed Expenses -->
          <div class="result-card fixed-expenses">
            <h3>Total Fixed Expenses</h3>
            <div class="result-value negative">
              ${{ formatNumber(totalFixedExpenses) }}
            </div>
            <div class="result-detail">Monthly fixed costs</div>
          </div>

          <!-- Total Variable Expenses -->
          <div class="result-card variable-expenses">
            <h3>Total Variable Expenses</h3>
            <div class="result-value negative">
              ${{ formatNumber(totalVariableExpenses) }}
            </div>
            <div class="result-detail">Monthly variable costs</div>
          </div>

          <!-- Total Savings -->
          <div class="result-card savings">
            <h3>Total Savings</h3>
            <div class="result-value positive">
              ${{ formatNumber(totalSavings) }}
            </div>
            <div class="result-detail">Monthly savings & transfers</div>
          </div>

          <!-- Cash Surplus/Deficit -->
          <div
            class="result-card cash-flow"
            :class="{ positive: cashSurplus >= 0, negative: cashSurplus < 0 }"
          >
            <h3>Cash Surplus/Deficit</h3>
            <div
              class="result-value"
              :class="{ positive: cashSurplus >= 0, negative: cashSurplus < 0 }"
            >
              ${{ formatNumber(Math.abs(cashSurplus)) }}
            </div>
            <div class="result-detail">
              {{ cashSurplus >= 0 ? "Monthly surplus" : "Monthly deficit" }}
            </div>
          </div>
        </div>

        <!-- Monthly Summary -->
        <div class="summary-section">
          <h3>Monthly Summary</h3>
          <div class="summary-grid">
            <div class="summary-item">
              <span class="summary-label">Income:</span>
              <span class="summary-value positive"
                >${{ formatNumber(totalIncome) }}</span
              >
            </div>
            <div class="summary-item">
              <span class="summary-label">Total Expenses:</span>
              <span class="summary-value negative"
                >${{ formatNumber(totalExpenses) }}</span
              >
            </div>
            <div class="summary-item">
              <span class="summary-label">Savings:</span>
              <span class="summary-value positive"
                >${{ formatNumber(totalSavings) }}</span
              >
            </div>
            <div
              class="summary-item total"
              :class="{ positive: cashSurplus >= 0, negative: cashSurplus < 0 }"
            >
              <span class="summary-label">Net Result:</span>
              <span
                class="summary-value"
                :class="{
                  positive: cashSurplus >= 0,
                  negative: cashSurplus < 0,
                }"
              >
                ${{ formatNumber(Math.abs(cashSurplus)) }}
                {{ cashSurplus >= 0 ? "Surplus" : "Deficit" }}
              </span>
            </div>
          </div>
        </div>

        <!-- Annual Projections -->
        <div class="projections-section">
          <h3>Annual Projections</h3>
          <div class="projections-grid">
            <div class="projection-item">
              <span class="projection-label">Annual Income:</span>
              <span class="projection-value positive"
                >${{ formatNumber(totalIncome * 12) }}</span
              >
            </div>
            <div class="projection-item">
              <span class="projection-label">Annual Expenses:</span>
              <span class="projection-value negative"
                >${{ formatNumber(totalExpenses * 12) }}</span
              >
            </div>
            <div class="projection-item">
              <span class="projection-label">Annual Savings:</span>
              <span class="projection-value positive"
                >${{ formatNumber(totalSavings * 12) }}</span
              >
            </div>
            <div
              class="projection-item total"
              :class="{ positive: cashSurplus >= 0, negative: cashSurplus < 0 }"
            >
              <span class="projection-label">Annual Net:</span>
              <span
                class="projection-value"
                :class="{
                  positive: cashSurplus >= 0,
                  negative: cashSurplus < 0,
                }"
              >
                ${{ formatNumber(Math.abs(cashSurplus * 12)) }}
                {{ cashSurplus >= 0 ? "Surplus" : "Deficit" }}
              </span>
            </div>
          </div>
        </div>

        <!-- Financial Health Indicator -->
        <div class="health-indicator">
          <h3>Financial Health Indicator</h3>
          <div class="health-status" :class="healthStatus.class">
            <div class="status-icon">{{ healthStatus.icon }}</div>
            <div class="status-content">
              <div class="status-title">{{ healthStatus.title }}</div>
              <div class="status-description">
                {{ healthStatus.description }}
              </div>
            </div>
          </div>
        </div>

        <!-- Save to Profile Component -->
        <SaveToProfile
          calculator-type="cashFlow"
          :calculated-data="cashFlowSaveData"
          @saved="onProfileSaved"
        />
      </div>

      <!-- Validation Errors -->
      <div class="validation-errors" v-if="validationErrors.length > 0">
        <h3>Please fix the following issues:</h3>
        <ul>
          <li v-for="error in validationErrors" :key="error" class="error-item">
            {{ error }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { calculatorStore, calculatorActions } from "../store/calculators";
import SaveToProfile from "../components/SaveToProfile.vue";

export default {
  name: "CashFlowCalculator",
  components: {
    SaveToProfile,
  },
  data() {
    return {
      formData: {
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
      },
      showResults: false,
      validationErrors: [],
      isCalculating: false,
    };
  },
  mounted() {
    // Load data from store if available
    if (
      calculatorStore.cashFlow.income.monthlyIncome ||
      calculatorStore.cashFlow.fixedExpenses.rentMortgage
    ) {
      this.formData = { ...calculatorStore.cashFlow };
    }

    // Load results if available
    if (calculatorStore.cashFlow.results) {
      this.showResults = true;
    }
  },
  computed: {
    // Calculate total income
    totalIncome() {
      return this.parseCurrency(this.formData.income.monthlyIncome) || 0;
    },

    // Calculate total fixed expenses
    totalFixedExpenses() {
      return Object.values(this.formData.fixedExpenses).reduce(
        (total, value) => {
          // Ensure value is valid before processing
          if (value === null || value === undefined) return total;
          return total + (this.parseCurrency(value) || 0);
        },
        0
      );
    },

    // Calculate total variable expenses
    totalVariableExpenses() {
      return Object.values(this.formData.variableExpenses).reduce(
        (total, value) => {
          // Ensure value is valid before processing
          if (value === null || value === undefined) return total;
          return total + (this.parseCurrency(value) || 0);
        },
        0
      );
    },

    // Calculate total expenses
    totalExpenses() {
      return this.totalFixedExpenses + this.totalVariableExpenses;
    },

    // Calculate total savings
    totalSavings() {
      return Object.values(this.formData.savings).reduce((total, value) => {
        // Ensure value is valid before processing
        if (value === null || value === undefined) return total;
        return total + (this.parseCurrency(value) || 0);
      }, 0);
    },

    // Calculate cash surplus/deficit
    cashSurplus() {
      return this.totalIncome - this.totalExpenses - this.totalSavings;
    },

    // Financial health status
    healthStatus() {
      if (this.cashSurplus >= 0) {
        if (this.cashSurplus >= this.totalIncome * 0.2) {
          return {
            class: "excellent",
            icon: "🌟",
            title: "Excellent Cash Flow",
            description:
              "You have a strong positive cash flow with significant savings potential.",
          };
        } else if (this.cashSurplus >= this.totalIncome * 0.1) {
          return {
            class: "good",
            icon: "✅",
            title: "Good Cash Flow",
            description:
              "You have a positive cash flow and are building savings effectively.",
          };
        } else {
          return {
            class: "fair",
            icon: "⚠️",
            title: "Fair Cash Flow",
            description:
              "You have a positive cash flow but could benefit from expense optimization.",
          };
        }
      } else {
        if (this.cashSurplus >= -this.totalIncome * 0.1) {
          return {
            class: "poor",
            icon: "❌",
            title: "Needs Attention",
            description:
              "You have a small deficit. Consider reducing expenses or increasing income.",
          };
        } else {
          return {
            class: "critical",
            icon: "🚨",
            title: "Critical Situation",
            description:
              "You have a significant deficit. Immediate action needed to balance your budget.",
          };
        }
      }
    },

    // Data to save to profile
    cashFlowSaveData() {
      const fixedExpenses = {};
      const variableExpenses = {};
      const savings = {};

      // Convert fixed expenses to numbers
      Object.keys(this.formData.fixedExpenses).forEach((key) => {
        fixedExpenses[key] =
          this.parseCurrency(this.formData.fixedExpenses[key]) || 0;
      });

      // Convert variable expenses to numbers
      Object.keys(this.formData.variableExpenses).forEach((key) => {
        variableExpenses[key] =
          this.parseCurrency(this.formData.variableExpenses[key]) || 0;
      });

      // Convert savings to numbers
      Object.keys(this.formData.savings).forEach((key) => {
        savings[key] = this.parseCurrency(this.formData.savings[key]) || 0;
      });

      return {
        income: {
          monthlyIncome: this.totalIncome,
        },
        fixedExpenses,
        variableExpenses,
        savings,
        totalCashFlow: this.cashSurplus,
      };
    },
  },
  methods: {
    // Format currency input on blur
    formatCurrency(event) {
      const value = event.target.value.replace(/[^0-9.]/g, "");
      if (value) {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          event.target.value = this.formatNumber(numValue);
        }
      }
    },

    // Clear validation errors when user types
    clearValidation() {
      this.validationErrors = [];
      this.showResults = false;
    },

    // Parse currency input to number
    parseCurrency(value) {
      if (!value) return 0;
      // Ensure value is a string before calling replace
      if (typeof value !== "string") {
        value = String(value);
      }
      return parseFloat(value.replace(/[^0-9.]/g, ""));
    },

    // Format number with commas
    formatNumber(num) {
      return num.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    },

    // Validate form inputs
    validateForm() {
      this.validationErrors = [];

      if (!this.formData.income.monthlyIncome) {
        this.validationErrors.push("Monthly income is required");
      } else if (this.parseCurrency(this.formData.income.monthlyIncome) <= 0) {
        this.validationErrors.push("Monthly income must be greater than $0");
      }

      // Check if at least one expense category is entered
      const hasFixedExpenses = Object.values(this.formData.fixedExpenses).some(
        (value) => this.parseCurrency(value) > 0
      );
      const hasVariableExpenses = Object.values(
        this.formData.variableExpenses
      ).some((value) => this.parseCurrency(value) > 0);

      if (!hasFixedExpenses && !hasVariableExpenses) {
        this.validationErrors.push("Please enter at least one expense value");
      }

      // Validate individual values
      Object.entries(this.formData.fixedExpenses).forEach(([key, value]) => {
        if (value && this.parseCurrency(value) < 0) {
          this.validationErrors.push(
            `${this.formatExpenseLabel(key)} cannot be negative`
          );
        }
      });

      Object.entries(this.formData.variableExpenses).forEach(([key, value]) => {
        if (value && this.parseCurrency(value) < 0) {
          this.validationErrors.push(
            `${this.formatExpenseLabel(key)} cannot be negative`
          );
        }
      });

      Object.entries(this.formData.savings).forEach(([key, value]) => {
        if (value && this.parseCurrency(value) < 0) {
          this.validationErrors.push(
            `${this.formatSavingsLabel(key)} cannot be negative`
          );
        }
      });

      return this.validationErrors.length === 0;
    },

    // Format expense labels for display
    formatExpenseLabel(key) {
      const labels = {
        rentMortgage: "Rent/Mortgage",
        utilities: "Utilities",
        internet: "Internet",
        phone: "Phone",
        insurance: "Insurance",
        transitCar: "Transit/Car",
        subscriptions: "Subscriptions",
        minimumDebtPayments: "Minimum Debt Payments",
        groceries: "Groceries",
        dining: "Dining Out",
        gas: "Gas",
        shopping: "Shopping",
        personal: "Personal",
        travel: "Travel",
        miscellaneous: "Miscellaneous",
      };
      return labels[key] || key;
    },

    // Format savings labels for display
    formatSavingsLabel(key) {
      const labels = {
        emergencyFund: "Emergency Fund",
        homeFund: "Home Fund",
        rrspFhsa: "RRSP/FHSA Contributions",
      };
      return labels[key] || key;
    },

    // Calculate cash flow
    calculateCashFlow() {
      this.isCalculating = true;

      // Simulate calculation delay for better UX
      setTimeout(() => {
        if (this.validateForm()) {
          this.showResults = true;

          // Save form data and results to store
          const results = {
            totalIncome: this.totalIncome,
            totalFixedExpenses: this.totalFixedExpenses,
            totalVariableExpenses: this.totalVariableExpenses,
            totalExpenses: this.totalExpenses,
            totalSavings: this.totalSavings,
            cashSurplus: this.cashSurplus,
            healthStatus: this.healthStatus,
          };

          calculatorActions.updateCashFlowData(this.formData);
          calculatorActions.saveCashFlowResults(results);
          calculatorActions.syncData();
        }
        this.isCalculating = false;
      }, 500);
    },

    // Handle profile save
    onProfileSaved(savedData) {
      console.log("Profile saved:", savedData);
      // Could add additional logic here if needed
    },
  },
};
</script>

<style scoped>
.cash-flow-calculator {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--bg-secondary);
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  gap: 2rem;
}

.header-content h1 {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.header-content p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
}

.back-link {
  display: inline-block;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--color-primary);
  border-radius: 6px;
  transition: all var(--transition-normal);
}

.back-link:hover {
  background-color: var(--color-primary);
  color: var(--text-inverse);
}

.calculator-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 3rem;
  width: 100%;
}

.form-section,
.results-section {
  background: var(--calc-card-bg);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--calc-card-shadow);
  width: 100%;
  min-width: 0;
}

.form-section h2,
.results-section h2 {
  color: var(--text-primary);
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.calculator-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.form-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.left-column {
  border-right: 2px solid var(--border-primary);
  padding-right: 1rem;
}

.right-column {
  padding-left: 1rem;
}

.section-group {
  background: var(--bg-tertiary);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid var(--color-primary);
}

.section-group.income-section {
  border-left-color: var(--success-primary);
  background: var(--success-light);
}

.section-group.expenses-section {
  border-left-color: var(--error-primary);
  background: var(--error-light);
}

.section-group.variable-section {
  border-left-color: var(--warning-primary);
  background: var(--warning-light);
}

.section-group.savings-section {
  border-left-color: var(--info-primary);
  background: var(--info-light);
}

.section-group h3 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-description {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tooltip {
  color: var(--text-muted);
  cursor: help;
  font-size: 0.8rem;
}

.example-text {
  color: var(--text-muted);
  font-size: 0.8rem;
  font-style: italic;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.currency-symbol {
  position: absolute;
  left: 12px;
  color: var(--text-muted);
  font-weight: 500;
  z-index: 1;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 12px 12px 35px;
  border: 2px solid var(--input-border);
  border-radius: 8px;
  font-size: 1rem;
  background-color: var(--input-bg);
  color: var(--input-text);
  transition: border-color var(--transition-normal);
}

.input-wrapper input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--input-focus-shadow);
}

.calculate-section {
  text-align: center;
  padding-top: 1rem;
  border-top: 2px solid var(--border-primary);
}

.calculate-btn {
  background: var(--color-primary);
  color: var(--text-inverse);
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.calculate-btn:hover:not(:disabled) {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.calculate-btn:disabled {
  background: var(--text-disabled);
  cursor: not-allowed;
  transform: none;
  opacity: 0.6;
}

/* Results Section */
.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.result-card {
  background: var(--calc-result-bg);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  border-left: 4px solid var(--color-primary);
}

.result-card.income {
  border-left-color: var(--success-primary);
  background: var(--success-light);
}

.result-card.fixed-expenses,
.result-card.variable-expenses {
  border-left-color: var(--error-primary);
  background: var(--error-light);
}

.result-card.savings {
  border-left-color: var(--info-primary);
  background: var(--info-light);
}

.result-card.cash-flow {
  border-left-color: var(--color-primary);
  background: var(--info-light);
}

.result-card h3 {
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.result-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.result-value.positive {
  color: var(--success-primary);
}

.result-value.negative {
  color: var(--error-primary);
}

.result-detail {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.summary-section,
.projections-section {
  background: var(--bg-tertiary);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.summary-section h3,
.projections-section h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.summary-grid,
.projections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.summary-item,
.projection-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--calc-card-bg);
  border-radius: 6px;
  border: 1px solid var(--border-secondary);
}

.summary-item.total,
.projection-item.total {
  font-weight: 600;
  background: var(--info-light);
  border-left: 3px solid var(--color-primary);
}

.summary-label,
.projection-label {
  font-weight: 500;
  color: var(--text-primary);
}

.summary-value,
.projection-value {
  font-weight: 600;
}

.summary-value.positive,
.projection-value.positive {
  color: var(--success-primary);
}

.summary-value.negative,
.projection-value.negative {
  color: var(--error-primary);
}

.health-indicator {
  background: var(--bg-tertiary);
  padding: 1.5rem;
  border-radius: 8px;
}

.health-indicator h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.health-status {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--calc-card-bg);
  border-radius: 8px;
  border: 1px solid var(--border-secondary);
}

.health-status.excellent {
  border-left: 4px solid var(--success-primary);
}

.health-status.good {
  border-left: 4px solid var(--info-primary);
}

.health-status.fair {
  border-left: 4px solid var(--warning-primary);
}

.health-status.poor {
  border-left: 4px solid var(--error-primary);
}

.health-status.critical {
  border-left: 4px solid var(--error-dark);
}

.status-icon {
  font-size: 2rem;
}

.status-title {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.status-description {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.validation-errors {
  background: #fdf2f2;
  border: 2px solid #e74c3c;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.validation-errors h3 {
  color: var(--error-primary);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.validation-errors ul {
  margin: 0;
  padding-left: 1.5rem;
}

.error-item {
  color: var(--error-primary);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .cash-flow-calculator {
    max-width: 1200px;
  }
}

@media (max-width: 1024px) {
  .calculator-container {
    gap: 2rem;
  }

  .calculator-form {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .left-column {
    border-right: none;
    padding-right: 0;
  }

  .right-column {
    padding-left: 0;
  }
}

@media (max-width: 768px) {
  .cash-flow-calculator {
    padding: 1rem;
    max-width: 100%;
  }

  .page-header {
    flex-direction: column;
    gap: 1rem;
  }

  .header-content h1 {
    font-size: 2rem;
  }

  .form-section,
  .results-section {
    padding: 1.5rem;
  }

  .section-group {
    padding: 1rem;
  }

  .results-grid {
    grid-template-columns: 1fr;
  }

  .summary-grid,
  .projections-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .calculator-form {
    gap: 1rem;
  }

  .section-group {
    padding: 0.75rem;
  }
}
</style>
