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

      <div
        class="tool-card profile-card"
        @click="$router.push('/financial-profile')"
      >
        <div class="tool-icon">👤</div>
        <h3>Financial Profile</h3>
        <p>Manage your persistent financial data and track progress</p>
        <div class="profile-summary" v-if="hasProfileData">
          <div class="profile-stat">
            <span class="stat-label">Net Worth:</span>
            <span
              class="stat-value"
              :class="{
                positive: profileNetWorth >= 0,
                negative: profileNetWorth < 0,
              }"
            >
              ${{ formatNumber(Math.abs(profileNetWorth)) }}
            </span>
          </div>
          <div class="profile-stat">
            <span class="stat-label">Monthly Income:</span>
            <span class="stat-value"
              >${{ formatNumber(profileMonthlyIncome) }}</span
            >
          </div>
        </div>
        <div class="profile-empty" v-else>
          <span class="empty-text">No profile data yet</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { themeStore } from "../store/theme.js";
import { profileStore } from "../store/profile";

export default {
  name: "Dashboard",
  setup() {
    // Profile data computed properties
    const hasProfileData = computed(() => {
      return (
        profileStore.financialState.monthlyIncome > 0 ||
        Object.values(profileStore.financialState.assets).some(
          (value) => value > 0
        ) ||
        Object.values(profileStore.financialState.liabilities).some(
          (value) => value > 0
        ) ||
        profileStore.lastUpdated.financialState !== null ||
        profileStore.lastUpdated.netWorth !== null
      );
    });

    const profileNetWorth = computed(() => {
      const totalAssets = Object.values(
        profileStore.financialState.assets
      ).reduce((sum, value) => sum + value, 0);
      const totalLiabilities = Object.values(
        profileStore.financialState.liabilities
      ).reduce((sum, value) => sum + value, 0);
      return totalAssets - totalLiabilities;
    });

    const profileMonthlyIncome = computed(() => {
      return profileStore.financialState.monthlyIncome || 0;
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
        ? "/ThreeWiseMen/logo-light.png"
        : "/ThreeWiseMen/logo.png";
    });

    return {
      formatNumber,
      logoSource,
      hasProfileData,
      profileNetWorth,
      profileMonthlyIncome,
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

/* Profile Card Styles */
.profile-card {
  position: relative;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.profile-summary {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--bg-tertiary);
  border-radius: 8px;
  border-left: 3px solid var(--color-primary);
}

.profile-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.profile-stat:last-child {
  margin-bottom: 0;
}

.stat-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
}

.stat-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  font-family: monospace;
}

.stat-value.positive {
  color: var(--success-primary);
}

.stat-value.negative {
  color: var(--error-primary);
}

.profile-empty {
  margin-top: 1rem;
  padding: 1.5rem;
  text-align: center;
  background: var(--bg-tertiary);
  border-radius: 8px;
  border: 2px dashed var(--border-primary);
}

.empty-text {
  color: var(--text-muted);
  font-style: italic;
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

  .tool-card {
    padding: 1.5rem;
  }
}
</style>
