<template>
  <div class="down-payment-calculator">
    <div class="page-header">
      <div class="header-content">
        <h1>Down Payment Calculator</h1>
        <p>Plan your home purchase savings with detailed calculations</p>
      </div>
      <div class="header-navigation">
        <router-link to="/calculators" class="back-link"
          >← Back to Calculators</router-link
        >
      </div>
    </div>

    <div class="calculator-container">
      <div class="form-section">
        <h2>Property & Financial Details</h2>

        <form @submit.prevent="calculateSavings" class="calculator-form">
          <!-- Property Details Column -->
          <div class="form-column">
            <div class="column-header">
              <h3>🏠 Property Details</h3>
              <p>Basic property and cost information</p>
            </div>

            <div class="form-group">
              <label for="propertyPrice">Property Price</label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="propertyPrice"
                  v-model="formData.propertyPrice"
                  type="text"
                  placeholder="500,000"
                  @blur="formatCurrency"
                  @input="clearValidation"
                  tabindex="1"
                />
              </div>
            </div>

            <div class="form-group">
              <label>Down Payment</label>
              <div class="toggle-container">
                <div class="toggle-buttons">
                  <button
                    type="button"
                    :class="[
                      'toggle-btn',
                      { active: downPaymentMode === 'percentage' },
                    ]"
                    @click="setDownPaymentMode('percentage')"
                  >
                    Percentage
                  </button>
                  <button
                    type="button"
                    :class="[
                      'toggle-btn',
                      { active: downPaymentMode === 'dollar' },
                    ]"
                    @click="setDownPaymentMode('dollar')"
                  >
                    Dollar Amount
                  </button>
                </div>
              </div>
              <div class="input-wrapper">
                <span class="input-symbol">{{
                  downPaymentMode === "percentage" ? "%" : "$"
                }}</span>
                <input
                  v-model="formData.downPayment"
                  type="text"
                  :placeholder="
                    downPaymentMode === 'percentage' ? '20' : '100,000'
                  "
                  @blur="formatDownPayment"
                  @input="clearValidation"
                  tabindex="2"
                />
              </div>
              <div
                class="conversion-display"
                v-if="formData.propertyPrice && formData.downPayment"
              >
                <small>
                  {{
                    downPaymentMode === "percentage"
                      ? `${formData.downPayment}% = $${formatNumber(
                          downPaymentAmount
                        )}`
                      : `$${formatNumber(
                          formData.downPayment
                        )} = ${downPaymentPercentage}%`
                  }}
                </small>
              </div>
            </div>

            <div class="form-group">
              <label for="closingCosts">Closing Costs</label>
              <div class="input-wrapper">
                <span class="input-symbol">%</span>
                <input
                  id="closingCosts"
                  v-model="formData.closingCosts"
                  type="text"
                  placeholder="3.5"
                  @blur="formatPercentage"
                  @input="clearValidation"
                  tabindex="3"
                />
              </div>
              <div
                class="conversion-display"
                v-if="formData.propertyPrice && formData.closingCosts"
              >
                <small>${{ formatNumber(closingCostsAmount) }}</small>
              </div>
            </div>
          </div>

          <!-- Financial Position Column -->
          <div class="form-column">
            <div class="column-header">
              <h3>💰 Financial Position</h3>
              <p>Your current savings and income</p>
            </div>

            <div class="form-group">
              <label for="existingSavings">Existing Savings</label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="existingSavings"
                  v-model="formData.existingSavings"
                  type="text"
                  placeholder="25,000"
                  @blur="formatCurrency"
                  @input="clearValidation"
                  tabindex="4"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="monthlyIncome">Monthly Income</label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="monthlyIncome"
                  v-model="formData.monthlyIncome"
                  type="text"
                  placeholder="8,000"
                  @blur="formatCurrency"
                  @input="clearValidation"
                  tabindex="5"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="timeline">Timeline (months)</label>
              <div class="input-wrapper">
                <input
                  id="timeline"
                  v-model="formData.timeline"
                  type="number"
                  placeholder="24"
                  min="1"
                  @input="clearValidation"
                  tabindex="6"
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
              @click="calculateSavings"
            >
              {{ isCalculating ? "Calculating..." : "Calculate Savings Plan" }}
            </button>

            <LoadFromProfile
              calculator-type="downPayment"
              @load="onProfileLoad"
            />
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div class="results-section" v-if="showResults">
        <h2>Your Savings Plan</h2>

        <div class="results-grid">
          <!-- Down Payment Details -->
          <div class="result-card">
            <h3>Down Payment</h3>
            <div class="result-value">
              ${{ formatNumber(downPaymentAmount) }}
            </div>
            <div class="result-detail">
              {{ downPaymentPercentage }}% of property price
            </div>
          </div>

          <!-- Closing Costs -->
          <div class="result-card">
            <h3>Closing Costs</h3>
            <div class="result-value">
              ${{ formatNumber(closingCostsAmount) }}
            </div>
            <div class="result-detail">
              {{ formData.closingCosts }}% of property price
            </div>
          </div>

          <!-- Total Upfront Costs -->
          <div class="result-card total-costs">
            <h3>Total Upfront Costs</h3>
            <div class="result-value">
              ${{ formatNumber(totalUpfrontCosts) }}
            </div>
            <div class="result-detail">Down payment + closing costs</div>
          </div>

          <!-- Amount Still Needed -->
          <div class="result-card amount-needed">
            <h3>Amount Still Needed</h3>
            <div class="result-value">
              ${{ formatNumber(amountStillNeeded) }}
            </div>
            <div class="result-detail">Total costs - existing savings</div>
          </div>
        </div>

        <!-- Monthly Savings Target -->
        <div class="monthly-target">
          <h3>Monthly Savings Target</h3>
          <div class="target-amount">
            ${{ formatNumber(monthlySavingsTarget) }}
          </div>
          <div class="target-detail">
            You need to save ${{ formatNumber(monthlySavingsTarget) }} per month
            for {{ formData.timeline }} months
          </div>
        </div>

        <!-- Affordability Analysis -->
        <div class="affordability-analysis">
          <h3>Affordability Analysis</h3>
          <div class="analysis-grid">
            <div class="analysis-item">
              <span class="analysis-label">Monthly Savings vs Income:</span>
              <span class="analysis-value">{{ savingsToIncomeRatio }}%</span>
            </div>
            <div class="analysis-item">
              <span class="analysis-label">Recommended Max:</span>
              <span class="analysis-value">20%</span>
            </div>
            <div
              class="analysis-item"
              :class="{ warning: savingsToIncomeRatio > 20 }"
            >
              <span class="analysis-label">Status:</span>
              <span class="analysis-value">
                {{ savingsToIncomeRatio > 20 ? "⚠️ High" : "✅ Manageable" }}
              </span>
            </div>
          </div>
        </div>

        <!-- Calculation Breakdown -->
        <div class="calculation-breakdown">
          <h3>Calculation Breakdown</h3>
          <div class="breakdown-steps">
            <div class="step">
              <span class="step-number">1.</span>
              <span class="step-text"
                >Down Payment: ${{ formatNumber(formData.propertyPrice) }} ×
                {{ downPaymentPercentage }}% = ${{
                  formatNumber(downPaymentAmount)
                }}</span
              >
            </div>
            <div class="step">
              <span class="step-number">2.</span>
              <span class="step-text"
                >Closing Costs: ${{ formatNumber(formData.propertyPrice) }} ×
                {{ formData.closingCosts }}% = ${{
                  formatNumber(closingCostsAmount)
                }}</span
              >
            </div>
            <div class="step">
              <span class="step-number">3.</span>
              <span class="step-text"
                >Total Upfront: ${{ formatNumber(downPaymentAmount) }} + ${{
                  formatNumber(closingCostsAmount)
                }}
                = ${{ formatNumber(totalUpfrontCosts) }}</span
              >
            </div>
            <div class="step">
              <span class="step-number">4.</span>
              <span class="step-text"
                >Amount Needed: ${{ formatNumber(totalUpfrontCosts) }} - ${{
                  formatNumber(formData.existingSavings)
                }}
                = ${{ formatNumber(amountStillNeeded) }}</span
              >
            </div>
            <div class="step">
              <span class="step-number">5.</span>
              <span class="step-text"
                >Monthly Target: ${{ formatNumber(amountStillNeeded) }} ÷
                {{ formData.timeline }} months = ${{
                  formatNumber(monthlySavingsTarget)
                }}</span
              >
            </div>
          </div>
        </div>

        <!-- Save to Profile Component -->
        <SaveToProfile
          calculator-type="downPayment"
          :calculated-data="downPaymentSaveData"
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
  name: "DownPaymentCalculator",
  components: {
    SaveToProfile,
    LoadFromProfile,
  },
  data() {
    return {
      formData: {
        propertyPrice: "",
        downPayment: "",
        closingCosts: "3.5",
        existingSavings: "",
        timeline: "",
        monthlyIncome: "",
      },
      downPaymentMode: "percentage", // 'percentage' or 'dollar'
      showResults: false,
      validationErrors: [],
      isCalculating: false,
    };
  },
  mounted() {
    // Load data from store if available
    if (calculatorStore.downPayment.propertyPrice) {
      this.formData = { ...calculatorStore.downPayment };
    }

    // Load results if available
    if (calculatorStore.downPayment.results) {
      this.showResults = true;
    }
  },
  computed: {
    // Convert down payment to dollar amount
    downPaymentAmount() {
      if (!this.formData.propertyPrice || !this.formData.downPayment) return 0;
      const propertyPrice = this.parseCurrency(this.formData.propertyPrice);
      const downPayment = this.parseInput(this.formData.downPayment);

      if (this.downPaymentMode === "percentage") {
        return (propertyPrice * downPayment) / 100;
      } else {
        return downPayment;
      }
    },

    // Convert down payment to percentage
    downPaymentPercentage() {
      if (!this.formData.propertyPrice || !this.formData.downPayment) return 0;
      const propertyPrice = this.parseCurrency(this.formData.propertyPrice);
      const downPayment = this.parseInput(this.formData.downPayment);

      if (this.downPaymentMode === "percentage") {
        return downPayment;
      } else {
        return (downPayment / propertyPrice) * 100;
      }
    },

    // Calculate closing costs amount
    closingCostsAmount() {
      if (!this.formData.propertyPrice || !this.formData.closingCosts) return 0;
      const propertyPrice = this.parseCurrency(this.formData.propertyPrice);
      const closingCosts = this.parseInput(this.formData.closingCosts);
      return (propertyPrice * closingCosts) / 100;
    },

    // Total upfront costs needed
    totalUpfrontCosts() {
      return this.downPaymentAmount + this.closingCostsAmount;
    },

    // Amount still needed to save
    amountStillNeeded() {
      const existingSavings =
        this.parseCurrency(this.formData.existingSavings) || 0;
      return Math.max(0, this.totalUpfrontCosts - existingSavings);
    },

    // Monthly savings target
    monthlySavingsTarget() {
      if (!this.formData.timeline || this.amountStillNeeded <= 0) return 0;
      const timeline = parseInt(this.formData.timeline);
      return this.amountStillNeeded / timeline;
    },

    // Savings to income ratio
    savingsToIncomeRatio() {
      if (!this.formData.monthlyIncome || this.monthlySavingsTarget <= 0)
        return 0;
      const monthlyIncome = this.parseCurrency(this.formData.monthlyIncome);
      return ((this.monthlySavingsTarget / monthlyIncome) * 100).toFixed(1);
    },

    // Data to save to profile
    downPaymentSaveData() {
      return {
        monthlyIncome: this.parseCurrency(this.formData.monthlyIncome),
        existingSavings: this.parseCurrency(this.formData.existingSavings),
        downPaymentTarget: this.downPaymentAmount,
        monthlySavingsGoal: this.monthlySavingsTarget,
        timeline: parseInt(this.formData.timeline) || 0,
      };
    },

    // Check if there's meaningful data to save
    hasDataToSave() {
      // Check if key fields are filled
      return (
        (this.formData.propertyPrice &&
          this.parseCurrency(this.formData.propertyPrice) > 0) ||
        (this.formData.monthlyIncome &&
          this.parseCurrency(this.formData.monthlyIncome) > 0) ||
        (this.formData.existingSavings &&
          this.parseCurrency(this.formData.existingSavings) > 0) ||
        (this.formData.timeline && parseInt(this.formData.timeline) > 0)
      );
    },
  },
  methods: {
    // Set down payment mode and recalculate
    setDownPaymentMode(mode) {
      this.downPaymentMode = mode;
      this.showResults = false;
      this.validationErrors = [];

      // Convert existing down payment value to new mode
      if (this.formData.downPayment && this.formData.propertyPrice) {
        if (mode === "percentage") {
          // Convert dollar amount to percentage
          const propertyPrice = this.parseCurrency(this.formData.propertyPrice);
          const downPayment = this.parseInput(this.formData.downPayment);
          this.formData.downPayment = (
            (downPayment / propertyPrice) *
            100
          ).toFixed(2);
        } else {
          // Convert percentage to dollar amount
          const propertyPrice = this.parseCurrency(this.formData.propertyPrice);
          const downPayment = this.parseInput(this.formData.downPayment);
          this.formData.downPayment = (
            (propertyPrice * downPayment) /
            100
          ).toFixed(0);
        }
      }
    },

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

    // Format down payment input based on mode
    formatDownPayment(event) {
      const value = event.target.value.replace(/[^0-9.]/g, "");
      if (value) {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          if (this.downPaymentMode === "percentage") {
            event.target.value = numValue.toFixed(2);
          } else {
            event.target.value = this.formatNumber(numValue);
          }
        }
      }
    },

    // Format percentage input on blur
    formatPercentage(event) {
      const value = event.target.value.replace(/[^0-9.]/g, "");
      if (value) {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          event.target.value = numValue.toFixed(2);
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

    // Parse input to number (handles both currency and percentage)
    parseInput(value) {
      if (!value) return 0;
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

      if (!this.formData.propertyPrice) {
        this.validationErrors.push("Property price is required");
      } else if (this.parseCurrency(this.formData.propertyPrice) <= 0) {
        this.validationErrors.push("Property price must be greater than $0");
      }

      if (!this.formData.downPayment) {
        this.validationErrors.push("Down payment is required");
      } else if (this.parseInput(this.formData.downPayment) <= 0) {
        this.validationErrors.push("Down payment must be greater than 0");
      }

      if (!this.formData.closingCosts) {
        this.validationErrors.push("Closing costs percentage is required");
      } else if (this.parseInput(this.formData.closingCosts) <= 0) {
        this.validationErrors.push("Closing costs must be greater than 0%");
      }

      if (!this.formData.timeline) {
        this.validationErrors.push("Timeline is required");
      } else if (parseInt(this.formData.timeline) <= 0) {
        this.validationErrors.push("Timeline must be greater than 0 months");
      }

      if (!this.formData.monthlyIncome) {
        this.validationErrors.push("Monthly income is required");
      } else if (this.parseCurrency(this.formData.monthlyIncome) <= 0) {
        this.validationErrors.push("Monthly income must be greater than $0");
      }

      // Validate down payment percentage
      if (this.downPaymentPercentage < 3.5) {
        this.validationErrors.push(
          "Down payment must be at least 3.5% of property price"
        );
      } else if (this.downPaymentPercentage > 100) {
        this.validationErrors.push(
          "Down payment cannot exceed 100% of property price"
        );
      }

      return this.validationErrors.length === 0;
    },

    // Calculate savings plan
    calculateSavings() {
      this.isCalculating = true;

      // Simulate calculation delay for better UX
      setTimeout(() => {
        if (this.validateForm()) {
          this.showResults = true;

          // Save form data and results to store
          const results = {
            downPaymentAmount: this.downPaymentAmount,
            downPaymentPercentage: this.downPaymentPercentage,
            closingCostsAmount: this.closingCostsAmount,
            totalUpfrontCosts: this.totalUpfrontCosts,
            amountStillNeeded: this.amountStillNeeded,
            monthlySavingsTarget: this.monthlySavingsTarget,
            savingsToIncomeRatio: this.savingsToIncomeRatio,
          };

          calculatorActions.updateDownPaymentData(this.formData);
          calculatorActions.saveDownPaymentResults(results);
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

    // Handle profile load
    onProfileLoad(loadedData) {
      console.log("Profile loaded:", loadedData);

      // Populate form fields with loaded data
      if (loadedData.income?.monthlyIncome) {
        this.formData.monthlyIncome = this.formatNumber(
          loadedData.income.monthlyIncome
        );
      }

      if (loadedData.savings?.existingSavings) {
        this.formData.existingSavings = this.formatNumber(
          loadedData.savings.existingSavings
        );
      }

      if (loadedData.goals?.downPaymentTarget) {
        // Convert down payment target to appropriate mode
        if (this.downPaymentMode === "percentage") {
          const propertyPrice =
            this.parseCurrency(this.formData.propertyPrice) || 1;
          this.formData.downPayment = (
            (loadedData.goals.downPaymentTarget / propertyPrice) *
            100
          ).toFixed(2);
        } else {
          this.formData.downPayment = this.formatNumber(
            loadedData.goals.downPaymentTarget
          );
        }
      }

      if (loadedData.goals?.monthlySavingsGoal) {
        // Could use this to suggest a timeline
        console.log(
          "Monthly savings goal loaded:",
          loadedData.goals.monthlySavingsGoal
        );
      }
    },
  },
};
</script>

<style scoped>
.down-payment-calculator {
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
  background: var(--bg-tertiary);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid var(--color-primary);
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
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.currency-symbol,
.input-symbol {
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

.toggle-container {
  margin-bottom: 0.5rem;
}

.toggle-buttons {
  display: flex;
  border: 2px solid var(--border-primary);
  border-radius: 8px;
  overflow: hidden;
}

.toggle-btn {
  flex: 1;
  padding: 8px 16px;
  border: none;
  background: var(--input-bg);
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-size: 0.9rem;
  font-weight: 500;
}

.toggle-btn.active {
  background: var(--color-primary);
  color: var(--text-inverse);
}

.toggle-btn:hover:not(.active) {
  background: var(--bg-tertiary);
}

.conversion-display {
  margin-top: 0.25rem;
  color: var(--text-muted);
  font-size: 0.85rem;
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
}

.result-card.total-costs {
  border-left-color: var(--error-primary);
  background: var(--error-light);
}

.result-card.amount-needed {
  border-left-color: var(--warning-primary);
  background: var(--warning-light);
}

.result-card h3 {
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.result-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.result-detail {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.monthly-target {
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-secondary)
  );
  color: var(--text-inverse);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 2rem;
}

.monthly-target h3 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.target-amount {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.target-detail {
  font-size: 1rem;
  opacity: 0.9;
}

.affordability-analysis {
  background: var(--calc-result-bg);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.affordability-analysis h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.analysis-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.analysis-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--calc-card-bg);
  border-radius: 6px;
}

.analysis-item.warning {
  background: var(--error-light);
  border-left: 3px solid var(--error-primary);
}

.analysis-label {
  font-weight: 500;
  color: var(--text-primary);
}

.analysis-value {
  font-weight: 600;
  color: var(--color-primary);
}

.calculation-breakdown {
  background: var(--calc-result-bg);
  padding: 1.5rem;
  border-radius: 8px;
}

.calculation-breakdown h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.breakdown-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--calc-card-bg);
  border-radius: 6px;
}

.step-number {
  background: var(--color-primary);
  color: var(--text-inverse);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-text {
  color: var(--text-primary);
  line-height: 1.4;
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
  .down-payment-calculator {
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
  .down-payment-calculator {
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

  .analysis-grid {
    grid-template-columns: 1fr;
  }

  .target-amount {
    font-size: 2rem;
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
