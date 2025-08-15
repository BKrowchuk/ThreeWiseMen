<template>
  <div class="dashboard">
    <div class="welcome-section">
      <h1>Welcome to Your Financial Dashboard</h1>
      <p>
        Take control of your financial future with our comprehensive planning
        tools
      </p>
    </div>

    <div class="tools-grid">
      <div class="tool-card" @click="$router.push('/savings-calculator')">
        <div class="tool-icon">💰</div>
        <h3>Savings Calculator</h3>
        <p>Plan your savings goals and track your progress</p>
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
export default {
  name: "Dashboard",
};
</script>

<style scoped>
.dashboard {
  text-align: center;
}

.welcome-section {
  margin-bottom: 3rem;
}

.welcome-section h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.welcome-section p {
  font-size: 1.2rem;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.tool-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.tool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.tool-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.tool-card h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.tool-card p {
  color: #7f8c8d;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .welcome-section h1 {
    font-size: 2rem;
  }

  .tools-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
