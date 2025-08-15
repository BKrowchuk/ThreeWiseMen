<template>
  <div class="dashboard">
    <div class="welcome-section">
      <div class="welcome-header">
        <img :src="logoSource" alt="Three Wise Men Logo" class="welcome-logo" />
        <div class="welcome-text">
          <h1>Welcome to Your Financial Dashboard</h1>
          <p>
            Take control of your financial future with our comprehensive
            planning tools
          </p>
        </div>
      </div>
    </div>

    <!-- Calculator Summary Section -->
    <div class="summary-section" v-if="hasCalculatorData">
      <h2>Calculator Summary</h2>
      <div class="summary-grid">
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
          <router-link to="/calculators/down-payment" class="summary-link"
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
          <router-link to="/calculators/net-worth" class="summary-link"
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
          <router-link to="/calculators/cash-flow" class="summary-link"
            >View Details →</router-link
          >
        </div>
      </div>
    </div>

    <div class="tools-grid">
      <div class="tool-card" @click="$router.push('/calculators')">
        <div class="tool-icon">🧮</div>
        <h3>Financial Calculators</h3>
        <p>Comprehensive tools for financial planning and analysis</p>
      </div>

      <div class="tool-card" @click="$router.push('/budget-planner')">
        <div class="tool-icon">📊</div>
        <h3>Budget Planner</h3>
        <p>Create and manage your monthly budget</p>
      </div>

      <div class="tool-card" @click="$router.push('/investments')">
        <div class="tool-icon">📈</div>
        <h3>Investments</h3>
        <p>Track and analyze your investment portfolio</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { calculatorStore } from "../store/calculators";
import { themeStore } from "../store/theme.js";

export default {
  name: "Dashboard",
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

    // Logo source based on theme
    const logoSource = computed(() => {
      return themeStore.isDark
        ? "/src/assets/logo-light.png"
        : "/src/assets/logo.png";
    });

    return {
      downPaymentSummary,
      netWorthSummary,
      cashFlowSummary,
      hasCalculatorData,
      formatNumber,
      logoSource,
    };
  },
};
</script>

<style scoped>
.dashboard {
  text-align: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--bg-secondary);
  min-height: 100vh;
}

.welcome-section {
  margin-bottom: 3rem;
}

.welcome-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.welcome-logo {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
}

.welcome-text h1 {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.welcome-text p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.tool-card {
  background: var(--calc-card-bg);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--calc-card-shadow);
  cursor: pointer;
  transition: all var(--transition-normal);
  border: 2px solid transparent;
}

.tool-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-primary);
}

.tool-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.tool-card h3 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.tool-card p {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Summary Section Styles */
.summary-section {
  margin-bottom: 3rem;
}

.summary-section h2 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 2rem;
  text-align: center;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: var(--calc-card-bg);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--calc-card-shadow);
  border-left: 4px solid var(--color-primary);
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.summary-icon {
  font-size: 2rem;
}

.summary-header h3 {
  font-size: 1.3rem;
  color: var(--text-primary);
  margin: 0;
}

.summary-content {
  margin-bottom: 1.5rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-primary);
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-label {
  font-weight: 500;
  color: var(--text-muted);
}

.summary-value {
  font-weight: 600;
  color: var(--text-primary);
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
}

.summary-link:hover {
  background-color: var(--color-primary);
  color: var(--text-inverse);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .dashboard {
    max-width: 1200px;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 1rem;
    max-width: 100%;
  }

  .welcome-header {
    flex-direction: column;
    gap: 1.5rem;
  }

  .welcome-logo {
    width: 60px;
    height: 60px;
  }

  .welcome-text h1 {
    font-size: 2rem;
  }

  .welcome-text p {
    font-size: 1rem;
  }

  .tools-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .summary-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .summary-section h2 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .dashboard {
    padding: 0.75rem;
  }

  .welcome-logo {
    width: 50px;
    height: 50px;
  }

  .welcome-text h1 {
    font-size: 1.75rem;
  }

  .welcome-text p {
    font-size: 0.9rem;
  }

  .tool-card,
  .summary-card {
    padding: 1.5rem;
  }

  .summary-section h2 {
    font-size: 1.25rem;
  }
}
</style>
