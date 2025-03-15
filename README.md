# Portfolio

This repository contains the source code for my personal portfolio website, built with [Hugo](https://gohugo.io/).

## Overview

It was originally built with Eleventy and has been migrated to Hugo for improved performance and simpler maintenance.

## Local Development

### Prerequisites

- [Hugo](https://gohugo.io/getting-started/installing/) (Extended version recommended)

### Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/marianozunino/portfolio.git
   cd portfolio
   ```

2. Start the development server
   ```bash
   hugo server -D
   ```

3. View the site at http://localhost:1313/

## Building for Production

To build the site for production:

```bash
hugo --minify
```

The built site will be in the `public` directory.

## Structure

- `content/` - All content (written in Markdown)
  - `_index.md` - Home page
  - `about.md` - About page
  - `portfolio/` - Individual project pages
- `layouts/` - HTML templates
- `assets/` - Static assets (images, CSS, etc.)
- `config.yaml` - Site configuration

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the master branch.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
