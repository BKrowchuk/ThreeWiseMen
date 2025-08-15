<template>
  <div class="theme-toggle-container">
    <button
      @click="toggleTheme"
      :class="['theme-toggle', { 'is-dark': isDark }]"
      :title="toggleTooltip"
      aria-label="Toggle dark mode"
    >
      <!-- Sun icon for light mode -->
      <svg
        v-if="!isDark"
        class="theme-icon sun-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>

      <!-- Moon icon for dark mode -->
      <svg
        v-else
        class="theme-icon moon-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>

      <!-- Theme indicator text -->
      <span class="theme-text">{{ themeText }}</span>
    </button>

    <!-- Theme menu dropdown -->
    <div v-if="showMenu" class="theme-menu">
      <button
        @click="setTheme('light')"
        :class="['theme-option', { active: resolvedTheme === 'light' }]"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        Light
      </button>

      <button
        @click="setTheme('dark')"
        :class="['theme-option', { active: resolvedTheme === 'dark' }]"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        Dark
      </button>

      <button
        @click="setTheme('system')"
        :class="['theme-option', { active: currentTheme === 'system' }]"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
        System
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { themeStore, themeActions } from "../store/theme.js";

export default {
  name: "ThemeToggle",
  setup() {
    const showMenu = ref(false);

    // Computed properties
    const isDark = computed(() => themeStore.isDark);
    const currentTheme = computed(() => themeStore.currentTheme);
    const resolvedTheme = computed(() => themeStore.resolvedTheme);

    const themeText = computed(() => {
      if (currentTheme.value === "system") {
        return `System (${resolvedTheme.value})`;
      }
      return resolvedTheme.value === "dark" ? "Dark" : "Light";
    });

    const toggleTooltip = computed(() => {
      return `Switch to ${isDark.value ? "light" : "dark"} mode`;
    });

    // Methods
    const toggleTheme = () => {
      themeActions.toggleTheme();
    };

    const setTheme = (theme) => {
      themeActions.setTheme(theme);
      showMenu.value = false;
    };

    const toggleMenu = () => {
      showMenu.value = !showMenu.value;
    };

    // Close menu when clicking outside
    const closeMenu = (event) => {
      if (!event.target.closest(".theme-toggle-container")) {
        showMenu.value = false;
      }
    };

    // Add click outside listener
    if (typeof window !== "undefined") {
      document.addEventListener("click", closeMenu);
    }

    return {
      isDark,
      currentTheme,
      resolvedTheme,
      themeText,
      toggleTooltip,
      showMenu,
      toggleTheme,
      setTheme,
      toggleMenu,
    };
  },
};
</script>

<style scoped>
.theme-toggle-container {
  position: relative;
  display: inline-block;
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  min-width: 120px;
  justify-content: center;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.theme-toggle:active {
  transform: translateY(0);
}

.theme-toggle.is-dark {
  background: rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.theme-icon {
  transition: transform 0.3s ease;
}

.theme-toggle:hover .theme-icon {
  transform: rotate(15deg);
}

.theme-text {
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
}

/* Theme menu dropdown */
.theme-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  min-width: 140px;
  z-index: 1000;
  overflow: hidden;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  font-size: 0.875rem;
}

.theme-option:hover {
  background: #f3f4f6;
  color: #111827;
}

.theme-option.active {
  background: #667eea;
  color: white;
}

.theme-option svg {
  flex-shrink: 0;
}

/* Dark theme styles for the menu */
:global(.theme-dark) .theme-menu {
  background: #1f2937;
  border-color: #374151;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

:global(.theme-dark) .theme-option {
  color: #d1d5db;
}

:global(.theme-dark) .theme-option:hover {
  background: #374151;
  color: #f9fafb;
}

:global(.theme-dark) .theme-option.active {
  background: #667eea;
  color: white;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .theme-toggle {
    min-width: auto;
    padding: 0.5rem;
  }

  .theme-text {
    display: none;
  }

  .theme-menu {
    right: -0.5rem;
  }
}
</style>
