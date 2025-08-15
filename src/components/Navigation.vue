<template>
  <nav class="navbar" :class="{ 'sidebar-open': isSidebarOpen }">
    <!-- Mobile Menu Toggle -->
    <button
      class="mobile-toggle"
      @click="toggleSidebar"
      :aria-label="isSidebarOpen ? 'Close navigation menu' : 'Open navigation menu'"
      :aria-expanded="isSidebarOpen"
      aria-controls="navigation-menu"
    >
      <span class="hamburger-line" :class="{ active: isSidebarOpen }"></span>
      <span class="hamburger-line" :class="{ active: isSidebarOpen }"></span>
      <span class="hamburger-line" :class="{ active: isSidebarOpen }"></span>
    </button>

    <!-- Navigation Container -->
    <div class="nav-container">
      <!-- Brand Section -->
      <div class="nav-brand">
        <img :src="logoSource" alt="Three Wise Men Logo" class="nav-logo" />
        <div class="brand-text">
          <h1>Three Wise Men</h1>
          <p>Financial Planning Dashboard</p>
        </div>
      </div>

      <!-- Desktop Navigation Menu -->
      <div class="nav-desktop">
        <ul class="nav-menu" role="menubar" aria-label="Main navigation">
          <li class="nav-item" v-for="item in navigationItems" :key="item.path" role="none">
            <router-link
              :to="item.path"
              class="nav-link"
              role="menuitem"
              :aria-current="$route.path === item.path ? 'page' : null"
              @click="closeSidebar"
            >
              {{ item.label }}
            </router-link>
          </li>
        </ul>

        <!-- Theme Toggle -->
        <ThemeToggle />
      </div>
    </div>

    <!-- Mobile/Tablet Sidebar -->
    <div
      class="nav-sidebar"
      :class="{ open: isSidebarOpen }"
      id="navigation-menu"
      role="navigation"
      aria-label="Mobile navigation menu"
    >
      <!-- Skip to main content link for accessibility -->
      <a href="#main-content" class="skip-link" @click="closeSidebar">
        Skip to main content
      </a>

      <ul class="sidebar-menu" role="menubar" aria-label="Main navigation">
        <li class="sidebar-item" v-for="item in navigationItems" :key="item.path" role="none">
          <router-link
            :to="item.path"
            class="sidebar-link"
            role="menuitem"
            :aria-current="$route.path === item.path ? 'page' : null"
            @click="closeSidebar"
            @keydown.enter="closeSidebar"
            @keydown.space.prevent="closeSidebar"
          >
            {{ item.label }}
          </router-link>
        </li>
      </ul>

      <!-- Mobile Theme Toggle -->
      <div class="sidebar-theme-toggle">
        <ThemeToggle />
      </div>
    </div>

    <!-- Sidebar Backdrop -->
    <div
      class="sidebar-backdrop"
      :class="{ active: isSidebarOpen }"
      @click="closeSidebar"
      @keydown.escape="closeSidebar"
      :aria-hidden="!isSidebarOpen"
    ></div>
  </nav>
</template>

<script>
import ThemeToggle from "./ThemeToggle.vue";
import { themeStore } from "../store/theme.js";

