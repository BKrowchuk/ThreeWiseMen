# ThreeWiseMen Application Restructure & Calculator Suite

## Overview

This document details the comprehensive restructure of the ThreeWiseMen application to create a dedicated Calculators section with multiple financial planning tools. The restructure transforms the single savings calculator into a comprehensive suite of financial calculators with shared state management and cross-calculator data synchronization.

## Latest Updates

### Navigation Component Extraction & Modern Drawer Design (December 2024)

**Modern Navigation Drawer Implementation**

A complete redesign and refactoring of the application navigation has been implemented, transforming from a traditional horizontal navbar to a modern drawer-based navigation system with clean, single-line menu items.

#### Navigation Component Architecture

**Navigation Component (`src/components/Navigation.vue`)**

- **Component Extraction**: Moved all navigation-related template, script, and style code from App.vue into a dedicated reusable component
- **Modern Drawer Design**: Implemented a clean navigation drawer that slides in from the left with smooth animations
- **Simplified Top Bar**: Clean, full-width top bar with hamburger menu (left) and theme toggle cog (right)
- **Single-Line Navigation**: All navigation items now use concise, single-line labels for better mobile experience
- **Icon Integration**: Added beautiful SVG icons for each navigation section with consistent styling

#### Modern Navigation Features

**Top Navigation Bar**

- **Full-Width Design**: Navigation bar spans the complete screen width for modern appearance
- **Three-Section Layout**: Menu icon (left), centered brand, theme toggle cog (right)
- **Touch-Optimized Buttons**: 44px minimum touch targets for all interactive elements
- **Clean Branding**: Simplified brand section with logo and single-line title
- **Integrated Theme Toggle**: Direct theme switching with sun/moon icons built into the navbar

**Navigation Drawer**

- **Slide-in Animation**: Smooth 320px drawer that slides in from the left with cubic-bezier easing
- **Comprehensive Header**: Drawer header with brand information and close button
- **Iconographic Navigation**: Each menu item features a relevant SVG icon for better visual hierarchy
- **Single-Line Labels**: Concise navigation labels (e.g., "Profile" instead of "Financial Profile")
- **Visual Indicators**: Left border accent and background highlighting for active states

#### Accessibility & User Experience

**Accessibility Features**

- **ARIA Compliance**: Proper use of `navigation`, `menubar`, and `menuitem` roles with comprehensive labeling
- **Keyboard Support**: Full keyboard navigation with Enter/Space activation and Escape to close drawer
- **Screen Reader Friendly**: Descriptive ARIA labels for menu toggle and theme switching actions
- **High Contrast Support**: Special styling for users with high contrast preferences
- **Reduced Motion**: Respects `prefers-reduced-motion` user preferences for animations

**Enhanced User Experience**

- **Backdrop Interaction**: Semi-transparent backdrop that closes drawer when clicked
- **Body Scroll Lock**: Prevents background scrolling when drawer is open
- **Auto-close Behavior**: Drawer automatically closes on route navigation
- **Smooth Animations**: 300ms cubic-bezier transitions for natural feel
- **Touch Gestures**: Optimized for touch interactions across all devices

#### Technical Implementation

**State Management**

- **Reactive Drawer State**: Vue 3 reactive data managing drawer open/closed states
- **Route-based Active States**: Dynamic active link highlighting using `aria-current="page"`
- **Theme Integration**: Direct theme store integration for real-time icon switching
- **Event Handling**: Proper cleanup of event listeners in component lifecycle

**Modern Design System**

- **SVG Icon Library**: Consistent iconography with Heroicons-style line icons
- **CSS Custom Properties**: Full integration with existing theme system variables
- **Typography Scale**: Optimized font sizes and weights for navigation hierarchy
- **Shadow System**: Subtle shadows for depth and visual hierarchy

#### Responsive Design

**Mobile-First Approach**

- **Universal Drawer**: Single navigation pattern works across all screen sizes
- **Adaptive Sizing**: Icon and text sizes adjust appropriately for smaller screens
- **Touch Optimization**: Minimum 44px touch targets on mobile devices
- **Screen Utilization**: Drawer width scales with available screen real estate

**Performance Optimizations**

- **CSS Transforms**: Hardware-accelerated animations for smooth drawer transitions
- **Reduced Bundle Size**: Removed complex responsive logic and dependencies
- **Component Separation**: Clean separation of navigation concerns from main app
- **Memory Management**: Proper event listener cleanup prevents memory leaks

