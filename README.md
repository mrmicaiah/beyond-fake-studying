# Beyond Fake Studying

An 11ty-powered blog about evidence-based study techniques.

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Deployment

This site uses GitHub Pages with GitHub Actions. On push to main, the site is automatically built and deployed.

### Setup GitHub Pages

1. Go to repo Settings → Pages
2. Set Source to "GitHub Actions"
3. Create `.github/workflows/deploy.yml` with the 11ty build workflow

## Configuration

Edit `src/_data/site.json` to configure site settings, colors, and API connections.

## Adding Posts

Create markdown files in `src/posts/` with frontmatter:

```markdown
---
title: "Post Title"
date: 2026-01-28
excerpt: "Short description"
image: https://example.com/image.jpg
author: Author Name
tags:
  - tag1
  - tag2
---

Post content here...
```

---

Published by [Untitled Publishers](https://untitledpublishers.com)
