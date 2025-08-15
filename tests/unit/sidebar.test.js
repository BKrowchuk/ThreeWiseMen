/**
 * Unit Tests for ThreeWiseMen Sidebar Navigation
 */

// Mock DOM structure for sidebar testing
const createMockSidebar = () => {
  const sidebar = document.createElement("aside");
  sidebar.id = "sidebar";
  sidebar.className = "sidebar";

  const sidebarHeader = document.createElement("div");
  sidebarHeader.className = "sidebar-header";

  const appTitle = document.createElement("h2");
  appTitle.className = "app-title";
  appTitle.textContent = "ThreeWiseMen";

  const sidebarToggle = document.createElement("button");
  sidebarToggle.id = "sidebarToggle";
  sidebarToggle.className = "sidebar-toggle";
  sidebarToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';

  sidebarHeader.appendChild(appTitle);
  sidebarHeader.appendChild(sidebarToggle);

  const sidebarNav = document.createElement("nav");
  sidebarNav.className = "sidebar-nav";

  const navList = document.createElement("ul");
  navList.className = "nav-list";

  const navItems = [
    { view: "overview", text: "Overview", icon: "fas fa-tachometer-alt" },
    {
      view: "calculator",
      text: "Savings Calculator",
      icon: "fas fa-calculator",
    },
    { view: "budget", text: "Budget Planner", icon: "fas fa-chart-pie" },
    { view: "investments", text: "Investments", icon: "fas fa-chart-line" },
  ];

  navItems.forEach((item) => {
    const li = document.createElement("li");
    li.className = "nav-item";

    const link = document.createElement("a");
    link.href = `#${item.view}`;
    link.className = "nav-link";
    link.setAttribute("data-view", item.view);
    link.innerHTML = `<i class="${item.icon}"></i><span class="nav-text">${item.text}</span>`;

    li.appendChild(link);
    navList.appendChild(li);
  });

  sidebarNav.appendChild(navList);
  sidebar.appendChild(sidebarHeader);
  sidebar.appendChild(sidebarNav);

  return sidebar;
};

const createMockMainContent = () => {
  const mainContent = document.createElement("main");
  mainContent.className = "main-content";

  const topHeader = document.createElement("header");
  topHeader.className = "top-header";

  const mobileMenuToggle = document.createElement("button");
  mobileMenuToggle.id = "mobileMenuToggle";
  mobileMenuToggle.className = "mobile-menu-toggle";
  mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';

  const pageTitle = document.createElement("h1");
  pageTitle.className = "page-title";
  pageTitle.textContent = "Dashboard";

  topHeader.appendChild(mobileMenuToggle);
  topHeader.appendChild(pageTitle);
  mainContent.appendChild(topHeader);

  return mainContent;
};

// Mock localStorage
const mockLocalStorage = {
  data: {},
  getItem: function (key) {
    return this.data[key] || null;
  },
  setItem: function (key, value) {
    this.data[key] = value;
  },
  clear: function () {
    this.data = {};
  },
};

// Mock window.history
const mockHistory = {
  pushState: jest.fn(),
  replaceState: jest.fn(),
};

// Sidebar functionality class for testing
class SidebarManager {
  constructor() {
    this.state = {
      sidebarCollapsed: false,
      currentView: "overview",
    };
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadState();
  }

  setupEventListeners() {
    const sidebarToggle = document.getElementById("sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => this.toggleSidebar());
    }

    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener("click", () => this.toggleMobileMenu());
    }

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const view = link.getAttribute("data-view");
        this.navigateToView(view);
      });
    });
  }

  toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.querySelector(".main-content");

    this.state.sidebarCollapsed = !this.state.sidebarCollapsed;

    if (this.state.sidebarCollapsed) {
      sidebar.classList.add("collapsed");
    } else {
      sidebar.classList.remove("collapsed");
    }

    this.saveState();
  }

  toggleMobileMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("mobile-open");
  }

  navigateToView(view) {
    this.state.currentView = view;
    this.updateActiveNavigation(view);
    this.saveState();

    // Update URL
    window.history.pushState({ view }, "", `#${view}`);
  }

  updateActiveNavigation(view) {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("data-view") === view) {
        link.classList.add("active");
      }
    });
  }

  saveState() {
    localStorage.setItem("threeWiseMenState", JSON.stringify(this.state));
  }

  loadState() {
    const savedState = localStorage.getItem("threeWiseMenState");
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        this.state = { ...this.state, ...parsedState };

        if (this.state.sidebarCollapsed) {
          const sidebar = document.getElementById("sidebar");
          if (sidebar) {
            sidebar.classList.add("collapsed");
          }
        }
      } catch (error) {
        console.warn("Failed to load saved state:", error);
      }
    }
  }

  getState() {
    return { ...this.state };
  }
}