#### Implementation Summary

**App.vue Refactoring**

- **Simplified Structure**: Reduced App.vue to essential layout container with single Navigation import
- **Component Import**: Clean import of Navigation component replacing complex inline navigation
- **Layout Optimization**: Improved flexbox layout for better content flow
- **Accessibility Enhancement**: Added `id="main-content"` for proper content targeting

**Code Improvements**

- **Reduced Complexity**: Simplified from complex responsive logic to universal drawer pattern
- **Extracted Styles**: Removed 400+ lines of navigation CSS from App.vue
- **Removed Dependencies**: Eliminated ThemeToggle component dependency from App.vue
- **Direct Theme Integration**: Built theme toggle directly into navigation bar

**Key Benefits**

- **Modern UX**: Contemporary navigation drawer design following Material Design principles
- **Simplified Maintenance**: Single navigation pattern reduces complexity across screen sizes
- **Better Performance**: Cleaner code structure with optimized animations
- **Enhanced Accessibility**: Comprehensive ARIA support and keyboard navigation
- **Consistent Experience**: Universal navigation behavior across all devices

**Migration Notes**

- **Backwards Compatibility**: Maintains all existing navigation functionality and routes
- **Theme Consistency**: Seamless integration with existing dark/light theme system
- **Route Integration**: Full compatibility with Vue Router active states and navigation
- **Component Architecture**: Clean, maintainable structure for future navigation enhancements

### Dark Mode Implementation (December 2024)

**Comprehensive Dark Theme System**

A complete dark mode implementation has been added to the ThreeWiseMen application, providing users with a modern, eye-friendly alternative to the default light theme.

#### Theme Management System

**Theme Store (`src/store/theme.js`)**

- Reactive theme state management using Vue 3 composition API
- Support for three theme modes: `light`, `dark`, and `system`
- Automatic system preference detection using `prefers-color-scheme` media query
- Real-time theme switching with smooth transitions
- Persistent theme preferences using localStorage
- Automatic theme application on app initialization

**Theme Toggle Component (`src/components/ThemeToggle.vue`)**

- Intuitive sun/moon icon toggle button
- Smooth icon transitions and hover effects
- Theme indicator text showing current mode
- Dropdown menu for selecting specific theme preferences
- Responsive design that adapts to mobile screens
- Accessible keyboard navigation and ARIA labels

#### Comprehensive Color System

**CSS Custom Properties (`src/assets/themes.css`)**

- Complete color palette for both light and dark themes
- Semantic color naming for consistent usage
- Specialized calculator color variables
- Status colors (success, warning, error, info) for both themes
- Smooth transitions between theme changes (300ms duration)
- High contrast support for accessibility
- Reduced motion support for users with motion sensitivity

**Color Categories:**

- **Background Colors:** Primary, secondary, tertiary, elevated surfaces
- **Text Colors:** Primary, secondary, muted, disabled, inverse
- **Interactive Elements:** Buttons, links, hover states, focus indicators
- **Form Elements:** Input backgrounds, borders, focus states, placeholders
- **Calculator Specific:** Card backgrounds, result highlights, input styling
- **Status Colors:** Success, warning, error, info with appropriate contrast

#### Logo Switching System

**Dynamic Logo Selection**

- Automatic logo switching based on current theme
- Light logo (`logo-light.png`) displayed in dark mode
- Regular logo (`logo.png`) displayed in light mode
- Implemented in both App.vue navigation and Dashboard welcome section
- Reactive updates when theme changes

#### Component Updates

**Navigation (App.vue)**

- Theme-aware navigation bar styling
- Dynamic logo switching implementation
- Theme toggle integration in navigation menu
- Smooth color transitions for all navigation elements

**Dashboard (src/views/Dashboard.vue)**

- Complete dark mode styling for welcome section
- Theme-aware summary cards and statistics
- Dynamic logo switching in welcome header
- Consistent color scheme throughout dashboard components

**Calculators Landing Page (src/views/Calculators.vue)**

- Dark mode styling for calculator cards
- Theme-aware hover effects and animations
- Consistent gradient backgrounds using theme variables
- Responsive design maintained across both themes

**Down Payment Calculator (src/views/DownPaymentCalculator.vue)**

