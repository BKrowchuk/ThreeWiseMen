/**
 * End-to-End Tests for ThreeWiseMen Application
 * Tests the complete user flow from dashboard to calculator usage
 */

// Mock browser environment for E2E testing
const mockBrowser = {
  localStorage: {
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
  },
  history: {
    pushState: jest.fn(),
    replaceState: jest.fn(),
  },
  location: {
    hash: "",
  },
};

// E2E Test Suite
describe("ThreeWiseMen E2E User Flow", () => {
  let app;
  let testContainer;

  beforeEach(() => {
    // Setup test environment
    testContainer = document.createElement("div");
    testContainer.id = "test-container";
    document.body.appendChild(testContainer);

    // Mock browser APIs
    Object.defineProperty(window, "localStorage", {
      value: mockBrowser.localStorage,
      writable: true,
    });

    Object.defineProperty(window, "history", {
      value: mockBrowser.history,
      writable: true,
    });

    Object.defineProperty(window, "location", {
      value: mockBrowser.location,
      writable: true,
    });

    mockBrowser.localStorage.clear();
    mockBrowser.history.pushState.mockClear();

    // Create app HTML structure
    testContainer.innerHTML = `
            <div class="app-container">
                <aside class="sidebar" id="sidebar">
                    <div class="sidebar-header">
                        <h2 class="app-title">ThreeWiseMen</h2>
                        <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                    </div>
                    
                    <nav class="sidebar-nav">
                        <ul class="nav-list">
                            <li class="nav-item">
                                <a href="#overview" class="nav-link active" data-view="overview">
                                    <i class="fas fa-tachometer-alt"></i>
                                    <span class="nav-text">Overview</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#calculator" class="nav-link" data-view="calculator">
                                    <i class="fas fa-calculator"></i>
                                    <span class="nav-text">Savings Calculator</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#budget" class="nav-link" data-view="budget">
                                    <i class="fas fa-chart-pie"></i>
                                    <span class="nav-text">Budget Planner</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#investments" class="nav-link" data-view="investments">
                                    <i class="fas fa-chart-line"></i>
                                    <span class="nav-text">Investments</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <main class="main-content">
                    <header class="top-header">
                        <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Open mobile menu">
                            <i class="fas fa-bars"></i>
                        </button>
                        <h1 class="page-title">Dashboard</h1>
                        <div class="user-actions">
                            <button class="btn btn-secondary" aria-label="Settings">
                                <i class="fas fa-cog"></i>
                            </button>
                        </div>
                    </header>

                    <div class="content-area">
                        <div id="overview" class="view active">
                            <div class="dashboard-grid">
                                <div class="welcome-section">
                                    <h2>Welcome to ThreeWiseMen</h2>
                                    <p>Your comprehensive financial planning dashboard</p>
                                </div>
                                
                                <div class="quick-stats">
                                    <div class="stat-card">
                                        <div class="stat-icon">
                                            <i class="fas fa-piggy-bank"></i>
                                        </div>
                                        <div class="stat-content">
                                            <h3>Current Savings</h3>
                                            <p class="stat-value">$<span id="currentSavings">0</span></p>
                                        </div>
                                    </div>
                                    
                                    <div class="stat-card">
                                        <div class="stat-icon">
                                            <i class="fas fa-target"></i>
                                        </div>
                                        <div class="stat-content">
                                            <h3>Monthly Goal</h3>
                                            <p class="stat-value">$<span id="monthlyGoal">0</span></p>
                                        </div>
                                    </div>
                                    
                                    <div class="stat-card">
                                        <div class="stat-icon">
                                            <i class="fas fa-calendar-check"></i>
                                        </div>
                                        <div class="stat-content">
                                            <h3>Timeline</h3>
                                            <p class="stat-value"><span id="timeline">0</span> months</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="module-cards">
                                    <div class="module-card" data-view="calculator">
                                        <div class="card-icon">
                                            <i class="fas fa-calculator"></i>
                                        </div>
                                        <h3>Savings Calculator</h3>
                                        <p>Plan your down payment and savings goals</p>
                                        <button class="btn btn-primary">Open Calculator</button>
                                    </div>
                                    
                                    <div class="module-card" data-view="budget">
                                        <div class="card-icon">
                                            <i class="fas fa-chart-pie"></i>
                                        </div>
                                        <h3>Budget Planner</h3>
                                        <p>Track income, expenses, and budget categories</p>
                                        <button class="btn btn-secondary">Coming Soon</button>
                                    </div>
                                    
                                    <div class="module-card" data-view="investments">
                                        <div class="card-icon">
                                            <i class="fas fa-chart-line"></i>
                                        </div>
                                        <h3>Investment Tracker</h3>
                                        <p>Monitor portfolio performance and growth</p>
                                        <button class="btn btn-secondary">Coming Soon</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="calculator" class="view">
                            <div class="calculator-container">
                                <div class="calculator-header">
                                    <h2>Savings Target Calculator</h2>
                                    <p>Calculate how much you need to save monthly to reach your down payment goal</p>
                                </div>
                                
                                <div class="calculator-content">
                                    <div class="calculator-form">
                                        <div class="form-group">
                                            <label for="targetAmount">Target Down Payment Amount ($)</label>
                                            <input type="number" id="targetAmount" placeholder="50000" min="0" step="1000">
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="currentSavings">Current Savings ($)</label>
                                            <input type="number" id="currentSavingsInput" placeholder="10000" min="0" step="1000">
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="timeline">Timeline</label>
                                            <div class="timeline-inputs">
                                                <input type="number" id="timelineValue" placeholder="12" min="1" step="1">
                                                <select id="timelineUnit">
                                                    <option value="months">Months</option>
                                                    <option value="years">Years</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="monthlyIncome">Monthly Income (Optional)</label>
                                            <input type="number" id="monthlyIncome" placeholder="5000" min="0" step="100">
                                        </div>
                                    </div>
                                    
                                    <div class="calculator-results">
                                        <div class="result-card primary">
                                            <h3>Required Monthly Savings</h3>
                                            <div class="result-value" id="monthlySavingsResult">$0</div>
                                            <p class="result-description">Amount you need to save each month</p>
                                        </div>
                                        
                                        <div class="result-card">
                                            <h3>Total to Save</h3>
                                            <div class="result-value" id="totalToSaveResult">$0</div>
                                            <p class="result-description">Remaining amount after current savings</p>
                                        </div>
                                        
                                        <div class="result-card">
                                            <h3>Savings Rate</h3>
                                            <div class="result-value" id="savingsRateResult">0%</div>
                                            <p class="result-description">Percentage of income needed</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="progress-section">
                                    <h3>Progress Visualization</h3>
                                    <div class="progress-bar">
                                        <div class="progress-fill" id="progressFill"></div>
                                    </div>
                                    <div class="progress-labels">
                                        <span>Current: $<span id="progressCurrent">0</span></span>
                                        <span>Target: $<span id="progressTarget">0</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="budget" class="view">
                            <div class="placeholder-content">
                                <i class="fas fa-chart-pie"></i>
                                <h2>Budget Planner</h2>
                                <p>This module is coming soon. Stay tuned for comprehensive budget tracking and planning features.</p>
                            </div>
                        </div>

                        <div id="investments" class="view">
                            <div class="placeholder-content">
                                <i class="fas fa-chart-line"></i>
                                <h2>Investment Tracker</h2>
                                <p>This module is coming soon. Track your portfolio performance and investment growth.</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `;

    // Initialize the app
    app = new ThreeWiseMenApp();
  });

  afterEach(() => {
    // Cleanup
    if (testContainer && testContainer.parentNode) {
      testContainer.parentNode.removeChild(testContainer);
    }
    testContainer = null;
    app = null;
  });

  describe("Complete User Journey: Dashboard to Calculator", () => {
    test("should display overview dashboard by default", () => {
      // Verify overview is active
      const overviewView = document.getElementById("overview");
      expect(overviewView.classList.contains("active")).toBe(true);

      // Verify page title
      const pageTitle = document.querySelector(".page-title");
      expect(pageTitle.textContent).toBe("Dashboard");

      // Verify welcome message
      const welcomeSection = document.querySelector(".welcome-section h2");
      expect(welcomeSection.textContent).toBe("Welcome to ThreeWiseMen");

      // Verify module cards are present
      const moduleCards = document.querySelectorAll(".module-card");
      expect(moduleCards).toHaveLength(3);
    });

    test("should navigate to calculator from dashboard module card", () => {
      // Find and click the calculator module card button
      const calculatorCard = document.querySelector(
        '.module-card[data-view="calculator"]'
      );
      const openButton = calculatorCard.querySelector(".btn-primary");

      openButton.click();

      // Verify navigation to calculator view
      const calculatorView = document.getElementById("calculator");
      expect(calculatorView.classList.contains("active")).toBe(true);

      // Verify overview is no longer active
      const overviewView = document.getElementById("overview");
      expect(overviewView.classList.contains("active")).toBe(false);

      // Verify page title updated
      const pageTitle = document.querySelector(".page-title");
      expect(pageTitle.textContent).toBe("Savings Calculator");

      // Verify URL updated
      expect(window.history.pushState).toHaveBeenCalledWith(
        { view: "calculator" },
        "",
        "#calculator"
      );
    });

    test("should navigate to calculator from sidebar navigation", () => {
      // Find and click the calculator navigation link
      const calculatorNavLink = document.querySelector(
        '.nav-link[data-view="calculator"]'
      );
      calculatorNavLink.click();

      // Verify navigation to calculator view
      const calculatorView = document.getElementById("calculator");
      expect(calculatorView.classList.contains("active")).toBe(true);

      // Verify navigation state updated
      expect(app.getState().currentView).toBe("calculator");
    });

    test("should display calculator form with all required inputs", () => {
      // Navigate to calculator
      const calculatorNavLink = document.querySelector(
        '.nav-link[data-view="calculator"]'
      );
      calculatorNavLink.click();

      // Verify all form inputs are present
      const targetAmountInput = document.getElementById("targetAmount");
      const currentSavingsInput = document.getElementById(
        "currentSavingsInput"
      );
      const timelineValueInput = document.getElementById("timelineValue");
      const timelineUnitSelect = document.getElementById("timelineUnit");
      const monthlyIncomeInput = document.getElementById("monthlyIncome");

      expect(targetAmountInput).toBeTruthy();
      expect(currentSavingsInput).toBeTruthy();
      expect(timelineValueInput).toBeTruthy();
      expect(timelineUnitSelect).toBeTruthy();
      expect(monthlyIncomeInput).toBeTruthy();

      // Verify form labels
      const labels = document.querySelectorAll(".form-group label");
      expect(labels[0].textContent).toContain("Target Down Payment Amount");
      expect(labels[1].textContent).toContain("Current Savings");
      expect(labels[2].textContent).toContain("Timeline");
      expect(labels[3].textContent).toContain("Monthly Income");
    });

    test("should calculate savings correctly when user inputs data", () => {
      // Navigate to calculator
      const calculatorNavLink = document.querySelector(
        '.nav-link[data-view="calculator"]'
      );
      calculatorNavLink.click();

      // Input test data
      const targetAmountInput = document.getElementById("targetAmount");
      const currentSavingsInput = document.getElementById(
        "currentSavingsInput"
      );
      const timelineValueInput = document.getElementById("timelineValue");
      const monthlyIncomeInput = document.getElementById("monthlyIncome");

      targetAmountInput.value = "50000";
      currentSavingsInput.value = "10000";
      timelineValueInput.value = "12";
      monthlyIncomeInput.value = "5000";

      // Trigger input event to update calculations
      targetAmountInput.dispatchEvent(new Event("input"));

      // Verify calculations are displayed
      const monthlySavingsResult = document.getElementById(
        "monthlySavingsResult"
      );
      const totalToSaveResult = document.getElementById("totalToSaveResult");
      const savingsRateResult = document.getElementById("savingsRateResult");

      // Wait for calculations to update
      setTimeout(() => {
        expect(monthlySavingsResult.textContent).toBe("$3,333");
        expect(totalToSaveResult.textContent).toBe("$40,000");
        expect(savingsRateResult.textContent).toBe("66.7%");
      }, 100);
    });

    test("should update progress bar based on current vs target savings", () => {
      // Navigate to calculator
      const calculatorNavLink = document.querySelector(
        '.nav-link[data-view="calculator"]'
      );
      calculatorNavLink.click();

      // Input data
      const targetAmountInput = document.getElementById("targetAmount");
      const currentSavingsInput = document.getElementById(
        "currentSavingsInput"
      );

      targetAmountInput.value = "50000";
      currentSavingsInput.value = "25000";

      // Trigger input event
      targetAmountInput.dispatchEvent(new Event("input"));

      // Verify progress bar updates
      setTimeout(() => {
        const progressFill = document.getElementById("progressFill");
        const progressCurrent = document.getElementById("progressCurrent");
        const progressTarget = document.getElementById("progressTarget");

        expect(progressFill.style.width).toBe("50%");
        expect(progressCurrent.textContent).toBe("25,000");
        expect(progressTarget.textContent).toBe("50,000");
      }, 100);
    });

    test("should update dashboard stats when calculator data changes", () => {
      // Navigate to calculator and input data
      const calculatorNavLink = document.querySelector(
        '.nav-link[data-view="calculator"]'
      );
      calculatorNavLink.click();

      const targetAmountInput = document.getElementById("targetAmount");
      const currentSavingsInput = document.getElementById(
        "currentSavingsInput"
      );
      const timelineValueInput = document.getElementById("timelineValue");

      targetAmountInput.value = "60000";
      currentSavingsInput.value = "15000";
      timelineValueInput.value = "18";

      targetAmountInput.dispatchEvent(new Event("input"));

      // Navigate back to overview
      const overviewNavLink = document.querySelector(
        '.nav-link[data-view="overview"]'
      );
      overviewNavLink.click();

      // Verify dashboard stats are updated
      setTimeout(() => {
        const currentSavingsDisplay = document.getElementById("currentSavings");
        const monthlyGoalDisplay = document.getElementById("monthlyGoal");
        const timelineDisplay = document.getElementById("timeline");

        expect(currentSavingsDisplay.textContent).toBe("15,000");
        expect(monthlyGoalDisplay.textContent).toBe("2,500");
        expect(timelineDisplay.textContent).toBe("18");
      }, 100);
    });

    test("should persist calculator data across navigation", () => {
      // Navigate to calculator and input data
      const calculatorNavLink = document.querySelector(
        '.nav-link[data-view="calculator"]'
      );
      calculatorNavLink.click();

      const targetAmountInput = document.getElementById("targetAmount");
      targetAmountInput.value = "75000";
      targetAmountInput.dispatchEvent(new Event("change"));

      // Navigate away and back
      const overviewNavLink = document.querySelector(
        '.nav-link[data-view="overview"]'
      );
      overviewNavLink.click();

      const calculatorNavLink2 = document.querySelector(
        '.nav-link[data-view="calculator"]'
      );
      calculatorNavLink2.click();

      // Verify data persisted
      const targetAmountInput2 = document.getElementById("targetAmount");
      expect(targetAmountInput2.value).toBe("75000");
    });

    test("should handle sidebar collapse/expand functionality", () => {
      const sidebar = document.getElementById("sidebar");
      const sidebarToggle = document.getElementById("sidebarToggle");

      // Initially expanded
      expect(sidebar.classList.contains("collapsed")).toBe(false);

      // Click toggle to collapse
      sidebarToggle.click();
      expect(sidebar.classList.contains("collapsed")).toBe(true);

      // Click toggle to expand
      sidebarToggle.click();
      expect(sidebar.classList.contains("collapsed")).toBe(false);

      // Verify state persisted
      const savedState = JSON.parse(localStorage.getItem("threeWiseMenState"));
      expect(savedState.sidebarCollapsed).toBe(false);
    });

    test("should support keyboard shortcuts for navigation", () => {
      // Test number key navigation
      const keyEvent1 = new KeyboardEvent("keydown", { key: "2" });
      document.dispatchEvent(keyEvent1);

      // Should navigate to calculator (view 2)
      expect(app.getState().currentView).toBe("calculator");

      // Test Ctrl+B for sidebar toggle
      const keyEvent2 = new KeyboardEvent("keydown", {
        key: "b",
        ctrlKey: true,
      });
      document.dispatchEvent(keyEvent2);

      const sidebar = document.getElementById("sidebar");
      expect(sidebar.classList.contains("collapsed")).toBe(true);
    });

    test("should handle mobile responsive behavior", () => {
      // Mock mobile viewport
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 375,
      });

      // Trigger resize event
      const resizeEvent = new Event("resize");
      window.dispatchEvent(resizeEvent);

      // Verify mobile menu toggle is visible
      const mobileMenuToggle = document.getElementById("mobileMenuToggle");
      expect(mobileMenuToggle.style.display).not.toBe("none");

      // Test mobile menu toggle
      mobileMenuToggle.click();
      const sidebar = document.getElementById("sidebar");
      expect(sidebar.classList.contains("mobile-open")).toBe(true);
    });

    test("should complete full user workflow successfully", () => {
      // 1. Start at dashboard
      expect(
        document.getElementById("overview").classList.contains("active")
      ).toBe(true);

      // 2. Navigate to calculator
      const calculatorNavLink = document.querySelector(
        '.nav-link[data-view="calculator"]'
      );
      calculatorNavLink.click();
      expect(
        document.getElementById("calculator").classList.contains("active")
      ).toBe(true);

      // 3. Input savings goal data
      const targetAmountInput = document.getElementById("targetAmount");
      const currentSavingsInput = document.getElementById(
        "currentSavingsInput"
      );
      const timelineValueInput = document.getElementById("timelineValue");
      const monthlyIncomeInput = document.getElementById("monthlyIncome");

      targetAmountInput.value = "100000";
      currentSavingsInput.value = "20000";
      timelineValueInput.value = "24";
      monthlyIncomeInput.value = "8000";

      // 4. Verify calculations update
      targetAmountInput.dispatchEvent(new Event("input"));

      setTimeout(() => {
        const monthlySavingsResult = document.getElementById(
          "monthlySavingsResult"
        );
        expect(monthlySavingsResult.textContent).toBe("$3,333");

        // 5. Navigate back to dashboard
        const overviewNavLink = document.querySelector(
          '.nav-link[data-view="overview"]'
        );
        overviewNavLink.click();

        // 6. Verify dashboard reflects calculator data
        const currentSavingsDisplay = document.getElementById("currentSavings");
        const monthlyGoalDisplay = document.getElementById("monthlyGoal");
        const timelineDisplay = document.getElementById("timeline");

        expect(currentSavingsDisplay.textContent).toBe("20,000");
        expect(monthlyGoalDisplay.textContent).toBe("3,333");
        expect(timelineDisplay.textContent).toBe("24");
      }, 100);
    });
  });

  describe("Error Handling and Edge Cases", () => {
    test("should handle invalid calculator inputs gracefully", () => {
      // Navigate to calculator
      const calculatorNavLink = document.querySelector(
        '.nav-link[data-view="calculator"]'
      );
      calculatorNavLink.click();

      // Input invalid data
      const targetAmountInput = document.getElementById("targetAmount");
      targetAmountInput.value = "abc";
      targetAmountInput.dispatchEvent(new Event("input"));

      // Should not crash and should show $0 results
      const monthlySavingsResult = document.getElementById(
        "monthlySavingsResult"
      );
      expect(monthlySavingsResult.textContent).toBe("$0");
    });

    test("should handle zero and negative values appropriately", () => {
      // Navigate to calculator
      const calculatorNavLink = document.querySelector(
        '.nav-link[data-view="calculator"]'
      );
      calculatorNavLink.click();

      // Test zero target
      const targetAmountInput = document.getElementById("targetAmount");
      targetAmountInput.value = "0";
      targetAmountInput.dispatchEvent(new Event("input"));

      const monthlySavingsResult = document.getElementById(
        "monthlySavingsResult"
      );
      expect(monthlySavingsResult.textContent).toBe("$0");

      // Test negative current savings
      const currentSavingsInput = document.getElementById(
        "currentSavingsInput"
      );
      currentSavingsInput.value = "-5000";
      currentSavingsInput.dispatchEvent(new Event("input"));

      // Should calculate based on absolute difference
      expect(monthlySavingsResult.textContent).toBe("$0");
    });

    test("should maintain application state during rapid navigation", () => {
      // Rapidly navigate between views
      const navLinks = document.querySelectorAll(".nav-link");

      navLinks.forEach((link) => {
        link.click();
      });

      // Should end up at last clicked view
      const lastLink = navLinks[navLinks.length - 1];
      const expectedView = lastLink.getAttribute("data-view");
      expect(app.getState().currentView).toBe(expectedView);
    });
  });
});
