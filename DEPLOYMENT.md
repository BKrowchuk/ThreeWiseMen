# ThreeWiseMen GitHub Pages Deployment Guide

This guide explains how to deploy the ThreeWiseMen Financial Planning Dashboard to GitHub Pages.

## 🚀 Automatic Deployment

The project is configured for automatic deployment using GitHub Actions:

1. **Push to main branch** - The workflow automatically triggers on every push to the main branch
2. **GitHub Actions builds and deploys** - The workflow builds the Vue app and deploys it to GitHub Pages
3. **Live site updates** - Your site will be available at `https://yourusername.github.io/ThreeWiseMen/`

### GitHub Repository Settings

To enable GitHub Pages:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

The workflow will automatically deploy your app when you push to the main branch.

## 🔧 Manual Deployment

If you prefer to deploy manually:

```bash
# Install dependencies (if not already installed)
npm install

# Build and deploy
npm run deploy
```

**Note:** Manual deployment requires the `gh-pages` package and proper GitHub authentication.

## 📁 Project Configuration

The following files have been configured for GitHub Pages deployment:

### `vite.config.js`

- Base path set to `/ThreeWiseMen/`
- Build output directory configured
- Assets directory properly set

### `src/main.js`

- Vue Router configured with correct base path for GitHub Pages
- History mode set to `createWebHistory('/ThreeWiseMen/')`

### `package.json`

- Deploy script added for manual deployment
- Homepage URL configured
- `gh-pages` dependency added

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)

- Automated build and deployment on push to main branch
- Uses Node.js 18 and npm ci for reliable builds
- Proper permissions configured for GitHub Pages deployment

### Client-Side Routing Support

- `public/404.html` - Handles client-side routing for GitHub Pages
- `index.html` - Configured to restore proper URLs from GitHub Pages redirects

## 🧪 Testing the Deployment

After deployment, verify that:

1. **All routes work correctly** - Navigate between different pages
2. **Assets load properly** - Check that images, CSS, and JS files load
3. **Local storage functions** - Test profile saving/loading features
4. **Theme switching works** - Verify dark/light theme toggle
5. **Calculators function** - Test all financial calculators
6. **Responsive design** - Test on different screen sizes

## 🔗 URLs

- **Production Site**: `https://yourusername.github.io/ThreeWiseMen/`
- **Repository**: `https://github.com/yourusername/ThreeWiseMen`

## 🛠️ Troubleshooting

### Common Issues:

1. **404 errors on refresh** - Ensure `404.html` is in the `public` folder
2. **Assets not loading** - Verify base path is correctly set in `vite.config.js`
3. **Routing issues** - Check that Vue Router base path matches Vite base path
4. **Build failures** - Check GitHub Actions logs for detailed error messages

### Local Testing:

To test the production build locally:

```bash
npm run build
npm run preview
```

This will build and serve the production version locally for testing.

## 📝 Updating the Homepage URL

Remember to update the `homepage` URL in `package.json` with your actual GitHub username:

```json
"homepage": "https://YOURUSERNAME.github.io/ThreeWiseMen/"
```

Replace `YOURUSERNAME` with your actual GitHub username.
Do both work?