- Complete form styling with theme-aware inputs
- Dark mode result cards and calculation breakdowns
- Theme-aware validation error styling
- Consistent button and interactive element styling

**Net Worth Calculator (src/views/NetWorthCalculator.vue)**

- Assets and liabilities columns with theme-appropriate colors
- Dark mode form inputs and calculation results
- Theme-aware tooltips and help text
- Consistent styling with other calculator components

#### Technical Implementation

**Theme Application**

- CSS custom properties for consistent theming
- Data attributes (`data-theme`) for CSS targeting
- Document root class management (`theme-light`, `theme-dark`)
- Meta theme-color updates for mobile browser chrome
- Automatic theme detection and application on page load

**Performance Optimizations**

- Efficient CSS variable usage for minimal repaints
- Smooth transitions without performance impact
- Lazy theme application to prevent flash of unstyled content
- Optimized localStorage operations for theme persistence

**Accessibility Features**

- WCAG AA compliant color contrast ratios
- High contrast mode support
- Reduced motion support for accessibility
- Proper focus indicators in both themes
- Semantic color usage for better screen reader support

#### User Experience

**Seamless Theme Switching**

- Instant theme application without page refresh
- Smooth color transitions prevent jarring changes
- Theme preference persistence across browser sessions
- System preference detection for automatic theme selection
- Visual feedback during theme changes

**Mobile Optimization**

- Responsive theme toggle that adapts to screen size
- Touch-friendly theme switching interface
- Optimized mobile browser chrome color updates
- Consistent experience across all device sizes

This dark mode implementation provides a comprehensive, accessible, and performant theming system that enhances the user experience while maintaining the application's professional appearance and functionality.

## Application Restructure

### Navigation Structure Changes

**Before:**

- Dashboard
- Savings Calculator
- Budget Planner
- Investments

**After:**

- Dashboard
- **Calculators** (new landing page)
  - Down Payment Calculator
  - Net Worth Calculator
  - Cash Flow Calculator
- Budget Planner
- Investments

### Routing Updates

New routes have been implemented:

- `/calculators` - Calculators landing page
- `/calculators/down-payment` - Down Payment Calculator
- `/calculators/net-worth` - Net Worth Calculator
- `/calculators/cash-flow` - Cash Flow Calculator

## New Calculator Components

### 1. Calculators Landing Page (`/calculators`)

**Purpose:** Central hub for accessing all financial calculators

**Features:**

- Grid layout with three calculator cards
- Hover effects and smooth animations
- Clear call-to-action styling
- Responsive design for all screen sizes

**Calculator Cards:**

1. **Down Payment Calculator** - 🏠
   - Calculate monthly savings for home purchase
   - Includes down payment and closing costs
2. **Net Worth Calculator** - 💰
   - Calculate total financial position
   - Analyze assets and liabilities
3. **Cash Flow Calculator** - 📊
   - Monthly income vs expenses analysis
   - Identify savings opportunities

### 2. Down Payment Calculator (`/calculators/down-payment`)

**Purpose:** Plan home purchase savings with detailed calculations

**Key Features:**

- Property price input with currency formatting
- Down payment toggle (percentage vs dollar amount)
- Closing costs calculation (default 3.5%)
- Existing savings consideration
- Timeline planning (months)
- Monthly income analysis
- Affordability assessment

**Calculations:**

- Down payment amount (percentage or dollar)
- Closing costs amount
- Total upfront costs
- Amount still needed to save
- Monthly savings target
- Savings to income ratio

**Results Display:**

- Visual breakdown of costs
- Monthly savings target with timeline
- Affordability analysis
- Step-by-step calculation breakdown

### 3. Net Worth Calculator (`/calculators/net-worth`)

**Purpose:** Calculate total financial position by analyzing assets and liabilities

**Assets Section:**

- Cash & Checking accounts
- High-interest savings
- TFSA (Tax-Free Savings Account)
- RRSP (Registered Retirement Savings Plan)
- FHSA (First Home Savings Account)
- Other investments
- Other assets

**Liabilities Section:**

- Credit cards
- Lines of credit
- Car loans
- Student loans
- Other debts

**Features:**

- Currency input formatting
- Helpful tooltips for Canadian accounts
- Real-time calculations
- Financial health indicator

**Results Display:**

- Total assets, liabilities, and net worth
- Detailed breakdown by category
- Financial health status with recommendations
- Color-coded positive/negative indicators

