<template>
  <div class="investments">
    <div class="page-header">
      <h1>Investments</h1>
      <p>Track and analyze your investment portfolio</p>
    </div>

    <div class="placeholder-content">
      <div class="placeholder-icon">📈</div>
      <h2>Coming Soon</h2>
      <p>
        This page will contain tools to help you track investments, analyze
        performance, and plan your investment strategy.
      </p>
      <router-link to="/" class="back-link">← Back to Dashboard</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Investments",
};
</script>

<style scoped>
.investments {
  text-align: center;
  background: var(--bg-secondary);
  min-height: 100vh;
  padding: 2rem;
}

.page-header {
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.page-header p {
  font-size: 1.2rem;
  color: var(--text-secondary);
}

.placeholder-content {
  background: var(--calc-card-bg);
  padding: 4rem 2rem;
  border-radius: 12px;
  box-shadow: var(--calc-card-shadow);
  max-width: 600px;
  margin: 0 auto;
}

.placeholder-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.placeholder-content h2 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.placeholder-content p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
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
  .page-header h1 {
    font-size: 2rem;
  }

  .placeholder-content {
    padding: 2rem 1rem;
  }
}
</style>
