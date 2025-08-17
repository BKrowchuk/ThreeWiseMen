<template>
  <!-- Top Navigation Bar -->
  <nav class="navbar">
    <div class="nav-container">
      <!-- Left: Menu Toggle -->
      <button
        class="menu-toggle"
        @click="toggleDrawer"
        :aria-label="
          isDrawerOpen ? 'Close navigation menu' : 'Open navigation menu'
        "
        :aria-expanded="isDrawerOpen"
        aria-controls="navigation-drawer"
      >
        <svg
          class="menu-icon"
          :class="{ active: isDrawerOpen, 'theme-adaptive': true }"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <!-- Enhanced hamburger to X animation -->
          <path
            class="menu-line menu-line-1"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            :d="isDrawerOpen ? 'M6 18L18 6' : 'M3 6h18'"
          />
          <path
            class="menu-line menu-line-2"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            :d="isDrawerOpen ? 'M6 6l12 12' : 'M3 12h18'"
            :opacity="isDrawerOpen ? 0 : 1"
          />
          <path
            class="menu-line menu-line-3"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            :d="isDrawerOpen ? '' : 'M3 18h18'"
            :opacity="isDrawerOpen ? 0 : 1"
          />
        </svg>
      </button>

      <!-- Center: Brand -->
      <div class="nav-brand">
        <img :src="logoSource" alt="Three Wise Men Logo" class="nav-logo" />
        <h1 class="brand-title">Three Wise Men</h1>
      </div>

      <!-- Right: Theme Toggle -->
      <button
        class="theme-toggle"
        @click="toggleTheme"
        :aria-label="
          'Switch to ' + (themeStore.isDark ? 'light' : 'dark') + ' mode'
        "
        :title="'Switch to ' + (themeStore.isDark ? 'light' : 'dark') + ' mode'"
      >
        <svg
          class="theme-icon"
          :class="{
            'dark-mode': themeStore.isDark,
            'light-mode': !themeStore.isDark,
            'theme-adaptive': true,
          }"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <!-- Enhanced Sun icon for dark mode -->
          <g v-if="themeStore.isDark" class="sun-icon">
            <circle
              cx="12"
              cy="12"
              r="4"
              fill="currentColor"
              stroke="none"
              class="sun-center"
            />
            <g class="sun-rays" stroke-width="2.5" stroke-linecap="round">
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="M4.93 4.93l1.41 1.41" />
              <path d="M17.66 17.66l1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="M6.34 17.66l-1.41 1.41" />
              <path d="M19.07 4.93l-1.41 1.41" />
            </g>
          </g>
          <!-- Enhanced Moon icon for light mode -->
          <g v-else class="moon-icon">
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="1"
            />
            <!-- Stars around moon for better visual -->
            <g class="stars" fill="currentColor" stroke="none">
              <circle cx="18" cy="6" r="0.5" />
              <circle cx="20" cy="8" r="0.5" />
              <circle cx="19" cy="10" r="0.5" />
            </g>
          </g>
        </svg>
      </button>
    </div>
  </nav>

  <!-- Navigation Drawer -->
  <div
    class="nav-drawer"
    :class="{ open: isDrawerOpen }"
    id="navigation-drawer"
    role="navigation"
    aria-label="Navigation menu"
  >
    <!-- Drawer Header -->
    <div class="drawer-header">
      <div class="drawer-brand">
        <img :src="logoSource" alt="Three Wise Men Logo" class="drawer-logo" />
        <div class="drawer-brand-text">
          <h2>Three Wise Men</h2>
          <p>Financial Planning</p>
        </div>
      </div>
      <button
        class="drawer-close"
        @click="closeDrawer"
        aria-label="Close navigation menu"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Navigation Menu -->
    <nav class="drawer-nav">
      <ul class="nav-list" role="menubar">
        <li v-for="item in navigationItems" :key="item.path" role="none">
          <router-link
            :to="item.path"
            class="nav-item"
            role="menuitem"
            :aria-current="$route.path === item.path ? 'page' : null"
            @click="closeDrawer"
          >
            <svg
              class="nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                v-if="item.path === '/'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
              <path
                v-else-if="item.path === '/calculators'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
              <path
                v-else-if="item.path === '/budget-planner'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
              <path
                v-else-if="item.path === '/investments'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
              <path
                v-else-if="item.path === '/financial-profile'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
              <circle v-else cx="12" cy="12" r="3" />
            </svg>
            <span>{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>

  <!-- Drawer Backdrop -->
  <div
    class="drawer-backdrop"
    :class="{ active: isDrawerOpen }"
    @click="closeDrawer"
    :aria-hidden="!isDrawerOpen"
  ></div>
</template>

<script>
import { themeStore, themeActions } from "../store/theme.js";

export default {
  name: "Navigation",
  components: {},
  data() {
    return {
      isDrawerOpen: false,
      navigationItems: [
        { path: "/", label: "Dashboard" },
        { path: "/calculators", label: "Calculators" },
        { path: "/budget-planner", label: "Budget Planner" },
        { path: "/investments", label: "Investments" },
        { path: "/financial-profile", label: "Profile" },
      ],
    };
  },
  computed: {
    logoSource() {
      return themeStore.isDark
        ? "/ThreeWiseMen/logo-light.png"
        : "/ThreeWiseMen/logo.png";
    },
    themeStore() {
      return themeStore;
    },
  },
  methods: {
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
      this.manageBodyScroll();
    },
    closeDrawer() {
      this.isDrawerOpen = false;
      this.manageBodyScroll();
    },
    toggleTheme() {
      themeActions.toggleTheme();
    },
    manageBodyScroll() {
      // Prevent body scroll when drawer is open
      document.body.style.overflow = this.isDrawerOpen ? "hidden" : "";
    },
    handleEscapeKey(event) {
      if (event.key === "Escape" && this.isDrawerOpen) {
        this.closeDrawer();
      }
    },
  },
  mounted() {
    document.addEventListener("keydown", this.handleEscapeKey);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleEscapeKey);
    // Clean up body scroll lock
    document.body.style.overflow = "";
  },
  watch: {
    $route() {
      // Close drawer when route changes
      this.closeDrawer();
    },
  },
};
</script>