### 4. Cash Flow Calculator (`/calculators/cash-flow`)

**Purpose:** Analyze monthly income vs expenses and identify savings opportunities

**Income Section:**

- Monthly income after tax and benefits
- Example: $4,800

**Fixed Expenses Section:**

- Rent/mortgage
- Utilities
- Internet
- Phone
- Insurance
- Transit/car
- Subscriptions
- Minimum debt payments

**Variable Expenses Section:**

- Groceries
- Dining out
- Gas
- Shopping
- Personal care
- Travel
- Miscellaneous

**Savings/Transfers Section:**

- Emergency fund
- Home fund (with $2,167 target example)
- RRSP/FHSA contributions

**Results Display:**

- Monthly summary with color coding
- Annual projections
- Cash surplus/deficit analysis
- Financial health indicator
- Savings opportunities identification

## Shared State Management

### Calculator Store (`src/store/calculators.js`)

**Purpose:** Centralized state management for all calculator data and results

**Store Structure:**

```javascript
{
  downPayment: { /* form data and results */ },
  netWorth: { /* form data and results */ },
  cashFlow: { /* form data and results */ },
  shared: { /* cross-calculator data */ }
}
```

**Key Features:**

- Persistent storage using localStorage
- Cross-calculator data synchronization
- Automatic data loading on component mount
- Results caching for better user experience

**Data Synchronization:**

- Monthly income shared between calculators
- Home fund target from down payment calculator to cash flow calculator
- Monthly savings data shared across calculators

**Actions:**

- `updateDownPaymentData()` - Update down payment form data
- `updateNetWorthData()` - Update net worth form data
- `updateCashFlowData()` - Update cash flow form data
- `saveResults()` - Save calculation results
- `syncData()` - Synchronize data between calculators
- `clearAllData()` - Reset all calculator data

## Dashboard Integration

### Calculator Summary Section

**Purpose:** Display key information from all calculators on the main dashboard

**Features:**

- Summary cards for each calculator with results
- Quick navigation to detailed views
- Visual indicators for financial health
- Responsive grid layout

**Summary Cards:**

1. **Down Payment Plan**

   - Monthly savings target
   - Timeline
   - Property price

2. **Net Worth**

   - Total assets
   - Total liabilities
   - Net worth (positive/negative)

3. **Cash Flow**
   - Monthly income
   - Total expenses
   - Monthly savings

## Technical Implementation

### Component Architecture

**Base Structure:**

- Consistent page headers with back navigation
- Two-column layout (form + results)
- Responsive design patterns
- Shared styling components

**Form Components:**

- Currency input formatting
- Validation error handling
- Section grouping with visual hierarchy
- Tooltips for complex fields

**Results Components:**

- Grid-based result cards
- Color-coded indicators
- Detailed breakdowns
- Health status indicators

### Styling System

**Design Consistency:**

- ThreeWiseMen color scheme maintained
- Consistent spacing and typography
- Smooth animations and transitions
- Responsive breakpoints

**Visual Elements:**

- Section grouping with colored borders
- Icon-based visual hierarchy
- Hover effects and interactions
- Status-based color coding

### Data Flow

**Input → Calculation → Storage → Display:**

1. User inputs data in forms
2. Real-time calculations using computed properties
3. Results saved to centralized store
4. Data synchronized across calculators
5. Results displayed with visual formatting
6. Dashboard updated with summary information

## Testing Strategy

### Test Coverage

**Component Tests:**

- Calculator landing page rendering
- Form field validation
- Calculation accuracy
- Results display
- Navigation functionality

**Unit Tests:**

- Calculation formulas
- Validation logic
- Data formatting
- Store actions

**Integration Tests:**

- Cross-calculator data flow
- Store persistence
- Component communication

### Test Files

**`tests/calculators.test.js`:**

- Comprehensive test suite for all calculators
- Formula validation tests
- Component rendering tests
- User interaction tests

## User Experience Enhancements

### Navigation Improvements

**Breadcrumb Navigation:**

- Clear path from dashboard to specific calculators
- Back navigation to calculators landing page
- Consistent navigation patterns

**Visual Feedback:**

- Loading states during calculations
- Success/error messaging
- Progress indicators
- Hover effects and animations

### Data Persistence

**User Data Protection:**