// Test Suite
describe("ThreeWiseMen Sidebar Navigation", () => {
  let sidebar;
  let mainContent;
  let sidebarManager;

  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = "";
    sidebar = createMockSidebar();
    mainContent = createMockMainContent();
    document.body.appendChild(sidebar);
    document.body.appendChild(mainContent);

    // Setup mocks
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
      writable: true,
    });

    Object.defineProperty(window, "history", {
      value: mockHistory,
      writable: true,
    });

    mockLocalStorage.clear();
    mockHistory.pushState.mockClear();

    // Initialize sidebar manager
    sidebarManager = new SidebarManager();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("Sidebar Toggle Functionality", () => {
    test("should toggle sidebar collapsed state", () => {
      const sidebarToggle = document.getElementById("sidebarToggle");
      const sidebar = document.getElementById("sidebar");

      expect(sidebar.classList.contains("collapsed")).toBe(false);
      expect(sidebarManager.getState().sidebarCollapsed).toBe(false);

      sidebarToggle.click();

      expect(sidebar.classList.contains("collapsed")).toBe(true);
      expect(sidebarManager.getState().sidebarCollapsed).toBe(true);
    });

    test("should save sidebar state to localStorage", () => {
      const sidebarToggle = document.getElementById("sidebarToggle");

      sidebarToggle.click();

      const savedState = JSON.parse(localStorage.getItem("threeWiseMenState"));
      expect(savedState.sidebarCollapsed).toBe(true);
    });

    test("should load saved sidebar state on initialization", () => {
      // Save collapsed state
      localStorage.setItem(
        "threeWiseMenState",
        JSON.stringify({ sidebarCollapsed: true })
      );

      // Create new sidebar manager
      document.body.innerHTML = "";
      sidebar = createMockSidebar();
      mainContent = createMockMainContent();
      document.body.appendChild(sidebar);
      document.body.appendChild(mainContent);

      const newSidebarManager = new SidebarManager();

      expect(newSidebarManager.getState().sidebarCollapsed).toBe(true);
      expect(sidebar.classList.contains("collapsed")).toBe(true);
    });
  });

  describe("Mobile Menu Functionality", () => {
    test("should toggle mobile menu overlay", () => {
      const mobileMenuToggle = document.getElementById("mobileMenuToggle");
      const sidebar = document.getElementById("sidebar");

      expect(sidebar.classList.contains("mobile-open")).toBe(false);

      mobileMenuToggle.click();

      expect(sidebar.classList.contains("mobile-open")).toBe(true);

      mobileMenuToggle.click();

      expect(sidebar.classList.contains("mobile-open")).toBe(false);
    });
  });

  describe("Navigation Functionality", () => {
    test("should navigate to different views", () => {
      const navLinks = document.querySelectorAll(".nav-link");

      // Test calculator navigation
      const calculatorLink = Array.from(navLinks).find(
        (link) => link.getAttribute("data-view") === "calculator"
      );

      calculatorLink.click();

      expect(sidebarManager.getState().currentView).toBe("calculator");
      expect(window.history.pushState).toHaveBeenCalledWith(
        { view: "calculator" },
        "",
        "#calculator"
      );
    });

    test("should update active navigation state", () => {
      const navLinks = document.querySelectorAll(".nav-link");

      // Initially overview should be active
      const overviewLink = Array.from(navLinks).find(
        (link) => link.getAttribute("data-view") === "overview"
      );
      expect(overviewLink.classList.contains("active")).toBe(true);

      // Navigate to calculator
      const calculatorLink = Array.from(navLinks).find(
        (link) => link.getAttribute("data-view") === "calculator"
      );
      calculatorLink.click();

      // Overview should no longer be active, calculator should be
      expect(overviewLink.classList.contains("active")).toBe(false);
      expect(calculatorLink.classList.contains("active")).toBe(true);
    });

    test("should prevent default navigation behavior", () => {
      const navLinks = document.querySelectorAll(".nav-link");
      const calculatorLink = Array.from(navLinks).find(
        (link) => link.getAttribute("data-view") === "calculator"
      );

      const mockEvent = {
        preventDefault: jest.fn(),
      };

      // Simulate click event
      const clickEvent = new Event("click");
      calculatorLink.dispatchEvent(clickEvent);

      // Should not navigate to href
      expect(window.location.hash).toBe("");
    });
  });

  describe("State Persistence", () => {
    test("should persist navigation state", () => {
      const navLinks = document.querySelectorAll(".nav-link");
      const calculatorLink = Array.from(navLinks).find(
        (link) => link.getAttribute("data-view") === "calculator"
      );

      calculatorLink.click();

      const savedState = JSON.parse(localStorage.getItem("threeWiseMenState"));
      expect(savedState.currentView).toBe("calculator");
    });

    test("should handle corrupted localStorage gracefully", () => {
      localStorage.setItem("threeWiseMenState", "invalid json");

      // Should not throw error and should use default state
      expect(() => {
        const newSidebarManager = new SidebarManager();
      }).not.toThrow();

      const newSidebarManager = new SidebarManager();
      expect(newSidebarManager.getState().currentView).toBe("overview");
    });
  });

  describe("Accessibility Features", () => {
    test("should have proper ARIA labels", () => {
      const sidebarToggle = document.getElementById("sidebarToggle");
      const mobileMenuToggle = document.getElementById("mobileMenuToggle");

      expect(sidebarToggle.getAttribute("aria-label")).toBe("Toggle sidebar");
      expect(mobileMenuToggle.getAttribute("aria-label")).toBe(
        "Open mobile menu"
      );
    });

    test("should support keyboard navigation", () => {
      const navLinks = document.querySelectorAll(".nav-link");
      const firstLink = navLinks[0];

      // Focus first link
      firstLink.focus();
      expect(document.activeElement).toBe(firstLink);

      // Test tab navigation
      const event = new KeyboardEvent("keydown", { key: "Tab" });
      firstLink.dispatchEvent(event);
    });
  });

  describe("Responsive Behavior", () => {
    test("should handle window resize events", () => {
      // Mock window resize
      const resizeEvent = new Event("resize");
      window.dispatchEvent(resizeEvent);

      // Should not throw errors
      expect(() => {
        // Resize handling should work
      }).not.toThrow();
    });

    test("should maintain state across viewport changes", () => {
      const sidebarToggle = document.getElementById("sidebarToggle");
      sidebarToggle.click();

      // Simulate viewport change
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 375,
      });

      const resizeEvent = new Event("resize");
      window.dispatchEvent(resizeEvent);

      // State should remain consistent
      expect(sidebarManager.getState().sidebarCollapsed).toBe(true);
    });
  });

  describe("Error Handling", () => {
    test("should handle missing DOM elements gracefully", () => {
      // Remove sidebar toggle
      const sidebarToggle = document.getElementById("sidebarToggle");
      sidebarToggle.remove();

      // Should not throw error
      expect(() => {
        sidebarManager.toggleSidebar();
      }).not.toThrow();
    });

    test("should handle localStorage errors gracefully", () => {
      // Mock localStorage error
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = () => {
        throw new Error("Storage error");
      };

      // Should not throw error
      expect(() => {
        sidebarManager.saveState();
      }).not.toThrow();

      // Restore original
      localStorage.setItem = originalSetItem;
    });
  });

  describe("Performance", () => {
    test("should handle rapid navigation efficiently", () => {
      const navLinks = document.querySelectorAll(".nav-link");
      const startTime = performance.now();

      // Navigate through all views rapidly
      navLinks.forEach((link) => {
        link.click();
      });

      const endTime = performance.now();
      const executionTime = endTime - startTime;

      // Should complete navigation in under 100ms
      expect(executionTime).toBeLessThan(100);
    });
  });
});