<style scoped>
/* Top Navigation Bar */
.navbar {
  background-color: var(--nav-bg);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.nav-container {
  width: 100%;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

/* Menu Toggle Button */
.menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: var(--nav-text);
  transition: all 0.3s ease;
  position: relative;
  padding: 8px;
  box-sizing: border-box;
}

.menu-toggle:hover,
.menu-toggle:focus {
  background-color: var(--nav-hover);
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
  transform: scale(1.05);
}

.menu-icon {
  width: 28px;
  height: 28px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  display: block;
  stroke: currentColor;
  fill: none;
}

/* Enhanced Menu Icon Animations */
.menu-line {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.menu-icon.active .menu-line-1 {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-icon.active .menu-line-2 {
  opacity: 0;
  transform: scale(0);
}

.menu-icon.active .menu-line-3 {
  opacity: 0;
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Theme-adaptive menu icon */
.menu-icon.theme-adaptive {
  color: var(--nav-text);
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

[data-theme="dark"] .menu-icon.theme-adaptive {
  color: var(--nav-text);
  filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.1));
}

.menu-toggle:hover .menu-icon {
  color: var(--accent-color);
}

/* Brand Section */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  justify-content: center;
  margin: 0 1rem;
}

.nav-logo {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  box-shadow: var(--shadow-sm);
}

.brand-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--nav-text);
  margin: 0;
}

/* Theme Toggle Button */
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: var(--nav-text);
  transition: all 0.3s ease;
  position: relative;
  padding: 8px;
  box-sizing: border-box;
}

.theme-toggle:hover,
.theme-toggle:focus {
  background-color: var(--nav-hover);
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
  transform: scale(1.05);
}

.theme-icon {
  width: 28px;
  height: 28px;
  stroke-width: 2;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  display: block;
  stroke: currentColor;
  fill: none;
}

/* Enhanced Theme Icon Animations */
.theme-icon.dark-mode {
  color: #fbbf24; /* Warm sun color */
  transform: rotate(0deg);
}

.theme-icon.light-mode {
  color: #3b82f6; /* Cool moon color */
  transform: rotate(180deg);
}

.theme-icon.theme-adaptive {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
}

[data-theme="dark"] .theme-icon.theme-adaptive {
  filter: drop-shadow(0 2px 4px rgba(255, 255, 255, 0.15));
}

/* Sun icon animations */
.sun-icon {
  animation: sunAppear 0.4s ease-out;
}

.sun-center {
  animation: sunPulse 2s ease-in-out infinite alternate;
  fill: currentColor !important;
  stroke: none !important;
}