- Form data automatically saved
- Results cached for quick access
- Cross-session data persistence
- Easy data reset functionality

### Accessibility Features

**Form Accessibility:**

- Proper label associations
- Helpful tooltips
- Clear error messaging
- Keyboard navigation support

## Future Enhancements

### Planned Features

**Advanced Calculations:**

- Investment return projections
- Tax optimization strategies
- Retirement planning scenarios
- Debt payoff strategies

**Data Visualization:**

- Charts and graphs for results
- Historical trend analysis
- Comparison tools
- Goal tracking dashboards

**Integration Opportunities:**

- Export functionality (PDF, CSV)
- Mobile app development
- API integrations
- Third-party financial data

## Performance Considerations

### Optimization Strategies

**Lazy Loading:**

- Calculator components loaded on demand
- Results cached for quick access
- Minimal initial bundle size

**Data Management:**

- Efficient store updates
- Debounced input handling
- Optimized re-renders
- Memory leak prevention

## Browser Compatibility

### Supported Browsers

**Modern Browsers:**

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Features Used:**

- ES6+ JavaScript
- CSS Grid and Flexbox
- Local Storage API
- Vue 3 Composition API

## Deployment Notes

### Build Requirements

**Dependencies:**

- Vue 3.x
- Vue Router 4.x
- Modern CSS support
- Local storage capability

**Environment Variables:**

- No external API keys required
- All calculations performed client-side
- Local storage for data persistence

## Calculator Layout Improvements & Responsive Design

### Overview

Significant improvements have been made to calculator layouts to utilize more screen width and arrange sections side-by-side for better space utilization and improved user experience.

### Layout Enhancements

#### Container Width Updates

**Before:** Standard narrow form widths (max-width: 1200px)
**After:** Wider breakpoints for better space utilization

- **Down Payment Calculator:** max-width: 1400px
- **Net Worth Calculator:** max-width: 1400px
- **Cash Flow Calculator:** max-width: 1400px
- **Savings Calculator:** max-width: 1400px
- **Dashboard:** max-width: 1400px

#### Multi-Column Form Layouts

**Down Payment Calculator:**

- **Left Column:** Property Details (🏠 Property Details, 💰 Financial Position)
- **Right Column:** Results and calculations
- Form sections grouped logically with visual separation
- Clear column headers with icons and descriptions

**Net Worth Calculator:**

