# Running the Three Wise Men Financial Dashboard

This guide explains how to set up and run the Vue.js financial planning dashboard application.

## Prerequisites

Before running the application, make sure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js) or **yarn**

### Checking Your Installation

Verify that Node.js and npm are installed:

```bash
node --version
npm --version
```

If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/).

## Installation Steps

### 1. Clone or Download the Project

If you have the project files locally, navigate to the project directory:

```bash
cd ThreeWiseMen
```

### 2. Install Dependencies

Install all required packages:

```bash
npm install
```

This will install:

- Vue.js 3
- Vue Router 4
- Vite (build tool)
- Other development dependencies

### 3. Start the Development Server

Run the development server:

```bash
npm run dev
```

The application will start and be available at `http://localhost:5173` (or another available port if 5173 is in use).

## Available Scripts

The application includes several npm scripts:

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build the application for production
- **`npm run preview`** - Preview the production build locally

## Development Workflow

### During Development

1. **Start the server**: `npm run dev`
2. **Make changes** to your Vue components
3. **Save files** - the browser will automatically reload
4. **View changes** in real-time at `http://localhost:5173`

### Building for Production

1. **Build the app**: `npm run build`
2. **Preview the build**: `npm run preview`
3. **Deploy** the `dist` folder to your hosting service

## Troubleshooting

### Port Already in Use

If you see an error about the port being in use:

1. **Check what's using the port**:

   ```bash
   # On Windows
   netstat -ano | findstr :5173

   # On macOS/Linux
   lsof -i :5173
   ```

2. **Kill the process** or use a different port:

   ```bash
   # Kill process by PID (replace XXXX with actual PID)
   taskkill /PID XXXX /F

   # Or specify a different port
   npm run dev -- --port 3001
   ```

### Dependencies Issues

If you encounter dependency problems:

1. **Clear npm cache**:

   ```bash
   npm cache clean --force
   ```

2. **Delete node_modules and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Build Errors

If the build fails:

1. **Check for syntax errors** in your Vue components
2. **Verify all imports** are correct
3. **Check the console** for specific error messages

## Project Structure

```
ThreeWiseMen/
├── src/
│   ├── views/                 # Page components
│   │   ├── Dashboard.vue      # Main dashboard
│   │   ├── SavingsCalculator.vue
│   │   ├── BudgetPlanner.vue
│   │   └── Investments.vue
│   ├── App.vue               # Main app component
│   └── main.js               # App entry point
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

## Browser Support

The application works in all modern browsers:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Next Steps

Once the application is running:

1. **Explore the dashboard** at the main page
2. **Navigate between tools** using the top navigation
3. **Click on tool cards** to visit different sections
4. **Start building features** in the placeholder pages

## Getting Help

If you encounter issues:

1. **Check the console** for error messages
2. **Review the Vue.js documentation** at [vuejs.org](https://vuejs.org/)
3. **Check the Vite documentation** at [vitejs.dev](https://vitejs.dev/)
4. **Search for solutions** in the project's issue tracker

## Development Tips

- **Hot reload** works automatically - just save your files
- **Vue DevTools** browser extension helps with debugging
- **Component structure** follows Vue.js best practices
- **Responsive design** is built-in and mobile-friendly
