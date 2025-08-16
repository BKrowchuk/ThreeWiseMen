<template>
  <div class="net-worth-calculator">
    <div class="page-header">
      <div class="header-content">
        <h1>Net Worth Calculator</h1>
        <p>
          Calculate your total financial position by analyzing your assets and
          liabilities
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
        <h2>Your Financial Information</h2>

        <form @submit.prevent="calculateNetWorth" class="calculator-form">
          <!-- Assets Column -->
          <div class="form-column assets-column">
            <div class="column-header">
              <h3>💰 Assets</h3>
              <p>Enter the current value of your assets</p>
            </div>

            <div class="form-group">
              <label for="cashChecking">
                Cash & Checking Accounts
                <span class="tooltip" title="Money in your bank accounts"
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="cashChecking"
                  v-model="formData.assets.cashChecking"
                  type="text"
                  placeholder="5,000"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="highInterestSavings">
                High-Interest Savings
                <span
                  class="tooltip"
                  title="Savings accounts with higher interest rates"
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="highInterestSavings"
                  v-model="formData.assets.highInterestSavings"
                  type="text"
                  placeholder="15,000"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="tfsa">
                TFSA (Tax-Free Savings Account)
                <span
                  class="tooltip"
                  title="Canadian tax-free investment account"
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="tfsa"
                  v-model="formData.assets.tfsa"
                  type="text"
                  placeholder="25,000"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="rrsp">
                RRSP (Registered Retirement Savings Plan)
                <span
                  class="tooltip"
                  title="Canadian retirement savings account with tax benefits"
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="rrsp"
                  v-model="formData.assets.rrsp"
                  type="text"
                  placeholder="50,000"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="fhsa">
                FHSA (First Home Savings Account)
                <span
                  class="tooltip"
                  title="Canadian account for first-time homebuyers"
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="fhsa"
                  v-model="formData.assets.fhsa"
                  type="text"
                  placeholder="8,000"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="investments">
                Other Investments
                <span
                  class="tooltip"
                  title="Stocks, bonds, mutual funds, ETFs, etc."
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="investments"
                  v-model="formData.assets.investments"
                  type="text"
                  placeholder="30,000"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="otherAssets">
                Other Assets
                <span
                  class="tooltip"
                  title="Vehicles, jewelry, collectibles, etc."
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="otherAssets"
                  v-model="formData.assets.otherAssets"
                  type="text"
                  placeholder="10,000"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>
          </div>

          <!-- Liabilities Column -->
          <div class="form-column liabilities-column">
            <div class="column-header">
              <h3>💳 Liabilities</h3>
              <p>Enter the current balance of your debts</p>
            </div>

            <div class="form-group">
              <label for="creditCards">
                Credit Cards
                <span
                  class="tooltip"
                  title="Outstanding balances on all credit cards"
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="creditCards"
                  v-model="formData.liabilities.creditCards"
                  type="text"
                  placeholder="2,500"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="linesOfCredit">
                Lines of Credit
                <span
                  class="tooltip"
                  title="Personal or home equity lines of credit"
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="linesOfCredit"
                  v-model="formData.liabilities.linesOfCredit"
                  type="text"
                  placeholder="15,000"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="carLoans">
                Car Loans
                <span
                  class="tooltip"
                  title="Outstanding balance on vehicle loans"
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="carLoans"
                  v-model="formData.liabilities.carLoans"
                  type="text"
                  placeholder="18,000"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="studentLoans">
                Student Loans
                <span
                  class="tooltip"
                  title="Outstanding balance on education loans"
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="studentLoans"
                  v-model="formData.liabilities.studentLoans"
                  type="text"
                  placeholder="25,000"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="otherDebts">
                Other Debts
                <span
                  class="tooltip"
                  title="Personal loans, medical bills, etc."
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="otherDebts"
                  v-model="formData.liabilities.otherDebts"
                  type="text"
                  placeholder="5,000"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>
          </div>
        </form>

        <!-- Calculate Button -->
        <div class="calculate-section">
          <div class="action-buttons">
            <button
              type="submit"
              class="calculate-btn"
              :disabled="isCalculating"
              @click="calculateNetWorth"
            >
              {{ isCalculating ? "Calculating..." : "Calculate Net Worth" }}
            </button>

            <LoadFromProfile
              calculator-type="netWorth"
              @load="onProfileLoaded"
            />
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div class="results-section" v-if="showResults">
        <h2>Your Net Worth Summary</h2>

        <div class="results-grid">
          <!-- Total Assets -->
          <div class="result-card assets">
            <h3>Total Assets</h3>
            <div class="result-value positive">
              ${{ formatNumber(totalAssets) }}
            </div>
            <div class="result-detail">Combined value of all your assets</div>
          </div>

          <!-- Total Liabilities -->
          <div class="result-card liabilities">
            <h3>Total Liabilities</h3>
            <div class="result-value negative">
              ${{ formatNumber(totalLiabilities) }}
            </div>
            <div class="result-detail">Combined balance of all your debts</div>
          </div>

          <!-- Net Worth -->
          <div
            class="result-card net-worth"
            :class="{ positive: netWorth >= 0, negative: netWorth < 0 }"
          >
            <h3>Net Worth</h3>
            <div
              class="result-value"
              :class="{ positive: netWorth >= 0, negative: netWorth < 0 }"
            >
              ${{ formatNumber(Math.abs(netWorth)) }}
            </div>
            <div class="result-detail">
              {{ netWorth >= 0 ? "Positive" : "Negative" }} net worth
            </div>
          </div>
        </div>

        <!-- Detailed Breakdown -->
        <div class="breakdown-section">
          <h3>Detailed Breakdown</h3>

          <div class="breakdown-grid">
            <div class="breakdown-column">
              <h4>Assets Breakdown</h4>
              <div
                class="breakdown-item"
                v-for="(value, key) in assetBreakdown"
                :key="`asset-${key}`"
              >
                <span class="item-label">{{ formatAssetLabel(key) }}</span>
                <span class="item-value positive"
                  >${{ formatNumber(value) }}</span
                >
              </div>
            </div>

            <div class="breakdown-column">
              <h4>Liabilities Breakdown</h4>
              <div
                class="breakdown-item"
                v-for="(value, key) in liabilityBreakdown"
                :key="`liability-${key}`"
              >
                <span class="item-label">{{ formatLiabilityLabel(key) }}</span>
                <span class="item-value negative"
                  >${{ formatNumber(value) }}</span
                >
              </div>
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
          calculator-type="netWorth"
          :calculated-data="netWorthSaveData"
          @saved="onProfileSaved"
          v-if="hasDataToSave"
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
import LoadFromProfile from "../components/LoadFromProfile.vue";