- **Left Column:** Assets (💰 Assets)
- **Right Column:** Liabilities (💳 Liabilities)
- Equal-width columns with distinct visual styling
- Assets column: Green accent (#27ae60)
- Liabilities column: Red accent (#e74c3c)

**Cash Flow Calculator:**

- **Left Column:** Income & Fixed Expenses
  - 💰 Income section
  - 🏠 Fixed Expenses section
- **Right Column:** Variable Expenses & Savings
  - 🛒 Variable Expenses section
  - 💎 Savings & Transfers section
- Visual separation with border between columns

#### Visual Organization Improvements

**Section Grouping:**

- Each form section has distinct background colors
- Colored left borders for visual hierarchy
- Consistent spacing and padding
- Clear section headers with emojis and descriptions

**Form Field Styling:**

- Input fields optimized for narrower columns
- Proper label and input alignment
- Consistent margins and padding
- Responsive field sizing

**Calculate Button Placement:**

- Centered below form sections
- Visual separation with border
- Consistent styling across all calculators

### Responsive Design Patterns

#### Breakpoint Strategy

**Desktop (1400px+):** Full multi-column layout
**Large Tablets (1200px-1399px):** Reduced max-width, maintained layout
**Tablets (1024px-1199px):** Single-column layout, stacked sections
**Mobile (768px-1023px):** Optimized spacing and padding
**Small Mobile (480px-767px):** Compact layout with reduced padding

#### Responsive Behavior

**CSS Grid Implementation:**

```css
.calculator-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 1024px) {
  .calculator-form {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
```

**Column Stacking:**

- Multi-column layouts automatically stack on smaller screens
- Visual separators (borders) removed on mobile
- Padding adjusted for optimal mobile experience

**Form Field Optimization:**

- Input fields maintain appropriate sizing in all layouts
- Labels and inputs remain properly aligned
- Spacing optimized for each breakpoint

### Enhanced Visual Hierarchy

#### Section Headers

- **Icons:** Emojis for quick visual identification
- **Titles:** Clear, descriptive section names
- **Descriptions:** Helpful context for each section
- **Visual Separation:** Borders and background colors

#### Color Coding System

- **Assets:** Green accents (#27ae60)
- **Liabilities:** Red accents (#e74c3c)
- **Income:** Green accents (#27ae60)
- **Expenses:** Red accents (#e74c3c)
- **Savings:** Blue accents (#3498db)
- **Neutral:** Blue accents (#667eea)

#### Visual Boundaries

- Subtle borders between columns
- Background colors for section groups
- Consistent spacing between elements
- Clear visual separation of different areas

### Testing & Validation

#### Responsive Testing

- **Desktop:** Verified multi-column layouts work correctly
- **Tablet:** Confirmed single-column stacking behavior
- **Mobile:** Validated optimal mobile experience
- **Cross-browser:** Tested on Chrome, Firefox, Safari, Edge

#### Layout Validation

- **No Horizontal Scrolling:** Ensured on all device sizes
- **Logical Tab Order:** Maintained in multi-column layouts
- **Form Usability:** Verified optimal across all layout variations
- **Visual Clarity:** Confirmed excellent readability in all layouts

### Performance Impact

#### Positive Effects

- **Better Space Utilization:** More efficient use of screen real estate
- **Improved User Experience:** Logical grouping and visual hierarchy
- **Enhanced Readability:** Better organization of form sections
- **Professional Appearance:** More polished and modern interface

#### Technical Considerations

- **CSS Grid:** Efficient layout system with minimal performance impact
- **Responsive Images:** No additional image loading
- **Minimal JavaScript:** Layout changes handled entirely with CSS
- **Optimized Rendering:** Efficient DOM updates and reflows

## Conclusion

The ThreeWiseMen application restructure successfully transforms a single calculator into a comprehensive financial planning suite. The new architecture provides:

- **Better User Experience:** Centralized access to all calculators
- **Data Consistency:** Shared state management across calculators
- **Scalability:** Easy addition of new calculator types
- **Maintainability:** Consistent component patterns and styling
- **Performance:** Optimized data flow and caching

The calculator suite now serves as a comprehensive financial planning toolkit, helping users make informed decisions about home purchases, net worth assessment, and cash flow management.

### Layout Improvements Summary

The recent calculator layout improvements deliver:

- **Enhanced Space Utilization:** Wider containers and multi-column layouts
- **Better Visual Organization:** Logical grouping with clear visual hierarchy
- **Improved Responsiveness:** Optimized layouts for all device sizes
- **Professional Appearance:** Modern, polished interface design
- **Better User Experience:** Easier navigation and form completion

### Calculator Card Width Optimization

**Latest Enhancement:** Calculator cards now take up most of the available screen width for maximum space utilization.

**Technical Changes:**

- **Container Layout:** Changed `calculator-container` from CSS Grid (`1fr 1fr`) to Flexbox (`flex-direction: column`)
- **Card Expansion:** Added `width: 100%` and `min-width: 0` to `form-section` and `results-section`
- **Full-Width Cards:** Calculator cards expand to fill available horizontal space instead of being constrained by grid columns
- **Responsive Behavior:** Maintained responsive stacking while maximizing horizontal space usage on larger screens

**Benefits:**

- **Maximum Screen Usage:** Calculator cards now utilize the full width of the screen
- **Better Form Layout:** More space for input fields and form organization
- **Improved Readability:** Results and calculations have more room to display
- **Enhanced User Experience:** Less wasted space and better visual balance

These improvements ensure that users can efficiently use the full width of their screens while maintaining excellent usability across all device types, creating a more professional and user-friendly financial planning experience.

### Bug Fix: TypeError in parseCurrency Method

**Issue Resolved:** Fixed `TypeError: value.replace is not a function` error that occurred when non-string values were passed to the `parseCurrency` method.

**Root Cause:** The `parseCurrency` method was calling `.replace()` on values that might not be strings (e.g., `null`, `undefined`, or other data types), causing runtime errors.

**Technical Fixes Applied:**

- **Enhanced parseCurrency Method:** Added type checking to ensure values are strings before calling `.replace()`
- **Safety Checks in Computed Properties:** Added null/undefined checks in reduce operations for `totalAssets`, `totalLiabilities`, `totalIncome`, `totalFixedExpenses`, `totalVariableExpenses`, and `totalSavings`
- **Cross-Calculator Consistency:** Applied the same safety improvements to all calculator components

**Files Modified:**

- `src/views/CashFlowCalculator.vue` - Enhanced parseCurrency and computed properties
- `src/views/NetWorthCalculator.vue` - Enhanced parseCurrency and computed properties
- `src/views/DownPaymentCalculator.vue` - Enhanced parseCurrency method
- `src/views/SavingsCalculator.vue` - Enhanced parseCurrency method

**Benefits:**

- **Error Prevention:** Eliminates runtime errors from invalid data types
- **Improved Stability:** More robust handling of edge cases and data corruption
- **Better User Experience:** Prevents application crashes during calculations
- **Data Integrity:** Safer processing of form inputs and stored data

## Save to Profile Functionality

### Overview

A comprehensive "Save to Profile" system has been implemented that allows users to selectively save calculator results to their persistent financial profile. This creates a clear distinction between calculator tools (exploratory) and planning/tracking features (persistent).

### New Components

#### 1. Profile Store (`src/store/profile.js`)

**Purpose:** Centralized management of persistent user financial data separate from calculator results.

**Store Structure:**

```javascript
{
  financialState: {
    monthlyIncome: 0,
    existingSavings: 0,
    emergencyFund: 0,
    homeFund: 0,
    rrspFhsa: 0,
    assets: { /* individual asset values */ },
    liabilities: { /* individual liability amounts */ },
    budget: { /* expense and savings categories */ },
    goals: { /* financial targets and timelines */ }
  },
  netWorthHistory: [], // Historical snapshots
  cashFlowHistory: [], // Historical snapshots
  lastUpdated: { /* timestamps for different sections */ }
}
```

**Key Features:**

- Separate storage from calculator results
- Historical data tracking (last 12 snapshots)
- Timestamp tracking for all updates
- Selective field updating capabilities

#### 2. SaveToProfile Component (`src/components/SaveToProfile.vue`)

**Purpose:** Reusable component for saving calculator results to the user's financial profile.

**Features:**

- **Selective Field Saving:** Users can choose which calculated values to save
- **Group-based Selection:** Fields organized into logical groups (Income, Savings, Goals, etc.)
- **Profile Comparison:** Shows current profile values vs. new calculated values
- **Visual Feedback:** Success messages and loading states
- **Modal Interface:** Clean, organized save workflow

**Save Options by Calculator:**

- **Down Payment Calculator:** Monthly income, existing savings, down payment target, monthly savings goal
- **Net Worth Calculator:** Individual asset amounts, liability amounts, total net worth snapshot
- **Cash Flow Calculator:** Monthly income, fixed/variable expenses, savings targets

#### 3. LoadFromProfile Component (`src/components/LoadFromProfile.vue`)

**Purpose:** Allows users to pre-populate calculator fields with saved profile data.

**Features:**

- **Selective Data Loading:** Choose which profile data to load
- **Data Source Information:** Shows when and where data was last updated
- **Smart Field Mapping:** Automatically maps profile data to appropriate calculator fields
- **Disabled State:** Button disabled when no profile data is available

#### 4. Financial Profile Management (`src/views/FinancialProfile.vue`)

**Purpose:** Comprehensive interface for managing saved financial data.

**Features:**

- **Profile Overview:** Summary cards showing key financial metrics
- **Editable Sections:** Income & Savings, Assets, Liabilities, Financial Goals
- **Historical Data:** View net worth and cash flow trends over time
- **Data Management:** Clear profile data, load from profile options
- **Last Updated Tracking:** Timestamps for all profile sections

### Integration with Calculators

#### Down Payment Calculator

- **Save Button:** Appears after successful calculations
- **Saveable Fields:** Monthly income, existing savings, down payment target, monthly savings goal
- **Load Button:** Pre-populates form fields with profile data
- **Profile Comparison:** Shows difference between current and saved values

#### Net Worth Calculator

- **Save Button:** Appears after successful calculations
- **Saveable Fields:** Individual asset and liability amounts, total net worth
- **Historical Tracking:** Maintains snapshots of net worth over time
- **Load Button:** Pre-populates asset and liability fields

#### Cash Flow Calculator

- **Save Button:** Appears after successful calculations
- **Saveable Fields:** Monthly income, fixed/variable expenses, savings targets
- **Budget Templates:** Can create budget templates from calculations
- **Load Button:** Pre-populates expense and income fields

### User Experience Features

#### Save Workflow

1. **Calculate Results:** User completes calculator and sees results
2. **Save Button:** Prominent "💾 Save to Profile" button appears
3. **Field Selection:** Modal allows selective saving of calculated values
4. **Profile Comparison:** Shows what will change in the profile
5. **Confirmation:** Clear feedback about what was saved
6. **Success Message:** Toast notification confirms successful save

#### Load Workflow

1. **Load Button:** "📊 Load from Profile" button in calculator forms
2. **Data Selection:** Modal shows available profile data
3. **Field Mapping:** Automatic mapping to appropriate calculator fields
4. **Form Population:** Calculator fields pre-filled with profile data
5. **Data Source Info:** Shows when profile data was last updated

#### Profile Management

1. **Navigation:** New "Financial Profile" link in main navigation
2. **Overview Dashboard:** Summary cards with key financial metrics
3. **Editable Sections:** Inline editing for all profile data
4. **Historical Tracking:** View financial progress over time
5. **Data Management:** Clear profile, export options, etc.

### Technical Implementation

#### Data Persistence

- **Separate Storage:** Profile data stored in `threeWiseMenProfile` localStorage key
- **Calculator Data:** Calculator results stored in `threeWiseMenCalculators` localStorage key
- **Cross-Session Persistence:** All data survives browser restarts
- **Data Validation:** Safe handling of corrupted or missing data

#### Component Communication

- **Event-Based:** Components communicate via Vue events
- **Store Integration:** Profile store manages all persistent data
- **Reactive Updates:** UI automatically updates when profile data changes
- **Error Handling:** Graceful fallbacks for missing or invalid data

#### Performance Considerations

- **Lazy Loading:** Profile components only load when needed
- **Efficient Updates:** Only changed fields trigger re-renders
- **Memory Management:** Historical data limited to last 12 snapshots
- **Optimized Storage:** Efficient localStorage usage

### User Mental Model

#### Calculator vs. Profile Distinction

- **Calculators:** Exploratory tools for "what-if" scenarios
- **Profile:** Persistent record of actual financial state
- **Selective Saving:** Users control what gets permanently saved
- **Data Ownership:** Full control over personal financial data

#### Workflow Patterns

1. **Exploration:** Use calculators to explore different scenarios
2. **Decision Making:** Compare results and make informed decisions
3. **Commitment:** Save relevant results to profile when ready
4. **Tracking:** Monitor progress over time using profile data
5. **Iteration:** Use profile data to inform future calculations

### Testing Strategy

#### Component Testing

- **SaveToProfile Component:** Field selection, validation, save workflow
- **LoadFromProfile Component:** Data loading, field mapping, error handling
- **FinancialProfile Component:** Data editing, historical display, management functions

#### Integration Testing

- **Calculator Integration:** Save/load functionality across all calculators
- **Data Flow:** Profile store updates and persistence
- **Cross-Calculator Sync:** Data consistency between different tools

#### User Experience Testing

- **Save Workflow:** Complete save process from calculation to confirmation
- **Load Workflow:** Complete load process from selection to form population
- **Profile Management:** All profile editing and management functions

### Future Enhancements

#### Planned Features

- **Data Export:** Export profile data to CSV/PDF
- **Data Import:** Import financial data from external sources
- **Advanced Analytics:** Charts and graphs for financial trends
- **Goal Tracking:** Progress tracking toward financial goals
- **Notifications:** Reminders for profile updates and goal progress

#### Integration Opportunities

- **Bank APIs:** Direct import of account balances
- **Investment Platforms:** Portfolio value synchronization
- **Budget Apps:** Expense tracking integration
- **Tax Software:** Tax-related financial data export

### Benefits

#### For Users

- **Data Persistence:** Financial information survives across sessions
- **Progress Tracking:** Monitor financial health over time
- **Efficiency:** Pre-populate forms with known information
- **Control:** Choose what financial data to save permanently
- **Insights:** Historical trends and financial progress

#### For Developers

- **Clear Architecture:** Separation of concerns between calculators and profiles
- **Reusable Components:** Modular save/load functionality
- **Scalable Design:** Easy to add new calculator types
- **Maintainable Code:** Consistent patterns across all components
- **User Experience:** Professional, intuitive interface design
