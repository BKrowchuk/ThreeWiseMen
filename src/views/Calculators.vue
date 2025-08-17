<template>
  <div class="calculators">
    <div class="page-header">
      <div class="header-content">
        <h1>Financial Calculators</h1>
        <p>Comprehensive tools to help you plan your financial future</p>
      </div>
      <div class="header-navigation">
        <router-link to="/" class="back-link">← Back to Dashboard</router-link>
      </div>
    </div>

    <div class="main-content">
      <!-- Left Column: Calculator Cards -->
      <div class="calculators-section">
        <div class="calculators-grid">
          <!-- Down Payment Calculator Card -->
          <div
            class="calculator-card"
            @click="$router.push('/calculators/down-payment')"
          >
            <div class="card-icon">🏠</div>
            <h3>Down Payment Calculator</h3>
            <p>
              Calculate monthly savings needed for your home purchase, including
              down payment and closing costs
            </p>
            <div class="card-actions">
              <span class="action-text">Get Started</span>
              <span class="action-arrow">→</span>
            </div>
          </div>

          <!-- Net Worth Calculator Card -->
          <div
            class="calculator-card"
            @click="$router.push('/calculators/net-worth')"
          >
            <div class="card-icon">💰</div>
            <h3>Net Worth Calculator</h3>
            <p>
              Calculate your total financial position by analyzing assets and
              liabilities
            </p>
            <div class="card-actions">
              <span class="action-text">Get Started</span>
              <span class="action-arrow">→</span>
            </div>
          </div>

          <!-- Cash Flow Calculator Card -->
          <div
            class="calculator-card"
            @click="$router.push('/calculators/cash-flow')"
          >
            <div class="card-icon">📊</div>
            <h3>Cash Flow Calculator</h3>
            <p>
              Analyze your monthly income vs expenses and identify savings
              opportunities
            </p>
            <div class="card-actions">
              <span class="action-text">Get Started</span>
              <span class="action-arrow">→</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Calculator Summary -->
      <div class="summary-sidebar" v-if="hasCalculatorData">
        <div class="summary-section">
          <h2>Your Calculations</h2>
          <div class="summary-cards">
            <!-- Down Payment Summary -->
            <div class="summary-card" v-if="downPaymentSummary">
              <div class="summary-header">
                <div class="summary-icon">🏠</div>
                <h3>Down Payment Plan</h3>
              </div>
              <div class="summary-content">
                <div class="summary-item">
                  <span class="summary-label">Monthly Target:</span>
                  <span class="summary-value"
                    >${{
                      formatNumber(downPaymentSummary.monthlySavingsTarget)
                    }}</span
                  >
                </div>
                <div class="summary-item">
                  <span class="summary-label">Timeline:</span>
                  <span class="summary-value"
                    >{{ downPaymentSummary.timeline }} months</span
                  >
                </div>
                <div class="summary-item">
                  <span class="summary-label">Property Price:</span>
                  <span class="summary-value"
                    >${{ formatNumber(downPaymentSummary.propertyPrice) }}</span
                  >
                </div>
              </div>
              <router-link
                to="/calculators/down-payment?loadData=true"
                class="summary-link"
                >View Details →</router-link
              >
            </div>

            <!-- Net Worth Summary -->
            <div class="summary-card" v-if="netWorthSummary">
              <div class="summary-header">
                <div class="summary-icon">💰</div>
                <h3>Net Worth</h3>
              </div>
              <div class="summary-content">
                <div class="summary-item">
                  <span class="summary-label">Total Assets:</span>
                  <span class="summary-value positive"
                    >${{ formatNumber(netWorthSummary.totalAssets) }}</span
                  >
                </div>
                <div class="summary-item">
                  <span class="summary-label">Total Liabilities:</span>
                  <span class="summary-value negative"
                    >${{ formatNumber(netWorthSummary.totalLiabilities) }}</span
                  >
                </div>
                <div class="summary-item">
                  <span class="summary-label">Net Worth:</span>
                  <span
                    class="summary-value"
                    :class="{
                      positive: netWorthSummary.netWorth >= 0,
                      negative: netWorthSummary.netWorth < 0,
                    }"
                  >
                    ${{ formatNumber(Math.abs(netWorthSummary.netWorth)) }}
                  </span>
                </div>
              </div>
              <router-link
                to="/calculators/net-worth?loadData=true"
                class="summary-link"
                >View Details →</router-link
              >
            </div>

            <!-- Cash Flow Summary -->
            <div class="summary-card" v-if="cashFlowSummary">
              <div class="summary-header">
                <div class="summary-icon">📊</div>
                <h3>Cash Flow</h3>
              </div>
              <div class="summary-content">
                <div class="summary-item">
                  <span class="summary-label">Monthly Income:</span>
                  <span class="summary-value positive"
                    >${{ formatNumber(cashFlowSummary.totalIncome) }}</span
                  >
                </div>
                <div class="summary-item">
                  <span class="summary-label">Monthly Expenses:</span>
                  <span class="summary-value negative"
                    >${{ formatNumber(cashFlowSummary.totalExpenses) }}</span
                  >
                </div>
                <div class="summary-item">
                  <span class="summary-label">Monthly Savings:</span>
                  <span class="summary-value positive"
                    >${{ formatNumber(cashFlowSummary.totalSavings) }}</span
                  >
                </div>
              </div>
              <router-link
                to="/calculators/cash-flow?loadData=true"
                class="summary-link"
                >View Details →</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { calculatorStore } from "../store/calculators";

