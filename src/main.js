import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Dashboard from "./views/Dashboard.vue";
import SavingsCalculator from "./views/SavingsCalculator.vue";
import BudgetPlanner from "./views/BudgetPlanner.vue";
import Investments from "./views/Investments.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/savings-calculator", component: SavingsCalculator },
  { path: "/budget-planner", component: BudgetPlanner },
  { path: "/investments", component: Investments },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
