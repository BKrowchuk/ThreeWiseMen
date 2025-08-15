import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Dashboard from "./views/Dashboard.vue";
import Calculators from "./views/Calculators.vue";
import DownPaymentCalculator from "./views/DownPaymentCalculator.vue";
import NetWorthCalculator from "./views/NetWorthCalculator.vue";
import CashFlowCalculator from "./views/CashFlowCalculator.vue";
import BudgetPlanner from "./views/BudgetPlanner.vue";
import Investments from "./views/Investments.vue";
import FinancialProfile from "./views/FinancialProfile.vue";
import { themeActions } from "./store/theme.js";
import "./assets/themes.css";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/calculators", component: Calculators },
  { path: "/calculators/down-payment", component: DownPaymentCalculator },
  { path: "/calculators/net-worth", component: NetWorthCalculator },
  { path: "/calculators/cash-flow", component: CashFlowCalculator },
  { path: "/budget-planner", component: BudgetPlanner },
  { path: "/investments", component: Investments },
  { path: "/financial-profile", component: FinancialProfile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);

// Initialize theme system
themeActions.init();

app.mount("#app");
