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
</template>

<script>
export default {
  name: "Calculators",
};
</script>

<style scoped>
.calculators {
  max-width: 1200px;
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
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

  .calculators-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .calculator-card {
    padding: 2rem;
  }
}
</style>
