<template>
  <div class="calculators">
    <div class="page-header">
      <h1>Financial Calculators</h1>
      <p>Comprehensive tools to help you plan your financial future</p>
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

    <div class="back-section">
      <router-link to="/" class="back-link">← Back to Dashboard</router-link>
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
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.page-header p {
  font-size: 1.2rem;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
}

.calculators-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.calculator-card {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
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
  background: linear-gradient(135deg, #667eea, #764ba2);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.calculator-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
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
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 600;
}

.calculator-card p {
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e1e8ed;
}

.action-text {
  color: #667eea;
  font-weight: 600;
  font-size: 0.95rem;
}

.action-arrow {
  color: #667eea;
  font-size: 1.2rem;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.calculator-card:hover .action-arrow {
  transform: translateX(4px);
}

.back-section {
  text-align: center;
}

.back-link {
  display: inline-block;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border: 2px solid #667eea;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.back-link:hover {
  background-color: #667eea;
  color: white;
}

@media (max-width: 768px) {
  .calculators {
    padding: 1rem;
  }

  .page-header h1 {
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