export default {
  name: "Navigation",
  components: {
    ThemeToggle,
  },
  data() {
    return {
      isSidebarOpen: false,
      navigationItems: [
        { path: "/", label: "Dashboard" },
        { path: "/calculators", label: "Calculators" },
        { path: "/budget-planner", label: "Budget Planner" },
        { path: "/investments", label: "Investments" },
        { path: "/financial-profile", label: "Financial Profile" },
      ],
    };
  },
  computed: {
    logoSource() {
      return themeStore.isDark
        ? "/src/assets/logo-light.png"
        : "/src/assets/logo.png";
    },
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      this.manageFocus();
      this.manageBodyScroll();
    },
    closeSidebar() {
      this.isSidebarOpen = false;
      this.manageBodyScroll();
    },
    manageFocus() {
      if (this.isSidebarOpen) {
        // Focus first sidebar link when opened
        this.$nextTick(() => {
          const firstLink = this.$el.querySelector('.sidebar-link');
          if (firstLink) firstLink.focus();
        });
      }
    },
    manageBodyScroll() {
      // Prevent body scroll when sidebar is open on mobile
      if (window.innerWidth <= 768) {
        document.body.style.overflow = this.isSidebarOpen ? 'hidden' : '';
      }
    },
    handleResize() {
      // Close sidebar when resizing to desktop
      if (window.innerWidth > 768 && this.isSidebarOpen) {
        this.closeSidebar();
      }
    },
    handleEscapeKey(event) {
      if (event.key === 'Escape' && this.isSidebarOpen) {
        this.closeSidebar();
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('keydown', this.handleEscapeKey);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('keydown', this.handleEscapeKey);
    // Clean up body scroll lock
    document.body.style.overflow = '';
  },
  watch: {
    $route() {
      // Close sidebar when route changes
      this.closeSidebar();
    },
  },
};
</script>

<style scoped>
/* Navigation Container */
.navbar {
  background-color: var(--nav-bg);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all var(--transition-normal);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

/* Brand Section */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.nav-logo {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-normal);
}

.nav-logo:hover {
  transform: scale(1.05);
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

/* Desktop Navigation */
.nav-desktop {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 1.5rem;
  align-items: center;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: var(--nav-text);
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  transition: all var(--transition-normal);
  position: relative;
  min-height: 44px; /* Touch target size */
  display: flex;
  align-items: center;
}

.nav-link:hover,
.nav-link:focus {
  background-color: var(--nav-hover);
  transform: translateY(-2px);
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

.nav-link[aria-current="page"],
.router-link-active {
  background-color: var(--nav-active);
  box-shadow: var(--shadow-md);
}

/* Mobile Toggle Button */
.mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 44px;
  height: 44px;
  background: transparent;
  border: 2px solid var(--nav-text);
  border-radius: 8px;
  cursor: pointer;
  padding: 8px;
  z-index: 1002;
  position: relative;
  transition: all var(--transition-normal);
}

.mobile-toggle:hover,
.mobile-toggle:focus {
  background-color: var(--nav-hover);
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

.hamburger-line {
  width: 100%;
  height: 3px;
  background-color: var(--nav-text);
  border-radius: 2px;
  transition: all var(--transition-normal);
  transform-origin: center;
}

.hamburger-line.active:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Sidebar Navigation */
.nav-sidebar {
  position: fixed;
  top: 0;
  left: -320px;
  width: 320px;
  height: 100vh;
  background-color: var(--nav-bg);
  border-right: 1px solid var(--border-color);
  z-index: 1001;
  transition: left 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  overflow-y: auto;
  padding-top: 100px; /* Space for fixed header */
}

.nav-sidebar.open {
  left: 0;
}

.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-normal);
}

.sidebar-backdrop.active {
  opacity: 1;
  visibility: visible;
}

.sidebar-menu {
  list-style: none;
  margin: 0;
  padding: 2rem 0;
}

.sidebar-item {
  margin-bottom: 0.5rem;
}

.sidebar-link {
  display: block;
  color: var(--nav-text);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 1rem 2rem;
  transition: all var(--transition-normal);
  border-left: 4px solid transparent;
  min-height: 44px;
}

.sidebar-link:hover,
.sidebar-link:focus {
  background-color: var(--nav-hover);
  border-left-color: var(--accent-color);
  outline: 2px solid var(--accent-color);
  outline-offset: -2px;
}

.sidebar-link[aria-current="page"],
.sidebar-link.router-link-active {
  background-color: var(--nav-active);
  border-left-color: var(--accent-color);
  box-shadow: inset 0 0 0 2px var(--accent-color);
}

.sidebar-theme-toggle {
  padding: 2rem;
  border-top: 1px solid var(--border-color);
  margin-top: 2rem;
}

/* Skip Link for Accessibility */
.skip-link {
  position: absolute;
  top: -40px;
  left: 2rem;
  background: var(--accent-color);
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1003;
  transition: top var(--transition-normal);
}

.skip-link:focus {
  top: 1rem;
}

/* Responsive Design */

/* Tablet (768px - 1024px) */
@media (max-width: 1024px) {
  .nav-container {
    padding: 0 1.5rem;
  }
  
  .nav-menu {
    gap: 1rem;
  }
  
  .nav-link {
    padding: 0.6rem 1rem;
    font-size: 0.95rem;
  }
}

/* Mobile and Small Tablet (768px and below) */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
    height: 70px;
  }

  .mobile-toggle {
    display: flex;
    order: -1;
  }

  .nav-brand {
    flex: 1;
    justify-content: center;
    margin: 0 1rem;
  }

  .brand-text h1 {
    font-size: 1.5rem;
  }

  .brand-text p {
    font-size: 0.8rem;
  }

  .nav-desktop {
    display: none;
  }

  .nav-sidebar {
    width: 280px;
    left: -280px;
    padding-top: 80px;
  }

  .sidebar-link {
    font-size: 1rem;
    padding: 0.875rem 1.5rem;
  }

  .sidebar-theme-toggle {
    padding: 1.5rem;
  }
}

/* Small Mobile (320px - 480px) */
@media (max-width: 480px) {
  .nav-container {
    padding: 0 0.75rem;
    height: 60px;
  }

  .nav-brand {
    margin: 0 0.5rem;
  }

  .brand-text h1 {
    font-size: 1.3rem;
  }

  .brand-text p {
    font-size: 0.75rem;
  }

  .nav-logo {
    width: 40px;
    height: 40px;
  }

  .mobile-toggle {
    width: 40px;
    height: 40px;
    padding: 6px;
  }

  .nav-sidebar {
    width: calc(100vw - 60px);
    left: calc(-100vw + 60px);
    padding-top: 70px;
  }

  .nav-sidebar.open {
    left: 0;
  }

  .sidebar-link {
    font-size: 0.95rem;
    padding: 0.75rem 1rem;
  }
}

/* Large Desktop (1024px+) */
@media (min-width: 1025px) {
  .nav-container {
    padding: 0 2.5rem;
  }
  
  .nav-menu {
    gap: 2rem;
  }
  
  .nav-link {
    padding: 0.75rem 1.5rem;
  }
  
  .nav-link:hover {
    transform: translateY(-3px);
  }
}

/* High DPI / Retina Displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .nav-logo {
    image-rendering: -webkit-optimize-contrast;
  }
}

/* Reduced Motion Accessibility */
@media (prefers-reduced-motion: reduce) {
  .nav-link,
  .sidebar-link,
  .nav-sidebar,
  .sidebar-backdrop,
  .hamburger-line,
  .nav-logo {
    transition: none;
  }
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  .nav-link,
  .sidebar-link {
    border: 2px solid transparent;
  }
  
  .nav-link:hover,
  .nav-link:focus,
  .sidebar-link:hover,
  .sidebar-link:focus {
    border-color: currentColor;
  }
}

/* Dark Mode Specific Adjustments */
@media (prefers-color-scheme: dark) {
  .sidebar-backdrop {
    background-color: rgba(0, 0, 0, 0.7);
  }
}
</style>