export default {
  name: "Calculators",
  setup() {
    // Computed properties for calculator summaries
    const downPaymentSummary = computed(() => {
      if (!calculatorStore.downPayment.results) return null;
      return {
        monthlySavingsTarget:
          calculatorStore.downPayment.results.monthlySavingsTarget,
        timeline: calculatorStore.downPayment.timeline,
        propertyPrice: calculatorStore.downPayment.propertyPrice,
      };
    });

    const netWorthSummary = computed(() => {
      if (!calculatorStore.netWorth.results) return null;
      return {
        totalAssets: calculatorStore.netWorth.results.totalAssets,
        totalLiabilities: calculatorStore.netWorth.results.totalLiabilities,
        netWorth: calculatorStore.netWorth.results.netWorth,
      };
    });

    const cashFlowSummary = computed(() => {
      if (!calculatorStore.cashFlow.results) return null;
      return {
        totalIncome: calculatorStore.cashFlow.results.totalIncome,
        totalExpenses: calculatorStore.cashFlow.results.totalExpenses,
        totalSavings: calculatorStore.cashFlow.results.totalSavings,
      };
    });

    const hasCalculatorData = computed(() => {
      return (
        downPaymentSummary.value ||
        netWorthSummary.value ||
        cashFlowSummary.value
      );
    });

    // Format number with commas
    const formatNumber = (num) => {
      if (!num) return "0";
      return num.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    };

    return {
      downPaymentSummary,
      netWorthSummary,
      cashFlowSummary,
      hasCalculatorData,
      formatNumber,
    };
  },
};
</script>

<style scoped>
.calculators {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--bg-secondary);
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 3rem;
  align-items: start;
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

.header-content {
  flex: 1;
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

.calculators-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.calculator-card {
  background: var(--calc-card-bg);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: var(--calc-card-shadow);
  cursor: pointer;
  transition: all var(--transition-normal);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.calculator-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-secondary)
  );
  transform: scaleX(0);
  transition: transform var(--transition-normal);
}

.calculator-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-primary);
}

.calculator-card:hover::before {
  transform: scaleX(1);
}

.card-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  display: block;
}

.calculator-card h3 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 600;
}

.calculator-card p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border-primary);
}

.action-text {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.95rem;
}

.action-arrow {
  color: var(--color-primary);
  font-size: 1.2rem;
  font-weight: 600;
  transition: transform var(--transition-normal);
}

.calculator-card:hover .action-arrow {
  transform: translateX(4px);
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

/* Summary Sidebar Styles */
.summary-sidebar {
  position: sticky;
  top: 2rem;
}

.summary-section h2 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
}

.summary-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.summary-card {
  background: var(--calc-card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: var(--calc-card-shadow);
  border-left: 4px solid var(--color-primary);
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.summary-icon {
  font-size: 1.5rem;
}

.summary-header h3 {
  font-size: 1.1rem;
  color: var(--text-primary);
  margin: 0;
}

.summary-content {
  margin-bottom: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-primary);
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-label {
  font-weight: 500;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.summary-value {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9rem;
  font-family: monospace;
}

.summary-value.positive {
  color: var(--success-primary);
}

.summary-value.negative {
  color: var(--error-primary);
}

.summary-link {
  display: inline-block;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-primary);
  border-radius: 6px;
  transition: all var(--transition-normal);
  text-align: center;
  width: 100%;
  font-size: 0.9rem;
}

.summary-link:hover {
  background-color: var(--color-primary);
  color: var(--text-inverse);
}

@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .summary-sidebar {
    position: static;
    order: -1;
  }

  .summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
  }

  .summary-section h2 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
}

@media (max-width: 768px) {
  .calculators {
    padding: 1rem;
  }

  .page-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .header-content h1 {
    font-size: 2rem;
  }

  .main-content {
    gap: 1.5rem;
  }

  .calculators-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .calculator-card {
    padding: 2rem;
  }

  .summary-cards {
    grid-template-columns: 1fr;
  }

  .summary-card {
    padding: 1.25rem;
  }
}
</style>
