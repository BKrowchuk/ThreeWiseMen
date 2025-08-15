<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <img
            src="/src/assets/logo.png"
            alt="Three Wise Men Logo"
            class="nav-logo"
          />
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
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
  color: #333;
}

#app {
  min-height: 100vh;
}

.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.brand-text h1 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.brand-text p {
  font-size: 0.9rem;
  opacity: 0.9;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  }

  .nav-menu {
    gap: 1rem;
  }

  .main-content {
    padding: 1rem;
  }
}
</style>