export default {
  name: "NetWorthCalculator",
  components: {
    SaveToProfile,
    LoadFromProfile,
  },
  data() {
    return {
      formData: {
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
      },
      showResults: false,
      validationErrors: [],
      isCalculating: false,
    };
  },
  mounted() {
    // Only load data from store if coming from "View Details" link
    const shouldLoadData = this.$route.query.loadData === 'true';
    
    if (shouldLoadData) {
      // Load data from store if available
      if (
        calculatorStore.netWorth.assets.cashChecking ||
        calculatorStore.netWorth.liabilities.creditCards
      ) {
        this.formData = { ...calculatorStore.netWorth };
      }

      // Load results if available
      if (calculatorStore.netWorth.results) {
        this.showResults = true;
      }
    }
  },
  computed: {
    // Calculate total assets
    totalAssets() {
      return Object.values(this.formData.assets).reduce((total, value) => {
        // Ensure value is valid before processing
        if (value === null || value === undefined) return total;
        return total + (this.parseCurrency(value) || 0);
      }, 0);
    },

    // Calculate total liabilities
    totalLiabilities() {
      return Object.values(this.formData.liabilities).reduce((total, value) => {
        // Ensure value is valid before processing
        if (value === null || value === undefined) return total;
        return total + (this.parseCurrency(value) || 0);
      }, 0);
    },

    // Calculate net worth
    netWorth() {
      return this.totalAssets - this.totalLiabilities;
    },

    // Asset breakdown for display
    assetBreakdown() {
      const breakdown = {};
      Object.entries(this.formData.assets).forEach(([key, value]) => {
        const numValue = this.parseCurrency(value) || 0;
        if (numValue > 0) {
          breakdown[key] = numValue;
        }
      });
      return breakdown;
    },

    // Liability breakdown for display
    liabilityBreakdown() {
      const breakdown = {};
      Object.entries(this.formData.liabilities).forEach(([key, value]) => {
        const numValue = this.parseCurrency(value) || 0;
        if (numValue > 0) {
          breakdown[key] = numValue;
        }
      });
      return breakdown;
    },

    // Financial health status
    healthStatus() {
      if (this.netWorth >= 0) {
        if (this.netWorth >= this.totalAssets * 0.5) {
          return {
            class: "excellent",
            icon: "🌟",
            title: "Excellent Financial Health",
            description:
              "You have a strong positive net worth with minimal debt relative to assets.",
          };
        } else if (this.netWorth >= this.totalAssets * 0.2) {
          return {
            class: "good",
            icon: "✅",
            title: "Good Financial Health",
            description:
              "You have a positive net worth and are building wealth effectively.",
          };
        } else {
          return {
            class: "fair",
            icon: "⚠️",
            title: "Fair Financial Health",
            description:
              "You have a positive net worth but could benefit from reducing debt.",
          };
        }
      } else {
        return {
          class: "poor",
          icon: "❌",
          title: "Needs Improvement",
          description:
            "Your liabilities exceed your assets. Focus on debt reduction and building savings.",
        };
      }
    },

    // Check if there's meaningful data to save
    hasDataToSave() {
      // Check if any asset or liability field has been filled (even with zero)
      const hasAssetData = Object.values(this.formData.assets).some(
        (value) => value !== "" && value !== null && value !== undefined
      );
      const hasLiabilityData = Object.values(this.formData.liabilities).some(
        (value) => value !== "" && value !== null && value !== undefined
      );
      return hasAssetData || hasLiabilityData;
    },

    // Data to save to profile
    netWorthSaveData() {
      const assets = {};
      const liabilities = {};

      // Convert assets to numbers - always include all asset types
      Object.keys(this.formData.assets).forEach((key) => {
        const value = this.parseCurrency(this.formData.assets[key]);
        assets[key] = isNaN(value) ? 0 : value;
      });

      // Convert liabilities to numbers - always include all liability types
      Object.keys(this.formData.liabilities).forEach((key) => {
        const value = this.parseCurrency(this.formData.liabilities[key]);
        liabilities[key] = isNaN(value) ? 0 : value;
      });

      return {
        assets,
        liabilities,
        totalNetWorth: this.netWorth || 0,
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

    // Format asset labels for display
    formatAssetLabel(key) {
      const labels = {
        cashChecking: "Cash & Checking",
        highInterestSavings: "High-Interest Savings",
        tfsa: "TFSA",
        rrsp: "RRSP",
        fhsa: "FHSA",
        investments: "Other Investments",
        otherAssets: "Other Assets",
      };
      return labels[key] || key;
    },

    // Format liability labels for display
    formatLiabilityLabel(key) {
      const labels = {
        creditCards: "Credit Cards",
        linesOfCredit: "Lines of Credit",
        carLoans: "Car Loans",
        studentLoans: "Student Loans",
        otherDebts: "Other Debts",
      };
      return labels[key] || key;
    },

    // Validate form inputs
    validateForm() {
      this.validationErrors = [];

      // Check if at least one asset or liability is entered
      const hasAssets = Object.values(this.formData.assets).some(
        (value) => this.parseCurrency(value) > 0
      );
      const hasLiabilities = Object.values(this.formData.liabilities).some(
        (value) => this.parseCurrency(value) > 0
      );

      if (!hasAssets && !hasLiabilities) {
        this.validationErrors.push(
          "Please enter at least one asset or liability value"
        );
      }

      // Validate individual values
      Object.entries(this.formData.assets).forEach(([key, value]) => {
        if (value && this.parseCurrency(value) < 0) {
          this.validationErrors.push(
            `${this.formatAssetLabel(key)} cannot be negative`
          );
        }
      });

      Object.entries(this.formData.liabilities).forEach(([key, value]) => {
        if (value && this.parseCurrency(value) < 0) {
          this.validationErrors.push(
            `${this.formatLiabilityLabel(key)} cannot be negative`
          );
        }
      });

      return this.validationErrors.length === 0;
    },

    // Calculate net worth
    calculateNetWorth() {
      this.isCalculating = true;

      // Simulate calculation delay for better UX
      setTimeout(() => {
        if (this.validateForm()) {
          this.showResults = true;

          // Save form data and results to store
          const results = {
            totalAssets: this.totalAssets,
            totalLiabilities: this.totalLiabilities,
            netWorth: this.netWorth,
            assetBreakdown: this.assetBreakdown,
            liabilityBreakdown: this.liabilityBreakdown,
            healthStatus: this.healthStatus,
          };

          calculatorActions.updateNetWorthData(this.formData);
          calculatorActions.saveNetWorthResults(results);
        }
        this.isCalculating = false;
      }, 500);
    },

    // Handle profile save
    onProfileSaved(savedData) {
      console.log("Profile saved:", savedData);
      // Could add additional logic here if needed
    },

    // Handle profile load
    onProfileLoaded(loadedData) {
      console.log("Profile loaded:", loadedData);

      // Update form data with loaded values
      Object.keys(loadedData).forEach((groupKey) => {
        if (groupKey === "assets" || groupKey === "liabilities") {
          Object.keys(loadedData[groupKey]).forEach((fieldKey) => {
            if (
              this.formData[groupKey] &&
              this.formData[groupKey].hasOwnProperty(fieldKey)
            ) {
              // Format the number value back to display format
              const value = loadedData[groupKey][fieldKey];
              this.formData[groupKey][fieldKey] = this.formatNumber(value);
            }
          });
        }
      });

      // Clear any existing validation errors
      this.validationErrors = [];

      // Auto-calculate if we have loaded data
      if (
        Object.values(this.formData.assets).some(
          (v) => v && this.parseCurrency(v) > 0
        ) ||
        Object.values(this.formData.liabilities).some(
          (v) => v && this.parseCurrency(v) > 0
        )
      ) {
        this.calculateNetWorth();
      }
    },
  },
};
</script>

<style scoped>
.net-worth-calculator {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--bg-secondary);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--border-primary);
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
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all var(--transition-normal);
}

