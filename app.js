/**
 * ThreeWiseMen - Financial Planning Dashboard
 * Main Application JavaScript
 */

class ThreeWiseMenApp {
  constructor() {
    this.state = {
      sidebarCollapsed: false,
      currentView: "overview",
      calculatorData: {
        propertyPrice: 0,
        downPaymentMode: "dollar",
        downPaymentAmount: 0,
        downPaymentPercentage: 20,
        closingCosts: 3,
        existingSavings: 0,
        timeline: 24,
        monthlyIncome: 0,
      },
    };

    this.init();
  }

  init() {
    this.loadState();
    this.setupEventListeners();
    this.setupInputFormatting();
    this.setupRouting();
    this.initializeCalculator();
    this.updateDashboardStats();
    this.updatePageTitle();
  }

  // State Management
  saveState() {
    localStorage.setItem("threeWiseMenState", JSON.stringify(this.state));
  }

  loadState() {
    const savedState = localStorage.getItem("threeWiseMenState");
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        this.state = { ...this.state, ...parsedState };

        // Apply saved sidebar state
        if (this.state.sidebarCollapsed) {
          this.toggleSidebar();
        }
      } catch (error) {
        console.warn("Failed to load saved state:", error);
      }
    }
  }

  // Event Listeners
  setupEventListeners() {
    // Sidebar toggle
    const sidebarToggle = document.getElementById("sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => this.toggleSidebar());
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener("click", () => this.toggleMobileMenu());
    }

    // Navigation links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const view = link.getAttribute("data-view");
        this.navigateToView(view);
      });
    });

    // Module card buttons
    const moduleCards = document.querySelectorAll(".module-card");
    moduleCards.forEach((card) => {
      const button = card.querySelector(".btn");
      if (button && button.textContent === "Open Calculator") {
        button.addEventListener("click", () =>
          this.navigateToView("calculator")
        );
      }
    });

    // Calculator form inputs
    this.setupCalculatorEventListeners();

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) =>
      this.handleKeyboardShortcuts(e)
    );

    // Window resize
    window.addEventListener("resize", () => this.handleResize());
  }

  setupCalculatorEventListeners() {
    const inputs = [
      "propertyPrice",
      "downPaymentAmount",
      "downPaymentPercentage",
      "closingCosts",
      "existingSavings",
      "timelineValue",
      "monthlyIncome",
    ];

    inputs.forEach((inputId) => {
      const input = document.getElementById(inputId);
      if (input) {
        // Remove real-time calculation on input
        // Only save data when input changes
        input.addEventListener("change", () => this.saveCalculatorData());
      }
    });

    // Handle down payment mode toggle
    const downPaymentModes = document.querySelectorAll(
      'input[name="downPaymentMode"]'
    );
    downPaymentModes.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        this.state.calculatorData.downPaymentMode = e.target.value;
        this.toggleDownPaymentInputs();
        this.updateTabIndexOrder();
        // Don't trigger calculation automatically - wait for Calculate button
        // this.updateCalculator();
        this.saveCalculatorData();
      });
    });

    // Handle calculate button
    const calculateBtn = document.getElementById("calculateBtn");
    if (calculateBtn) {
      calculateBtn.addEventListener("click", () => this.updateCalculator());
    }

    // Handle reset form button
    const resetFormBtn = document.getElementById("resetForm");
    if (resetFormBtn) {
      resetFormBtn.addEventListener("click", () => this.resetCalculatorForm());
    }

    // Initialize down payment inputs
    this.toggleDownPaymentInputs();
  }

  toggleDownPaymentInputs() {
    const downPaymentAmountContainer = document.querySelector(
      ".form-group.currency-input"
    );
    const downPaymentPercentageContainer = document.querySelector(
      ".form-group.percentage-input"
    );

    if (this.state.calculatorData.downPaymentMode === "dollar") {
      if (downPaymentAmountContainer)
        downPaymentAmountContainer.style.display = "block";
      if (downPaymentPercentageContainer)
        downPaymentPercentageContainer.style.display = "none";
    } else {
      if (downPaymentAmountContainer)
        downPaymentAmountContainer.style.display = "none";
      if (downPaymentPercentageContainer)
        downPaymentPercentageContainer.style.display = "block";
    }
  }

  // Sidebar Management
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

  // Navigation and Routing
  setupRouting() {
    // Handle browser back/forward
    window.addEventListener("popstate", (e) => {
      if (e.state && e.state.view) {
        this.showView(e.state.view);
      }
    });

    // Set initial view
    this.showView(this.state.currentView);
  }

  navigateToView(view) {
    this.state.currentView = view;
    this.showView(view);
    this.updatePageTitle();
    this.saveState();

    // Update URL without page reload
    const url = `#${view}`;
    window.history.pushState({ view }, "", url);

    // Update active navigation
    this.updateActiveNavigation(view);
  }

  showView(view) {
    // Hide all views
    const views = document.querySelectorAll(".view");
    views.forEach((v) => v.classList.remove("active"));

    // Show target view
    const targetView = document.getElementById(view);
    if (targetView) {
      targetView.classList.add("active");
    }

    // Update page title
    this.updatePageTitle();

    // Update active navigation
    this.updateActiveNavigation(view);

    // Special handling for calculator view
    if (view === "calculator") {
      this.initializeCalculatorView();
    }
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

  updatePageTitle() {
    const pageTitle = document.querySelector(".page-title");
    if (pageTitle) {
      const titles = {
        overview: "Dashboard",
        calculator: "Savings Calculator",
        budget: "Budget Planner",
        investments: "Investment Tracker",
      };
      pageTitle.textContent = titles[this.state.currentView] || "Dashboard";
    }
  }

  // Calculator Functionality
  initializeCalculator() {
    // Load saved calculator data
    this.loadCalculatorData();

    // Set initial values
    this.updateCalculatorInputs();

    // Don't perform initial calculation - wait for Calculate button click
    // this.updateCalculator();
  }

  loadCalculatorData() {
    const savedData = localStorage.getItem("threeWiseMenCalculatorData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        this.state.calculatorData = {
          ...this.state.calculatorData,
          ...parsedData,
        };
      } catch (error) {
        console.warn("Failed to load calculator data:", error);
      }
    }
  }

  saveCalculatorData() {
    // Update state from form inputs
    this.state.calculatorData.propertyPrice =
      parseFloat(document.getElementById("propertyPrice")?.value) || 0;
    this.state.calculatorData.downPaymentAmount =
      parseFloat(document.getElementById("downPaymentAmount")?.value) || 0;
    this.state.calculatorData.downPaymentPercentage =
      parseFloat(document.getElementById("downPaymentPercentage")?.value) || 0;
    this.state.calculatorData.closingCosts =
      parseFloat(document.getElementById("closingCosts")?.value) || 0;
    this.state.calculatorData.existingSavings =
      parseFloat(document.getElementById("existingSavings")?.value) || 0;
    this.state.calculatorData.timeline =
      parseInt(document.getElementById("timelineValue")?.value) || 12;
    this.state.calculatorData.monthlyIncome =
      parseFloat(document.getElementById("monthlyIncome")?.value) || 0;

    // Save to localStorage
    localStorage.setItem(
      "threeWiseMenCalculatorData",
      JSON.stringify(this.state.calculatorData)
    );

    // Update dashboard stats
    this.updateDashboardStats();
  }

  updateCalculatorInputs() {
    const data = this.state.calculatorData;

    const propertyPriceInput = document.getElementById("propertyPrice");
    const downPaymentAmountInput = document.getElementById("downPaymentAmount");
    const downPaymentPercentageInput = document.getElementById(
      "downPaymentPercentage"
    );
    const closingCostsInput = document.getElementById("closingCosts");
    const existingSavingsInput = document.getElementById("existingSavings");
    const timelineValueInput = document.getElementById("timelineValue");
    const monthlyIncomeInput = document.getElementById("monthlyIncome");

    if (propertyPriceInput) propertyPriceInput.value = data.propertyPrice;
    if (downPaymentAmountInput)
      downPaymentAmountInput.value = data.downPaymentAmount;
    if (downPaymentPercentageInput)
      downPaymentPercentageInput.value = data.downPaymentPercentage;
    if (closingCostsInput) closingCostsInput.value = data.closingCosts;
    if (existingSavingsInput) existingSavingsInput.value = data.existingSavings;
    if (timelineValueInput) timelineValueInput.value = data.timeline;
    if (monthlyIncomeInput) monthlyIncomeInput.value = data.monthlyIncome;

    // Set the correct down payment mode radio button
    const downPaymentModes = document.querySelectorAll(
      'input[name="downPaymentMode"]'
    );
    downPaymentModes.forEach((radio) => {
      if (radio.value === data.downPaymentMode) {
        radio.checked = true;
      }
    });

    this.toggleDownPaymentInputs();
  }

  updateCalculator() {
    const data = this.state.calculatorData;

    // Get current input values
    const propertyPrice =
      parseFloat(document.getElementById("propertyPrice")?.value) || 0;
    const downPaymentMode = data.downPaymentMode;
    const downPaymentAmount =
      parseFloat(document.getElementById("downPaymentAmount")?.value) || 0;
    const downPaymentPercentage =
      parseFloat(document.getElementById("downPaymentPercentage")?.value) || 0;
    const closingCosts =
      parseFloat(document.getElementById("closingCosts")?.value) || 0;
    const existingSavings =
      parseFloat(document.getElementById("existingSavings")?.value) || 0;
    const timeline =
      parseInt(document.getElementById("timelineValue")?.value) || 0;
    const monthlyIncome =
      parseFloat(document.getElementById("monthlyIncome")?.value) || 0;

    // Update state with current values
    this.state.calculatorData = {
      ...this.state.calculatorData,
      propertyPrice,
      downPaymentAmount,
      downPaymentPercentage,
      closingCosts,
      existingSavings,
      timeline,
      monthlyIncome,
    };

    // Validate inputs
    const validationErrors = this.validateCalculatorInputs();
    this.showValidationErrors(validationErrors);

    // If there are validation errors, don't proceed with calculations
    if (validationErrors.length > 0) {
      return;
    }

    // Calculate down payment amount based on mode
    let actualDownPayment = 0;
    if (downPaymentMode === "dollar") {
      actualDownPayment = downPaymentAmount;
    } else {
      actualDownPayment = (propertyPrice * downPaymentPercentage) / 100;
    }

    // Calculate closing costs
    const actualClosingCosts = (propertyPrice * closingCosts) / 100;

    // Calculate total needed
    const totalNeeded =
      actualDownPayment + actualClosingCosts - existingSavings;

    // Calculate monthly target
    const monthlyTarget = timeline > 0 ? totalNeeded / timeline : 0;

    // Calculate savings rate
    const savingsRate =
      monthlyIncome > 0 ? (monthlyTarget / monthlyIncome) * 100 : 0;

    // Update results
    this.updateCalculatorResults(monthlyTarget, totalNeeded, savingsRate);

    // Update calculation breakdown
    this.updateCalculationBreakdown(
      propertyPrice,
      actualDownPayment,
      actualClosingCosts,
      existingSavings,
      totalNeeded
    );

    // Update progress bar
    this.updateProgressBar(existingSavings, totalNeeded + existingSavings);

    // Update dashboard stats
    this.updateDashboardStats();
  }

  updateCalculatorResults(monthlyTarget, totalNeeded, savingsRate) {
    const monthlyTargetResult = document.getElementById("monthlyTarget");
    const totalNeededResult = document.getElementById("totalNeeded");
    const savingsRateResult = document.getElementById("savingsRate");

    if (monthlyTargetResult) {
      monthlyTargetResult.textContent = this.formatCurrency(monthlyTarget);
    }

    if (totalNeededResult) {
      totalNeededResult.textContent = this.formatCurrency(totalNeeded);
    }

    if (savingsRateResult) {
      savingsRateResult.textContent = `${savingsRate.toFixed(1)}%`;
    }
  }

  updateProgressBar(current, target) {
    const progressFill = document.getElementById("progressFill");
    const progressCurrent = document.getElementById("progressCurrent");
    const progressTarget = document.getElementById("progressTarget");

    if (progressFill && progressCurrent && progressTarget) {
      const percentage =
        target > 0 ? Math.min((current / target) * 100, 100) : 0;
      progressFill.style.width = `${percentage}%`;
      progressCurrent.textContent = this.formatCurrency(current);
      progressTarget.textContent = this.formatCurrency(target);
    }
  }

  updateDashboardStats() {
    const data = this.state.calculatorData;

    // Update current savings display
    const currentSavingsDisplay = document.getElementById("currentSavings");
    if (currentSavingsDisplay) {
      currentSavingsDisplay.textContent = this.formatCurrency(
        data.existingSavings
      );
    }

    // Calculate and update monthly goal
    const actualDownPayment =
      data.downPaymentMode === "dollar"
        ? data.downPaymentAmount
        : (data.propertyPrice * data.downPaymentPercentage) / 100;
    const actualClosingCosts = (data.propertyPrice * data.closingCosts) / 100;
    const totalNeeded =
      actualDownPayment + actualClosingCosts - data.existingSavings;
    const monthlyGoal = data.timeline > 0 ? totalNeeded / data.timeline : 0;

    const monthlyGoalDisplay = document.getElementById("monthlyGoal");
    if (monthlyGoalDisplay) {
      monthlyGoalDisplay.textContent = this.formatCurrency(monthlyGoal);
    }

    // Update timeline display
    const timelineDisplay = document.getElementById("timeline");
    if (timelineDisplay) {
      timelineDisplay.textContent = data.timeline;
    }
  }

  updateCalculationBreakdown(
    propertyPrice,
    downPayment,
    closingCosts,
    existingSavings,
    totalNeeded
  ) {
    const breakdownPropertyPrice = document.getElementById(
      "breakdownPropertyPrice"
    );
    const breakdownDownPayment = document.getElementById(
      "breakdownDownPayment"
    );
    const breakdownClosingCosts = document.getElementById(
      "breakdownClosingCosts"
    );
    const breakdownExistingSavings = document.getElementById(
      "breakdownExistingSavings"
    );
    const breakdownTotalNeeded = document.getElementById(
      "breakdownTotalNeeded"
    );

    if (breakdownPropertyPrice) {
      breakdownPropertyPrice.textContent = this.formatCurrency(propertyPrice);
    }

    if (breakdownDownPayment) {
      breakdownDownPayment.textContent = this.formatCurrency(downPayment);
    }

    if (breakdownClosingCosts) {
      breakdownClosingCosts.textContent = this.formatCurrency(closingCosts);
    }

    if (breakdownExistingSavings) {
      breakdownExistingSavings.textContent =
        this.formatCurrency(existingSavings);
    }

    if (breakdownTotalNeeded) {
      breakdownTotalNeeded.textContent = this.formatCurrency(totalNeeded);
    }
  }

  // Utility Functions
  formatCurrency(amount) {
    if (isNaN(amount) || amount === 0) return "$0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  formatPercentage(value) {
    if (isNaN(value) || value === 0) return "0%";
    return `${value.toFixed(1)}%`;
  }

  formatNumber(value) {
    if (isNaN(value) || value === 0) return "0";
    return new Intl.NumberFormat("en-US").format(value);
  }

  // Enhanced input formatting and form control
  setupInputFormatting() {
    // Currency inputs (text type with currency formatting)
    const currencyInputs = document.querySelectorAll(
      'input[data-input-type="currency"]'
    );
    currencyInputs.forEach((input) => {
      this.setupCurrencyInput(input);
    });

    // Percentage inputs (number type with percentage formatting)
    const percentageInputs = document.querySelectorAll(
      'input[data-input-type="percentage"]'
    );
    percentageInputs.forEach((input) => {
      this.setupPercentageInput(input);
    });

    // Integer inputs (number type with integer validation)
    const integerInputs = document.querySelectorAll(
      'input[data-input-type="integer"]'
    );
    integerInputs.forEach((input) => {
      this.setupIntegerInput(input);
    });

    // Setup form navigation and prevent tab switching
    this.setupFormNavigation();
  }

  setupCurrencyInput(input) {
    // Prevent default browser number input behaviors
    input.addEventListener("keydown", (e) => {
      this.handleCurrencyKeydown(e);
    });

    // Handle input formatting
    input.addEventListener("input", (e) => {
      this.handleCurrencyInput(e);
      this.validateInput(e.target);
    });

    // Format on blur
    input.addEventListener("blur", (e) => {
      this.formatCurrencyInput(e.target);
      this.validateInput(e.target);
    });

    // Clear formatting on focus
    input.addEventListener("focus", (e) => {
      this.clearCurrencyFormatting(e.target);
    });

    // Prevent tab switching on number input
    input.addEventListener("keypress", (e) => {
      if (e.key === "Tab") {
        e.stopPropagation();
      }
    });
  }

  setupPercentageInput(input) {
    // Prevent tab switching and handle percentage input
    input.addEventListener("keydown", (e) => {
      this.handlePercentageKeydown(e);
    });

    // Handle input validation
    input.addEventListener("input", (e) => {
      this.validateInput(e.target);
    });

    // Format on blur
    input.addEventListener("blur", (e) => {
      this.formatPercentageInput(e.target);
      this.validateInput(e.target);
    });

    // Prevent tab switching
    input.addEventListener("keypress", (e) => {
      if (e.key === "Tab") {
        e.stopPropagation();
      }
    });
  }

  setupIntegerInput(input) {
    // Prevent tab switching and handle integer input
    input.addEventListener("keydown", (e) => {
      this.handleIntegerKeydown(e);
    });

    // Handle input validation
    input.addEventListener("input", (e) => {
      this.validateInput(e.target);
    });

    // Validate on blur
    input.addEventListener("blur", (e) => {
      this.validateInput(e.target);
    });

    // Prevent tab switching
    input.addEventListener("keypress", (e) => {
      if (e.key === "Tab") {
        e.stopPropagation();
      }
    });
  }

  setupFormNavigation() {
    const form = document.querySelector(".calculator-form");
    if (!form) return;

    // Handle Enter key to move to next field
    form.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.tagName === "INPUT") {
        e.preventDefault();
        this.moveToNextField(e.target);
      }
    });

    // Ensure Tab key only moves between form fields
    form.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        this.handleFormTab(e);
      }
    });
  }

  handleCurrencyKeydown(e) {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
    ];
    const isNumber = /[0-9]/.test(e.key);
    const isAllowed = allowedKeys.includes(e.key);

    if (!isNumber && !isAllowed) {
      e.preventDefault();
      return;
    }

    // Prevent tab switching on number input
    if (e.key === "Tab") {
      e.stopPropagation();
    }
  }

  handlePercentageKeydown(e) {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      ".",
    ];
    const isNumber = /[0-9]/.test(e.key);
    const isAllowed = allowedKeys.includes(e.key);

    if (!isNumber && !isAllowed) {
      e.preventDefault();
      return;
    }

    // Prevent tab switching
    if (e.key === "Tab") {
      e.stopPropagation();
    }
  }

  handleIntegerKeydown(e) {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
    ];
    const isNumber = /[0-9]/.test(e.key);
    const isAllowed = allowedKeys.includes(e.key);

    if (!isNumber && !isAllowed) {
      e.preventDefault();
      return;
    }

    // Prevent tab switching
    if (e.key === "Tab") {
      e.stopPropagation();
    }
  }

  handleCurrencyInput(e) {
    const input = e.target;
    let value = input.value.replace(/[^\d]/g, "");

    // Limit to reasonable length
    if (value.length > 10) {
      value = value.substring(0, 10);
    }

    input.value = value;
  }

  formatCurrencyInput(input) {
    const value = parseFloat(input.value);
    if (!isNaN(value) && value > 0) {
      input.value = this.formatNumber(value);
    }
  }

  clearCurrencyFormatting(input) {
    const value = input.value.replace(/[^\d]/g, "");
    input.value = value;
  }

  formatPercentageInput(input) {
    const value = parseFloat(input.value);
    if (!isNaN(value) && value >= 0) {
      input.value = value.toFixed(1);
    }
  }

  moveToNextField(currentInput) {
    const inputs = Array.from(
      document.querySelectorAll(
        '.calculator-form input[tabindex]:not([style*="display: none"])'
      )
    );
    const currentIndex = inputs.indexOf(currentInput);
    const nextIndex = (currentIndex + 1) % inputs.length;

    inputs[nextIndex].focus();

    // Add visual feedback for field transition
    inputs[nextIndex].classList.add("highlight");
    setTimeout(() => {
      inputs[nextIndex].classList.remove("highlight");
    }, 200);
  }

  handleFormTab(e) {
    const form = e.target.closest(".calculator-form");
    if (!form) return;

    const inputs = Array.from(
      form.querySelectorAll('input[tabindex]:not([style*="display: none"])')
    );
    const currentIndex = inputs.indexOf(e.target);

    if (e.shiftKey) {
      // Shift+Tab - move to previous field
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : inputs.length - 1;
      e.preventDefault();
      inputs[prevIndex].focus();
    } else {
      // Tab - move to next field
      const nextIndex = (currentIndex + 1) % inputs.length;
      e.preventDefault();
      inputs[nextIndex].focus();
    }
  }

  updateTabIndexOrder() {
    // Update tabindex values to ensure logical order when down payment mode changes
    const visibleInputs = document.querySelectorAll(
      '.calculator-form input[tabindex]:not([style*="display: none"])'
    );
    visibleInputs.forEach((input, index) => {
      input.setAttribute("tabindex", index + 1);
    });
  }

  // Enhanced input validation with real-time feedback
  validateInput(input) {
    const inputType = input.getAttribute("data-input-type");
    const value = input.value.trim();

    // Remove validation classes
    input.classList.remove("error", "valid");

    if (!value) {
      input.classList.add("error");
      return false;
    }

    switch (inputType) {
      case "currency":
        const currencyValue = parseFloat(value.replace(/[^\d]/g, ""));
        if (isNaN(currencyValue) || currencyValue <= 0) {
          input.classList.add("error");
          return false;
        }
        break;
      case "percentage":
        const percentageValue = parseFloat(value);
        if (
          isNaN(percentageValue) ||
          percentageValue < 0 ||
          percentageValue > 100
        ) {
          input.classList.add("error");
          return false;
        }
        break;
      case "integer":
        const integerValue = parseInt(value);
        if (isNaN(integerValue) || integerValue < 1) {
          input.classList.add("error");
          return false;
        }
        break;
    }

    input.classList.add("valid");
    return true;
  }

  // Initialize calculator view with proper setup
  initializeCalculatorView() {
    // Ensure proper tab order
    this.updateTabIndexOrder();

    // Focus first input for better UX
    const firstInput = document.querySelector(
      '.calculator-form input[tabindex="1"]'
    );
    if (firstInput) {
      firstInput.focus();
    }

    // Clear any existing validation states
    const inputs = document.querySelectorAll(".calculator-form input");
    inputs.forEach((input) => {
      input.classList.remove("error", "valid");
    });

    // Clear any existing validation errors
    const existingErrors = document.querySelectorAll(".validation-error");
    existingErrors.forEach((error) => error.remove());
  }

  // Keyboard Shortcuts
  handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + B to toggle sidebar
    if ((e.ctrlKey || e.metaKey) && e.key === "b") {
      e.preventDefault();
      this.toggleSidebar();
    }

    // Escape to close mobile menu
    if (e.key === "Escape") {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && sidebar.classList.contains("mobile-open")) {
        this.toggleMobileMenu();
      }
    }

    // Number keys for quick navigation
    if (e.key >= "1" && e.key <= "4" && !e.ctrlKey && !e.metaKey) {
      const views = ["overview", "calculator", "budget", "investments"];
      const viewIndex = parseInt(e.key) - 1;
      if (views[viewIndex]) {
        e.preventDefault();
        this.navigateToView(views[viewIndex]);
      }
    }
  }

  // Responsive Design
  handleResize() {
    // Auto-hide sidebar on small screens
    if (window.innerWidth <= 768) {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.classList.contains("mobile-open")) {
        sidebar.classList.remove("mobile-open");
      }
    }
  }

  // Public API for external access
  getState() {
    return { ...this.state };
  }

  setCalculatorData(data) {
    this.state.calculatorData = { ...this.state.calculatorData, ...data };
    this.updateCalculatorInputs();
    this.updateCalculator();
    this.saveCalculatorData();
  }

  // Error Handling
  handleError(error, context) {
    console.error(`Error in ${context}:`, error);

    // Show user-friendly error message
    this.showNotification("An error occurred. Please try again.", "error");
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            background-color: ${
              type === "error"
                ? "#ef4444"
                : type === "success"
                ? "#10b981"
                : "#2563eb"
            };
        `;

    // Add to page
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 5000);
  }

  resetCalculatorForm() {
    // Reset state to default values
    this.state.calculatorData = {
      propertyPrice: 0,
      downPaymentMode: "dollar",
      downPaymentAmount: 0,
      downPaymentPercentage: 20,
      closingCosts: 3,
      existingSavings: 0,
      timeline: 24,
      monthlyIncome: 0,
    };

    // Clear all form inputs and validation states
    const inputs = [
      "propertyPrice",
      "downPaymentAmount",
      "downPaymentPercentage",
      "closingCosts",
      "existingSavings",
      "timelineValue",
      "monthlyIncome",
    ];

    inputs.forEach((inputId) => {
      const input = document.getElementById(inputId);
      if (input) {
        input.value = "";
        input.classList.remove("error", "valid");
      }
    });

    // Reset down payment mode to dollar
    const dollarRadio = document.querySelector(
      'input[name="downPaymentMode"][value="dollar"]'
    );
    if (dollarRadio) {
      dollarRadio.checked = true;
    }

    // Set default values
    document.getElementById("downPaymentPercentage").value = "20";
    document.getElementById("closingCosts").value = "3";
    document.getElementById("timelineValue").value = "24";

    // Update display and tab order
    this.toggleDownPaymentInputs();
    this.updateTabIndexOrder();
    this.updateCalculator();
    this.saveCalculatorData();

    // Clear any validation errors
    const existingErrors = document.querySelectorAll(".validation-error");
    existingErrors.forEach((error) => error.remove());
  }

  validateCalculatorInputs() {
    const errors = [];
    const data = this.state.calculatorData;

    // Validate property price
    if (data.propertyPrice <= 0) {
      errors.push("Property price must be greater than $0");
    } else if (data.propertyPrice > 10000000) {
      errors.push(
        "Property price seems unusually high. Please verify the amount."
      );
    }

    // Validate down payment
    if (data.downPaymentMode === "dollar") {
      if (data.downPaymentAmount <= 0) {
        errors.push("Down payment amount must be greater than $0");
      } else if (data.downPaymentAmount > data.propertyPrice) {
        errors.push("Down payment cannot exceed property price");
      }
    } else {
      if (data.downPaymentPercentage <= 0 || data.downPaymentPercentage > 100) {
        errors.push("Down payment percentage must be between 0% and 100%");
      }
    }

    // Validate closing costs
    if (data.closingCosts < 0 || data.closingCosts > 10) {
      errors.push("Closing costs should typically be between 0% and 10%");
    }

    // Validate timeline
    if (data.timeline <= 0) {
      errors.push("Timeline must be at least 1 month");
    } else if (data.timeline > 600) {
      // 50 years
      errors.push(
        "Timeline seems unusually long. Please verify the number of months."
      );
    }

    // Validate monthly income (if provided)
    if (data.monthlyIncome > 0 && data.monthlyIncome < 1000) {
      errors.push(
        "Monthly income seems unusually low. Please verify the amount."
      );
    }

    return errors;
  }

  showValidationErrors(errors) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll(".validation-error");
    existingErrors.forEach((error) => error.remove());

    if (errors.length === 0) return;

    // Create error container
    const errorContainer = document.createElement("div");
    errorContainer.className = "validation-errors";
    errorContainer.style.cssText = `
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
      color: #dc2626;
    `;

    const errorTitle = document.createElement("h4");
    errorTitle.textContent = "Please correct the following issues:";
    errorTitle.style.cssText = `
      margin: 0 0 12px 0;
      font-size: 16px;
      font-weight: 600;
    `;

    errorContainer.appendChild(errorTitle);

    const errorList = document.createElement("ul");
    errorList.style.cssText = `
      margin: 0;
      padding-left: 20px;
    `;

    errors.forEach((error) => {
      const errorItem = document.createElement("li");
      errorItem.textContent = error;
      errorItem.style.cssText = `
        margin-bottom: 4px;
        font-size: 14px;
      `;
      errorList.appendChild(errorItem);
    });

    errorContainer.appendChild(errorList);

    // Insert at the top of the calculator form
    const calculatorForm = document.querySelector(".calculator-form");
    if (calculatorForm) {
      calculatorForm.insertBefore(errorContainer, calculatorForm.firstChild);
    }
  }
}

// Add CSS animations for notifications
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(notificationStyles);

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  try {
    window.threeWiseMenApp = new ThreeWiseMenApp();
    console.log("ThreeWiseMen application initialized successfully");
  } catch (error) {
    console.error("Failed to initialize ThreeWiseMen application:", error);
  }
});

// Export for module systems (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = ThreeWiseMenApp;
}
