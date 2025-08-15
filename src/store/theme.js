import { reactive, watch } from "vue";

// Theme store state
export const themeStore = reactive({
  // Current theme: 'light', 'dark', or 'system'
  currentTheme: "system",

  // Resolved theme (actual theme being applied)
  resolvedTheme: "light",

  // Whether dark mode is currently active
  isDark: false,

  // Theme preferences
  preferences: {
    // User's explicit choice
    userChoice: null,
    // System preference
    systemPreference: "light",
    // Whether to follow system preference
    followSystem: true,
  },
});

// Theme actions
export const themeActions = {
  // Initialize theme system
  init() {
    this.loadThemePreference();
    this.detectSystemPreference();
    this.applyTheme();

    // Watch for system preference changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener(
        "change",
        this.handleSystemPreferenceChange.bind(this)
      );
    }
  },

  // Load theme preference from localStorage
  loadThemePreference() {
    try {
      const stored = localStorage.getItem("threeWiseMenTheme");
      if (stored) {
        const parsed = JSON.parse(stored);
        themeStore.currentTheme = parsed.currentTheme || "system";
        themeStore.preferences.userChoice = parsed.userChoice;
        themeStore.preferences.followSystem = parsed.followSystem !== false;
      }
    } catch (error) {
      console.warn("Failed to load theme preference from localStorage:", error);
    }
  },

  // Save theme preference to localStorage
  saveThemePreference() {
    try {
      localStorage.setItem(
        "threeWiseMenTheme",
        JSON.stringify({
          currentTheme: themeStore.currentTheme,
          userChoice: themeStore.preferences.userChoice,
          followSystem: themeStore.preferences.followSystem,
        })
      );
    } catch (error) {
      console.warn("Failed to save theme preference to localStorage:", error);
    }
  },

  // Detect system color scheme preference
  detectSystemPreference() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      themeStore.preferences.systemPreference = mediaQuery.matches
        ? "dark"
        : "light";
    }
  },

  // Handle system preference change
  handleSystemPreferenceChange(event) {
    themeStore.preferences.systemPreference = event.matches ? "dark" : "light";
    if (themeStore.preferences.followSystem) {
      this.applyTheme();
    }
  },

  // Set theme explicitly
  setTheme(theme) {
    if (theme === "system") {
      themeStore.currentTheme = "system";
      themeStore.preferences.followSystem = true;
      themeStore.preferences.userChoice = null;
    } else {
      themeStore.currentTheme = theme;
      themeStore.preferences.followSystem = false;
      themeStore.preferences.userChoice = theme;
    }

    this.applyTheme();
    this.saveThemePreference();
  },

  // Toggle between light and dark
  toggleTheme() {
    const newTheme = themeStore.resolvedTheme === "light" ? "dark" : "light";
    this.setTheme(newTheme);
  },

  // Apply the current theme
  applyTheme() {
    // Determine the actual theme to apply
    if (themeStore.currentTheme === "system") {
      themeStore.resolvedTheme = themeStore.preferences.systemPreference;
    } else {
      themeStore.resolvedTheme = themeStore.currentTheme;
    }

    // Update the isDark flag
    themeStore.isDark = themeStore.resolvedTheme === "dark";

    // Apply theme to document
    this.applyThemeToDocument();
  },

  // Apply theme classes and CSS variables to document
  applyThemeToDocument() {
    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove("theme-light", "theme-dark");

    // Add current theme class
    root.classList.add(`theme-${themeStore.resolvedTheme}`);

    // Set data attribute for CSS targeting
    root.setAttribute("data-theme", themeStore.resolvedTheme);

    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor();
  },

  // Update meta theme-color tag
  updateMetaThemeColor() {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.name = "theme-color";
      document.head.appendChild(metaThemeColor);
    }

    // Set theme color based on current theme
    if (themeStore.resolvedTheme === "dark") {
      metaThemeColor.content = "#1a1a1a"; // Dark theme color
    } else {
      metaThemeColor.content = "#667eea"; // Light theme color (matches navbar)
    }
  },

  // Get current theme info
  getCurrentThemeInfo() {
    return {
      currentTheme: themeStore.currentTheme,
      resolvedTheme: themeStore.resolvedTheme,
      isDark: themeStore.isDark,
      isSystem: themeStore.currentTheme === "system",
    };
  },
};

// Watch for theme changes and apply them
watch(
  () => themeStore.resolvedTheme,
  () => {
    themeActions.applyTheme();
  }
);

// Export store and actions
export default {
  store: themeStore,
  actions: themeActions,
};