.back-link:hover {
  background: var(--bg-tertiary);
  color: var(--color-primary-dark);
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
  background: var(--bg-tertiary);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid var(--color-primary);
}

.assets-column {
  border-left-color: var(--success-primary);
  background: var(--success-light);
}

.liabilities-column {
  border-left-color: var(--error-primary);
  background: var(--error-light);
}

.column-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--border-primary);
}

.column-header h3 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.column-header p {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0;
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
  transition: border-color var(--transition-normal);
  background-color: var(--input-bg);
  color: var(--input-text);
}

.input-wrapper input:focus {
  outline: none;
  border-color: var(--input-border-focus);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.calculate-section {
  text-align: center;
  padding-top: 1rem;
  border-top: 2px solid var(--border-primary);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

@media (min-width: 768px) {
  .action-buttons {
    flex-direction: row;
    justify-content: center;
  }
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
}

.calculate-btn:disabled {
  background: var(--text-disabled);
  cursor: not-allowed;
  transform: none;
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
  border: 1px solid var(--calc-card-border);
}

.result-card.assets {
  border-left-color: var(--success-primary);
  background: var(--success-light);
}

.result-card.liabilities {
  border-left-color: var(--error-primary);
  background: var(--error-light);
}

.result-card.net-worth {
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

.breakdown-section {
  background: var(--bg-tertiary);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.breakdown-section h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.breakdown-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.breakdown-column h4 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--calc-card-bg);
  border-radius: 6px;
  margin-bottom: 0.5rem;
  border: 1px solid var(--calc-card-border);
}

.item-label {
  font-weight: 500;
  color: var(--text-primary);
}

.item-value.positive {
  color: var(--success-primary);
  font-weight: 600;
}

.item-value.negative {
  color: var(--error-primary);
  font-weight: 600;
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
  border: 1px solid var(--calc-card-border);
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

.status-icon {
  font-size: 2rem;
}

.status-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.status-description {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.validation-errors {
  background: var(--error-light);
  border: 2px solid var(--error-primary);
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
  .net-worth-calculator {
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
}

@media (max-width: 768px) {
  .net-worth-calculator {
    padding: 1rem;
    max-width: 100%;
  }

  .page-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .header-content h1 {
    font-size: 2rem;
  }

  .form-section,
  .results-section {
    padding: 1.5rem;
  }

  .form-column {
    padding: 1rem;
  }

  .results-grid {
    grid-template-columns: 1fr;
  }

  .breakdown-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .calculator-form {
    gap: 1rem;
  }

  .form-column {
    padding: 0.75rem;
  }
}
</style>
