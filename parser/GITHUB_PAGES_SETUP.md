# GitHub Pages Deployment

Your SAPUI5 app is now configured for GitHub Pages deployment!

## Setup Instructions

1. **Push to GitHub Repository**
   - Ensure your code is pushed to the `main` or `master` branch

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to **Pages** section
   - Under "Build and deployment"
   - Select **Deploy from a branch**
   - Choose branch: **gh-pages**
   - Click Save

3. **Automatic Deployment**
   - The GitHub Actions workflow (`deploy.yml`) will automatically:
     - Build the app when you push to `main`/`master`
     - Deploy the built app to the `gh-pages` branch
     - Make it available at `https://<username>.github.io/<repo-name>/`

## Files Created

- `.github/workflows/deploy.yml` - GitHub Actions workflow for CI/CD
- `ui5-deploy.yaml` - Deployment configuration (optional, for future customization)

## Manual Deployment (if needed)

If you need to deploy manually without GitHub Actions:

```bash
npm run build
npx gh-pages -d dist
```

Make sure you have `gh-pages` package installed:

```bash
npm install --save-dev gh-pages
```

## App Configuration

- The app now uses **SAPUI5 CDN** for framework resources
- Local resources (controllers, models, components) are served from the repo
- Relative paths ensure the app works correctly in the subdirectory

## Troubleshooting

If the app doesn't load:

1. Check GitHub Pages is enabled (Settings > Pages)
2. Verify `gh-pages` branch exists
3. Clear browser cache
4. Check browser console for resource loading errors
