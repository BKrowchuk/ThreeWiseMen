<template>
  <div id="app">
    <Navigation />
    
    <main id="main-content" class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation,
  },
};
</script>

<style>
/* Global App Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Main Content Area */
.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
}

/* Responsive Main Content */
@media (max-width: 768px) {
  .main-content {
    padding: 1.5rem 1rem;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 1rem 0.75rem;
  }
}

/* Ensure smooth scrolling for skip links */
html {
  scroll-behavior: smooth;
}

/* Focus styles for accessibility */
:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}
</style>
