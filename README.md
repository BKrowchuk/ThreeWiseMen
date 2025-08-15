# Three Wise Men - Financial Planning Dashboard

A modern, responsive financial planning dashboard built with Vue.js 3 and Vue Router.

## Features

- **Dashboard**: Overview of all financial planning tools
- **Calculators**: Comprehensive suite of financial calculators
  - **Down Payment Calculator**: Plan home purchase savings with detailed calculations
  - **Net Worth Calculator**: Calculate total financial position and track progress
  - **Cash Flow Calculator**: Analyze monthly income vs expenses and identify savings opportunities
- **Budget Planner**: Create and manage monthly budgets (coming soon)
- **Investments**: Track and analyze investment portfolios (coming soon)
- **Financial Profile**: Persistent financial data management with save/load functionality

## Technology Stack

- **Frontend**: Vue.js 3 with Composition API
- **Routing**: Vue Router 4
- **Build Tool**: Vite
- **Styling**: CSS3 with modern design principles

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ThreeWiseMen
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── views/
│   ├── Dashboard.vue              # Main dashboard view
│   ├── Calculators.vue            # Calculators landing page
│   ├── DownPaymentCalculator.vue  # Down payment planning calculator
│   ├── NetWorthCalculator.vue     # Net worth calculation and tracking
│   ├── CashFlowCalculator.vue     # Cash flow analysis calculator
│   ├── BudgetPlanner.vue          # Budget planner (coming soon)
│   ├── Investments.vue            # Investments tracker (coming soon)
│   └── FinancialProfile.vue       # Financial profile management
├── components/
│   ├── SaveToProfile.vue          # Save calculator results to profile
│   └── LoadFromProfile.vue        # Load profile data into calculators
├── store/
│   ├── calculators.js             # Calculator state management
│   └── profile.js                 # Financial profile state management
├── App.vue                        # Main application component
└── main.js                        # Application entry point
```

## Development

This application is built with Vue.js 3 and follows modern Vue development practices:

- Single File Components (SFC)
- Vue Router for navigation
- Responsive design with CSS Grid and Flexbox
- Mobile-first approach

## Key Features

### Save to Profile System

- **Selective Data Saving**: Choose which calculator results to save to your financial profile
- **Persistent Storage**: Financial data survives across browser sessions
- **Profile Comparison**: See how new calculations compare to saved profile data
- **Historical Tracking**: Monitor financial progress over time with automatic snapshots

### Calculator Integration

- **Load from Profile**: Pre-populate calculator fields with saved financial data
- **Smart Field Mapping**: Automatic mapping between profile data and calculator fields
- **Data Synchronization**: Keep profile data up-to-date across all calculators
- **Cross-Calculator Consistency**: Shared data like monthly income automatically synchronized

### Profile Management

- **Comprehensive Overview**: Dashboard showing key financial metrics and progress
- **Editable Sections**: Inline editing for all profile data categories
- **Data Management**: Clear profile data, export options, and backup functionality
- **Last Updated Tracking**: Timestamps for all profile sections and data sources

## Future Enhancements

The following features are planned for future development:

- **Advanced Analytics**: Charts, graphs, and trend analysis for financial data
- **Goal Tracking**: Progress monitoring toward financial goals with notifications
- **Data Export/Import**: CSV/PDF export and external data import capabilities
- **Budget Planner**: Expense categorization, spending analysis, budget templates
- **Investments**: Portfolio tracking, performance analytics, investment recommendations
- **Mobile App**: Native mobile application for on-the-go financial planning

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
