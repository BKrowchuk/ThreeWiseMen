<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <img :src="logoSource" alt="Three Wise Men Logo" class="nav-logo" />
          <div class="brand-text">
            <h1>Three Wise Men</h1>
            <p>Financial Planning Dashboard</p>
          </div>
        </div>
        <ul class="nav-menu">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/calculators" class="nav-link"
              >Calculators</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/budget-planner" class="nav-link"
              >Budget Planner</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/investments" class="nav-link"
              >Investments</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/financial-profile" class="nav-link"
              >Financial Profile</router-link
            >
          </li>
        </ul>

        <!-- Theme Toggle -->
        <ThemeToggle />
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import ThemeToggle from "./components/ThemeToggle.vue";
import { themeStore } from "./store/theme.js";

export default {
  name: "App",
  components: {
    ThemeToggle,
  },
  computed: {
    logoSource() {
      return themeStore.isDark
        ? "/src/assets/logo-light.png"
        : "/src/assets/logo.png";
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-logo {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
}

.brand-text h1 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--nav-text);
}

.brand-text p {
  font-size: 0.9rem;
  opacity: 0.9;
  color: var(--nav-text);
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: var(--nav-text);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all var(--transition-normal);
}

.nav-link:hover {
  background-color: var(--nav-hover);
  transform: translateY(-2px);
}

.router-link-active {
  background-color: var(--nav-active);
  box-shadow: var(--shadow-md);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
  }

  .nav-brand {
    justify-content: center;
    text-align: center;
  }

  .brand-text h1 {
    font-size: 1.5rem;
  }

  .brand-text p {
    font-size: 0.8rem;
  }

  .nav-menu {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  .main-content {
    padding: 1rem;
  }
}
</style>