.sun-rays {
  animation: sunRotate 8s linear infinite;
  transform-origin: center;
  fill: none !important;
  stroke: currentColor !important;
}

/* Moon icon animations */
.moon-icon {
  animation: moonAppear 0.4s ease-out;
}

.moon-icon path {
  fill: currentColor !important;
  stroke: currentColor !important;
}

.stars {
  animation: starsTwinkle 3s ease-in-out infinite alternate;
  fill: currentColor !important;
  stroke: none !important;
}

/* Hover effects for theme toggle */
.theme-toggle:hover .theme-icon.dark-mode {
  color: #f59e0b;
  transform: rotate(15deg) scale(1.1);
}

.theme-toggle:hover .theme-icon.light-mode {
  color: #2563eb;
  transform: rotate(195deg) scale(1.1);
}

@keyframes sunAppear {
  from {
    opacity: 0;
    transform: rotate(-90deg) scale(0.5);
  }
  to {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
}

@keyframes moonAppear {
  from {
    opacity: 0;
    transform: rotate(90deg) scale(0.5);
  }
  to {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
}

@keyframes sunPulse {
  from {
    opacity: 0.8;
  }
  to {
    opacity: 1;
  }
}

@keyframes sunRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes starsTwinkle {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}

/* Navigation Drawer */
.nav-drawer {
  position: fixed;
  top: 0;
  left: -320px;
  width: 320px;
  height: 100vh;
  background-color: var(--nav-bg);
  border-right: 1px solid var(--border-color);
  z-index: 1001;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
}

.nav-drawer.open {
  left: 0;
}

/* Drawer Header */
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.drawer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.drawer-logo {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
}

.drawer-brand-text h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--nav-text);
  margin: 0 0 0.25rem 0;
}

.drawer-brand-text p {
  font-size: 0.875rem;
  color: var(--nav-text);
  opacity: 0.7;
  margin: 0;
}

.drawer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: var(--nav-text);
  transition: all 0.2s ease;
}

.drawer-close:hover,
.drawer-close:focus {
  background-color: var(--nav-hover);
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

.drawer-close svg {
  width: 18px;
  height: 18px;
}

/* Navigation List */
.drawer-nav {
  padding: 1rem 0;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-list li {
  margin: 0.25rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  color: var(--nav-text);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  min-height: 48px;
}

.nav-item:hover,
.nav-item:focus {
  background-color: var(--nav-hover);
  border-left-color: var(--accent-color);
  outline: none;
}

.nav-item[aria-current="page"],
.nav-item.router-link-active {
  background-color: var(--nav-active);
  border-left-color: var(--accent-color);
  font-weight: 600;
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  stroke-width: 2;
}

/* Drawer Backdrop */
.drawer-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.drawer-backdrop.active {
  opacity: 1;
  visibility: visible;
}

/* Responsive Design */
@media (max-width: 480px) {
  .nav-container {
    padding: 0 1rem;
    height: 56px;
  }

  .nav-logo {
    width: 32px;
    height: 32px;
  }

  .brand-title {
    font-size: 1.125rem;
  }

  .menu-toggle,
  .theme-toggle {
    width: 40px;
    height: 40px;
    padding: 6px;
  }

  .menu-icon,
  .theme-icon {
    width: 24px;
    height: 24px;
  }

  .nav-drawer {
    width: calc(100vw - 48px);
    left: calc(-100vw + 48px);
  }

  .nav-drawer.open {
    left: 0;
  }
}

/* Dark Mode Adjustments */
@media (prefers-color-scheme: dark) {
  .drawer-backdrop {
    background-color: rgba(0, 0, 0, 0.7);
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .nav-drawer,
  .drawer-backdrop,
  .menu-toggle,
  .theme-toggle,
  .nav-item,
  .menu-icon,
  .theme-icon,
  .menu-line {
    transition: none;
    animation: none;
  }

  .sun-icon,
  .moon-icon,
  .sun-center,
  .sun-rays,
  .stars {
    animation: none;
  }

  .theme-icon.dark-mode,
  .theme-icon.light-mode {
    transform: none;
  }

  .menu-toggle:hover,
  .theme-toggle:hover {
    transform: none;
  }
}

/* High Contrast */
@media (prefers-contrast: high) {
  .nav-item {
    border: 1px solid transparent;
  }

  .nav-item:hover,
  .nav-item:focus,
  .nav-item[aria-current="page"],
  .nav-item.router-link-active {
    border-color: currentColor;
  }
}
</style>
