<template>
  <div class="mortgage-affordability-calculator">
    <div class="page-header">
      <div class="header-content">
        <h1>Mortgage Affordability Calculator</h1>
        <p>
          Calculate your maximum affordable mortgage based on Canadian lending
          standards, including GDS/TDS ratios and stress test requirements
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

        <form @submit.prevent="calculateAffordability" class="calculator-form">
          <!-- Income Column -->
          <div class="form-column income-column">
            <div class="column-header">
              <h3>💰 Income & Employment</h3>
              <p>Enter your gross annual income details</p>
            </div>

            <div class="form-group">
              <label for="annualIncome">
                Annual Gross Income
                <span
                  class="tooltip"
                  title="Your total income before taxes and deductions"
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="annualIncome"
                  v-model="formData.annualIncome"
                  type="text"
                  placeholder="75,000"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="downPayment">
                Down Payment Amount
                <span
                  class="tooltip"
                  title="How much you can put down (minimum 5% in Canada)"
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="downPayment"
                  v-model="formData.downPayment"
                  type="text"
                  placeholder="50,000"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>
          </div>

          <!-- Debts Column -->
          <div class="form-column debts-column">
            <div class="column-header">
              <h3>💳 Monthly Debt Obligations</h3>
              <p>Enter your current monthly debt payments</p>
            </div>

            <div class="form-group">
              <label for="creditCardPayments">
                Credit Card Payments
                <span
                  class="tooltip"
                  title="Minimum monthly payments on all credit cards"
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="creditCardPayments"
                  v-model="formData.creditCardPayments"
                  type="text"
                  placeholder="200"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="carPayments">
                Car Loan Payments
                <span class="tooltip" title="Monthly car loan or lease payments"
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="carPayments"
                  v-model="formData.carPayments"
                  type="text"
                  placeholder="400"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="otherDebts">
                Other Monthly Debt Payments
                <span
                  class="tooltip"
                  title="Student loans, lines of credit, etc."
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="otherDebts"
                  v-model="formData.otherDebts"
                  type="text"
                  placeholder="150"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>
          </div>

          <!-- Housing Costs Column -->
          <div class="form-column housing-column">
            <div class="column-header">
              <h3>🏠 Annual Housing Costs</h3>
              <p>Estimated annual housing expenses</p>
            </div>

            <div class="form-group">
              <label for="propertyTaxes">
                Property Taxes (Annual)
                <span
                  class="tooltip"
                  title="Annual property tax estimate for target area"
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="propertyTaxes"
                  v-model="formData.propertyTaxes"
                  type="text"
                  placeholder="4,000"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="heatingCosts">
                Heating Costs (Annual)
                <span class="tooltip" title="Annual heating and utility costs"
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="heatingCosts"
                  v-model="formData.heatingCosts"
                  type="text"
                  placeholder="1,800"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="condoFees">
                Condo Fees (Annual)
                <span
                  class="tooltip"
                  title="Annual condo or strata fees (if applicable)"
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="condoFees"
                  v-model="formData.condoFees"
                  type="text"
                  placeholder="0"
                  @blur="formatCurrency"
                  @input="clearValidation"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="otherHousingCosts">
                Other Housing Costs (Annual)
                <span class="tooltip" title="Insurance, maintenance, etc."
                  >ⓘ</span
                >
              </label>
              <div class="input-wrapper">
                <span class="currency-symbol">$</span>
                <input
                  id="otherHousingCosts"
                  v-model="formData.otherHousingCosts"
                  type="text"
                  placeholder="2,000"
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
              @click="calculateAffordability"
            >
              {{ isCalculating ? "Calculating..." : "Calculate Affordability" }}
            </button>

            <LoadFromProfile
              calculator-type="mortgageAffordability"
              @load="onProfileLoaded"
            />
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div class="results-section" v-if="showResults">
        <h2>Your Mortgage Affordability Summary</h2>

        <div class="results-grid">
          <!-- Maximum Mortgage Amount -->
          <div class="result-card mortgage-amount">
            <h3>Maximum Mortgage Amount</h3>
            <div class="result-value positive">
              ${{ formatNumber(maxMortgageAmount) }}
            </div>
            <div class="result-detail">
              Based on stress test rate of {{ stressTestRate }}%
            </div>
          </div>

          <!-- Maximum Home Price -->
          <div class="result-card home-price">
            <h3>Maximum Home Price</h3>
            <div class="result-value positive">
              ${{ formatNumber(maxHomePrice) }}
            </div>
            <div class="result-detail">Including your down payment</div>
          </div>

          <!-- Monthly Payment -->
          <div class="result-card monthly-payment">
            <h3>Monthly Mortgage Payment</h3>
            <div class="result-value neutral">
              ${{ formatNumber(monthlyPayment) }}
            </div>
            <div class="result-detail">At stress test rate</div>
          </div>
        </div>

        <!-- Debt Service Ratios -->
        <div class="ratios-section">
          <h3>Debt Service Ratios</h3>

          <div class="ratios-grid">
            <div class="ratio-card" :class="gdsStatus.class">
              <h4>Gross Debt Service (GDS) Ratio</h4>
              <div class="ratio-value">{{ gdsRatio.toFixed(1) }}%</div>
              <div class="ratio-limit">Limit: 32%</div>
              <div class="ratio-status">
                <span class="status-icon">{{ gdsStatus.icon }}</span>
                <span class="status-text">{{ gdsStatus.text }}</span>
              </div>
            </div>

            <div class="ratio-card" :class="tdsStatus.class">
              <h4>Total Debt Service (TDS) Ratio</h4>
              <div class="ratio-value">{{ tdsRatio.toFixed(1) }}%</div>
              <div class="ratio-limit">Limit: 40%</div>
              <div class="ratio-status">
                <span class="status-icon">{{ tdsStatus.icon }}</span>
                <span class="status-text">{{ tdsStatus.text }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Affordability Status -->
        <div class="affordability-status">
          <h3>Pre-Approval Status</h3>
          <div class="status-card" :class="affordabilityStatus.class">
            <div class="status-icon-large">{{ affordabilityStatus.icon }}</div>
            <div class="status-content">
              <div class="status-title">{{ affordabilityStatus.title }}</div>
              <div class="status-description">
                {{ affordabilityStatus.description }}
              </div>
              <div
                class="status-recommendations"
                v-if="affordabilityStatus.recommendations?.length"
              >
                <h4>Recommendations:</h4>
                <ul>
                  <li
                    v-for="rec in affordabilityStatus.recommendations"
                    :key="rec"
                  >
                    {{ rec }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed Breakdown -->
        <div class="breakdown-section">
          <h3>Detailed Breakdown</h3>

          <div class="breakdown-grid">
            <div class="breakdown-column">
              <h4>Monthly Housing Costs (GDS)</h4>
              <div class="breakdown-item">
                <span class="item-label">Principal & Interest</span>
                <span class="item-value"
                  >${{ formatNumber(monthlyPayment) }}</span
                >
              </div>
              <div class="breakdown-item">
                <span class="item-label">Property Taxes</span>
                <span class="item-value"
                  >${{ formatNumber(monthlyPropertyTaxes) }}</span
                >
              </div>
              <div class="breakdown-item">
                <span class="item-label">Heating</span>
                <span class="item-value"
                  >${{ formatNumber(monthlyHeating) }}</span
                >
              </div>
              <div class="breakdown-item">
                <span class="item-label">Condo Fees</span>
                <span class="item-value"
                  >${{ formatNumber(monthlyCondoFees) }}</span
                >
              </div>
              <div class="breakdown-item">
                <span class="item-label">Other Housing</span>
                <span class="item-value"
                  >${{ formatNumber(monthlyOtherHousing) }}</span
                >
              </div>
              <div class="breakdown-item total">
                <span class="item-label">Total GDS</span>
                <span class="item-value">${{ formatNumber(totalGDS) }}</span>
              </div>
            </div>

            <div class="breakdown-column">
              <h4>Monthly Debt Payments (TDS)</h4>
              <div class="breakdown-item">
                <span class="item-label">Credit Cards</span>
                <span class="item-value"
                  >${{
                    formatNumber(parseCurrency(formData.creditCardPayments))
                  }}</span
                >
              </div>
              <div class="breakdown-item">
                <span class="item-label">Car Payments</span>
                <span class="item-value"
                  >${{
                    formatNumber(parseCurrency(formData.carPayments))
                  }}</span
                >
              </div>
              <div class="breakdown-item">
                <span class="item-label">Other Debts</span>
                <span class="item-value"
                  >${{ formatNumber(parseCurrency(formData.otherDebts)) }}</span
                >
              </div>
              <div class="breakdown-item">
                <span class="item-label">Housing (GDS)</span>
                <span class="item-value">${{ formatNumber(totalGDS) }}</span>
              </div>
              <div class="breakdown-item total">
                <span class="item-label">Total TDS</span>
                <span class="item-value">${{ formatNumber(totalTDS) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Save to Profile Component -->
        <SaveToProfile
          calculator-type="mortgageAffordability"
          :calculated-data="mortgageAffordabilitySaveData"
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
  name: "MortgageAffordabilityCalculator",
  components: {
    SaveToProfile,
    LoadFromProfile,
  },
  data() {
    return {
      formData: {
        annualIncome: "",
        downPayment: "",
        creditCardPayments: "",
        carPayments: "",
        otherDebts: "",
        propertyTaxes: "",
        heatingCosts: "",
        condoFees: "",
        otherHousingCosts: "",
      },
      showResults: false,
      validationErrors: [],
      isCalculating: false,
      stressTestRate: 5.25, // Current Bank of Canada qualifying rate
    };
  },
  mounted() {
    // Load data from store if coming from "View Details" link
    const shouldLoadData = this.$route.query.loadData === "true";

    if (shouldLoadData) {
      if (calculatorStore.mortgageAffordability?.annualIncome) {
        this.formData = { ...calculatorStore.mortgageAffordability };
      }

      if (calculatorStore.mortgageAffordability?.results) {
        this.showResults = true;
      }
    }
  },
  computed: {
    // Monthly income
    monthlyIncome() {
      return this.parseCurrency(this.formData.annualIncome) / 12;
    },

    // Monthly housing costs
    monthlyPropertyTaxes() {
      return this.parseCurrency(this.formData.propertyTaxes) / 12;
    },

    monthlyHeating() {
      return this.parseCurrency(this.formData.heatingCosts) / 12;
    },

    monthlyCondoFees() {
      return this.parseCurrency(this.formData.condoFees) / 12;
    },

    monthlyOtherHousing() {
      return this.parseCurrency(this.formData.otherHousingCosts) / 12;
    },

    // Total monthly debt payments (excluding housing)
    totalMonthlyDebts() {
      return (
        this.parseCurrency(this.formData.creditCardPayments) +
        this.parseCurrency(this.formData.carPayments) +
        this.parseCurrency(this.formData.otherDebts)
      );
    },

    // Maximum allowable GDS (32% of gross monthly income)
    maxGDS() {
      return this.monthlyIncome * 0.32;
    },

    // Maximum allowable TDS (40% of gross monthly income)
    maxTDS() {
      return this.monthlyIncome * 0.4;
    },

    // Maximum principal & interest payment based on GDS
    maxPIFromGDS() {
      return Math.max(
        0,
        this.maxGDS -
          this.monthlyPropertyTaxes -
          this.monthlyHeating -
          this.monthlyCondoFees -
          this.monthlyOtherHousing
      );
    },

    // Maximum principal & interest payment based on TDS
    maxPIFromTDS() {
      return Math.max(
        0,
        this.maxTDS -
          this.totalMonthlyDebts -
          this.monthlyPropertyTaxes -
          this.monthlyHeating -
          this.monthlyCondoFees -
          this.monthlyOtherHousing
      );
    },

    // Maximum mortgage amount (limiting factor between GDS and TDS)
    maxMortgageAmount() {
      const maxPI = Math.min(this.maxPIFromGDS, this.maxPIFromTDS);

      // Calculate mortgage amount using stress test rate
      // Formula: PV = PMT * [(1 - (1 + r)^-n) / r]
      // where r = monthly rate, n = number of payments (25 years = 300 months)
      const monthlyRate = this.stressTestRate / 100 / 12;
      const numPayments = 25 * 12; // 25 years amortization

      if (monthlyRate === 0) {
        return maxPI * numPayments;
      }

      const mortgageAmount =
        maxPI * ((1 - Math.pow(1 + monthlyRate, -numPayments)) / monthlyRate);
      return Math.max(0, mortgageAmount);
    },

    // Maximum home price
    maxHomePrice() {
      return (
        this.maxMortgageAmount + this.parseCurrency(this.formData.downPayment)
      );
    },

    // Monthly mortgage payment at stress test rate
    monthlyPayment() {
      if (this.maxMortgageAmount === 0) return 0;

      const monthlyRate = this.stressTestRate / 100 / 12;
      const numPayments = 25 * 12;

      if (monthlyRate === 0) {
        return this.maxMortgageAmount / numPayments;
      }

      return (
        (this.maxMortgageAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      );
    },

    // Total GDS costs
    totalGDS() {
      return (
        this.monthlyPayment +
        this.monthlyPropertyTaxes +
        this.monthlyHeating +
        this.monthlyCondoFees +
        this.monthlyOtherHousing
      );
    },

    // Total TDS costs
    totalTDS() {
      return this.totalGDS + this.totalMonthlyDebts;
    },

    // GDS ratio
    gdsRatio() {
      if (this.monthlyIncome === 0) return 0;
      return (this.totalGDS / this.monthlyIncome) * 100;
    },

    // TDS ratio
    tdsRatio() {
      if (this.monthlyIncome === 0) return 0;
      return (this.totalTDS / this.monthlyIncome) * 100;
    },

    // GDS status
    gdsStatus() {
      if (this.gdsRatio <= 32) {
        return { class: "good", icon: "✅", text: "Within limits" };
      } else {
        return { class: "poor", icon: "❌", text: "Exceeds 32% limit" };
      }
    },

    // TDS status
    tdsStatus() {
      if (this.tdsRatio <= 40) {
        return { class: "good", icon: "✅", text: "Within limits" };
      } else {
        return { class: "poor", icon: "❌", text: "Exceeds 40% limit" };
      }
    },

    // Overall affordability status
    affordabilityStatus() {
      if (
        this.gdsRatio <= 32 &&
        this.tdsRatio <= 40 &&
        this.maxMortgageAmount > 0
      ) {
        return {
          class: "excellent",
          icon: "🎉",
          title: "Pre-Approval Likely",
          description:
            "You meet the debt service ratio requirements and should qualify for pre-approval.",
          recommendations: [
            "Get pre-approved to lock in your rate",
            "Start shopping with confidence within your budget",
            "Consider saving for a larger down payment to reduce CMHC insurance",
          ],
        };
      } else if (this.gdsRatio <= 35 && this.tdsRatio <= 42) {
        return {
          class: "fair",
          icon: "⚠️",
          title: "Possible with Conditions",
          description:
            "You're close to qualifying but may need to meet additional conditions.",
          recommendations: [
            "Pay down existing debts to improve your ratios",
            "Consider a smaller home price or larger down payment",
            "Speak with a mortgage broker about alternative lenders",
          ],
        };
      } else {
        return {
          class: "poor",
          icon: "❌",
          title: "Needs Improvement",
          description:
            "Your debt-to-income ratios exceed lending guidelines. Focus on improving your financial position.",
          recommendations: [
            "Pay down existing debts significantly",
            "Increase your income through raises or additional income sources",
            "Save for a larger down payment",
            "Consider a less expensive home or delaying your purchase",
          ],
        };
      }
    },

    // Check if there's meaningful data to save
    hasDataToSave() {
      return Object.values(this.formData).some(
        (value) => value !== "" && value !== null && value !== undefined
      );
    },

    // Data to save to profile
    mortgageAffordabilitySaveData() {
      const data = {};

      Object.keys(this.formData).forEach((key) => {
        const value = this.parseCurrency(this.formData[key]);
        data[key] = isNaN(value) ? 0 : value;
      });

      return {
        ...data,
        maxMortgageAmount: this.maxMortgageAmount || 0,
        maxHomePrice: this.maxHomePrice || 0,
        monthlyPayment: this.monthlyPayment || 0,
        gdsRatio: this.gdsRatio || 0,
        tdsRatio: this.tdsRatio || 0,
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
      if (typeof value !== "string") {
        value = String(value);
      }
      return parseFloat(value.replace(/[^0-9.]/g, ""));
    },

    // Format number with commas
    formatNumber(num) {
      if (!num) return "0";
      return num.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    },

    // Validate form inputs
    validateForm() {
      this.validationErrors = [];

      // Check required fields
      if (
        !this.formData.annualIncome ||
        this.parseCurrency(this.formData.annualIncome) <= 0
      ) {
        this.validationErrors.push(
          "Annual income is required and must be greater than $0"
        );
      }

      if (
        !this.formData.downPayment ||
        this.parseCurrency(this.formData.downPayment) <= 0
      ) {
        this.validationErrors.push(
          "Down payment amount is required and must be greater than $0"
        );
      }

      // Validate reasonable ranges
      const annualIncome = this.parseCurrency(this.formData.annualIncome);
      if (annualIncome > 0 && annualIncome < 20000) {
        this.validationErrors.push(
          "Annual income seems low for mortgage qualification"
        );
      }

      const downPayment = this.parseCurrency(this.formData.downPayment);
      if (downPayment > 0 && downPayment < 5000) {
        this.validationErrors.push(
          "Down payment seems low for Canadian mortgage requirements"
        );
      }

      // Validate negative values
      Object.entries(this.formData).forEach(([key, value]) => {
        if (value && this.parseCurrency(value) < 0) {
          this.validationErrors.push(
            `${this.formatFieldLabel(key)} cannot be negative`
          );
        }
      });

      return this.validationErrors.length === 0;
    },

    // Format field labels for validation
    formatFieldLabel(key) {
      const labels = {
        annualIncome: "Annual income",
        downPayment: "Down payment",
        creditCardPayments: "Credit card payments",
        carPayments: "Car payments",
        otherDebts: "Other debts",
        propertyTaxes: "Property taxes",
        heatingCosts: "Heating costs",
        condoFees: "Condo fees",
        otherHousingCosts: "Other housing costs",
      };
      return labels[key] || key;
    },

    // Calculate mortgage affordability
    calculateAffordability() {
      this.isCalculating = true;

      setTimeout(() => {
        if (this.validateForm()) {
          this.showResults = true;

          // Save form data and results to store
          const results = {
            maxMortgageAmount: this.maxMortgageAmount,
            maxHomePrice: this.maxHomePrice,
            monthlyPayment: this.monthlyPayment,
            gdsRatio: this.gdsRatio,
            tdsRatio: this.tdsRatio,
            affordabilityStatus: this.affordabilityStatus,
            totalGDS: this.totalGDS,
            totalTDS: this.totalTDS,
          };

          calculatorActions.updateMortgageAffordabilityData(this.formData);
          calculatorActions.saveMortgageAffordabilityResults(results);
        }
        this.isCalculating = false;
      }, 500);
    },

    // Handle profile save
    onProfileSaved(savedData) {
      console.log("Profile saved:", savedData);
    },

    // Handle profile load
    onProfileLoaded(loadedData) {
      console.log("Profile loaded:", loadedData);

      // Update form data with loaded values
      Object.keys(loadedData).forEach((fieldKey) => {
        if (this.formData.hasOwnProperty(fieldKey)) {
          const value = loadedData[fieldKey];
          this.formData[fieldKey] = this.formatNumber(value);
        }
      });

      // Clear any existing validation errors
      this.validationErrors = [];

      // Auto-calculate if we have loaded data
      if (
        Object.values(this.formData).some((v) => v && this.parseCurrency(v) > 0)
      ) {
        this.calculateAffordability();
      }
    },
  },
};
</script>

<style scoped>
.mortgage-affordability-calculator {
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.form-column {
  background: var(--bg-tertiary);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid var(--color-primary);
}

.income-column {
  border-left-color: var(--success-primary);
  background: var(--success-light);
}

.debts-column {
  border-left-color: var(--error-primary);
  background: var(--error-light);
}

.housing-column {
  border-left-color: var(--info-primary);
  background: var(--info-light);
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

.result-card.mortgage-amount {
  border-left-color: var(--success-primary);
  background: var(--success-light);
}

.result-card.home-price {
  border-left-color: var(--info-primary);
  background: var(--info-light);
}

.result-card.monthly-payment {
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
  margin-bottom: 0.5rem;
}

.result-value.positive {
  color: var(--success-primary);
}

.result-value.neutral {
  color: var(--text-primary);
}

.result-detail {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* Ratios Section */
.ratios-section {
  background: var(--bg-tertiary);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.ratios-section h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.ratios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.ratio-card {
  background: var(--calc-card-bg);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid var(--calc-card-border);
}

.ratio-card.good {
  border-left: 4px solid var(--success-primary);
  background: var(--success-light);
}

.ratio-card.poor {
  border-left: 4px solid var(--error-primary);
  background: var(--error-light);
}

.ratio-card h4 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.ratio-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.ratio-limit {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}

.ratio-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.status-icon {
  font-size: 1.2rem;
}

.status-text {
  font-weight: 500;
  color: var(--text-primary);
}

/* Affordability Status */
.affordability-status {
  background: var(--bg-tertiary);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.affordability-status h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.status-card {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--calc-card-bg);
  border-radius: 8px;
  border: 1px solid var(--calc-card-border);
}

.status-card.excellent {
  border-left: 4px solid var(--success-primary);
  background: var(--success-light);
}

.status-card.fair {
  border-left: 4px solid var(--warning-primary);
  background: var(--warning-light);
}

.status-card.poor {
  border-left: 4px solid var(--error-primary);
  background: var(--error-light);
}

.status-icon-large {
  font-size: 3rem;
  line-height: 1;
}

.status-content {
  flex: 1;
}

.status-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.status-description {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.status-recommendations h4 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.status-recommendations ul {
  margin: 0;
  padding-left: 1.5rem;
}

.status-recommendations li {
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

/* Breakdown Section */
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

.breakdown-item.total {
  border-left: 3px solid var(--color-primary);
  font-weight: 600;
  background: var(--info-light);
}

.item-label {
  font-weight: 500;
  color: var(--text-primary);
}

.item-value {
  color: var(--text-primary);
  font-weight: 600;
  font-family: monospace;
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
  .mortgage-affordability-calculator {
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
  .mortgage-affordability-calculator {
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

  .results-grid,
  .ratios-grid {
    grid-template-columns: 1fr;
  }

  .breakdown-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .status-card {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .calculator-form {
    gap: 1rem;
  }

  .form-column {
    padding: 0.75rem;
  }

  .status-icon-large {
    font-size: 2rem;
  }
}
</style>
