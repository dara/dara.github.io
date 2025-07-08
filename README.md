# Dara Kilicoglu Portfolio Website

A personal portfolio website showcasing design work and projects, built with HTML, CSS (Tailwind), and JavaScript.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server with live reload
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
dara.github.io/
├── src/                          # Source files
│   ├── styles.css               # Compiled Tailwind CSS (auto-generated)
│   ├── tailwind.styles.css      # Tailwind source file
│   ├── scripts.js               # Main JavaScript file
│   ├── images/                  # Project images
│   └── favicon.png              # Site favicon
├── work/                        # Project case study pages
│   ├── donkey-republic.html
│   ├── easisure.html
│   ├── flavor-tree.html
│   └── neol.html
├── apps/                        # Standalone applications
│   ├── flavor-tree/             # Interactive flavor tree app
│   └── neol-id-generator/       # ID generator tool
├── scripts/                     # Build scripts
│   └── cache-bust.js            # Cache-busting automation
├── index.html                   # Homepage
├── information.html             # About page
└── package.json                 # Dependencies and scripts
```

## 🔄 Cache-Busting System

### Why Cache-Busting?

Browsers cache CSS and JavaScript files to improve loading speed. However, when you update these files, users might still see the old cached versions. Cache-busting forces browsers to download fresh files by adding version parameters to file URLs.

### How It Works

The cache-busting system automatically appends timestamp query parameters to CSS and JS file references:

```html
<link href="./src/styles.css?v=1751973082667" rel="stylesheet">
<script src="./src/scripts.js?v=1751973082667" defer></script>
```

### The Cache-Bust Script

The `scripts/cache-bust.js` file:
- Scans all HTML files in the project
- Finds CSS and JS file references
- Adds or updates `?v=timestamp` parameters
- Ensures all files get the same timestamp for consistency

## 📜 Available Scripts

### `npm run dev`
Starts development environment with:
- Tailwind CSS compilation with watch mode
- Live server with auto-reload on port 3000
- Real-time CSS updates as you edit `tailwind.styles.css`

### `npm run build`
Production build process:
1. Compiles and minifies Tailwind CSS
2. Runs cache-busting on all HTML files
3. Ready for deployment

### `npm run cache-bust`
Manually updates all HTML files with new cache-busting parameters. Run this whenever you want to force browsers to reload your CSS/JS files.

### `npm run tailwind`
Watches and compiles Tailwind CSS only (without live server).

### `npm run serve`
Starts live server only (without Tailwind compilation).

## 🎨 Styling Guidelines

- **Primary CSS file**: `src/tailwind.styles.css` (edit this file)
- **Generated CSS**: `src/styles.css` (auto-generated, don't edit directly)
- Use Tailwind utility classes throughout the HTML
- Custom styles can be added to `tailwind.styles.css` using Tailwind directives

## 🚢 Deployment

### GitHub Pages
1. Run production build: `npm run build`
2. Commit and push changes to `main` branch
3. GitHub Pages automatically deploys the site

### Manual Deployment
1. Run `npm run build`
2. Upload all files to your web server
3. The cache-busting ensures users get fresh assets

## 🔧 Cache-Busting Workflow

### During Development
- Use `npm run dev` for normal development
- CSS changes are automatically compiled and reflected
- No need to run cache-bust during development

### Before Deployment
- Always run `npm run build` before deploying
- This ensures all HTML files reference the latest assets
- Users will download fresh CSS/JS files instead of cached versions

### Emergency Cache Clear
- If users report seeing old styles after deployment
- Run `npm run cache-bust` and redeploy
- This generates new timestamps for all asset references

## 📋 Best Practices

1. **Always build before deploying**: Use `npm run build`
2. **Don't edit generated files**: Only edit `tailwind.styles.css`, not `styles.css`
3. **Test locally**: Use `npm run dev` to preview changes
4. **Version your assets**: The cache-bust script handles this automatically
5. **Keep images optimized**: Use WebP format when possible

## 🐛 Troubleshooting

### CSS Changes Not Showing
- Run `npm run cache-bust` to force fresh CSS loading
- Clear browser cache manually (Cmd+Shift+R / Ctrl+Shift+R)
- Check if Tailwind compilation completed successfully

### Live Server Not Starting
- Make sure port 3000 is available
- Try `npm run serve` to start server without Tailwind watching

### Cache-Bust Script Fails
- Check that all HTML files are valid
- Ensure Node.js permissions for file writing
- Verify file paths in HTML references are correct

## 🔗 Links

- **Live Site**: [https://dara.github.io](https://dara.github.io)
- **Tailwind CSS**: [https://tailwindcss.com](https://tailwindcss.com)
- **GitHub Pages**: [https://pages.github.com](https://pages.github.com)

---

*Last updated: Cache-busting system implemented for reliable asset delivery* 