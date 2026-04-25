# SAUL'S BLOG — Project Notes

Personal Hexo blog. The theme in `themes/anthropic/` is a pixel-perfect clone of anthropic.com.

## Design prime directive

The blog's visual language must stay 1:1 with anthropic.com — colors, background, typography, sizes, layout, spacing, radii. The source of truth is `Anthropic.pdf`. Any design change must be checked against it.

---

## 1. Fonts

Self-hosted official Anthropic variable fonts in `themes/anthropic/source/fonts/`:

| File | Family | Use |
|---|---|---|
| `AnthropicSans-Roman-Web.woff2` | Anthropic Sans | Logo, nav, hero title, UI labels, card titles |
| `AnthropicSerif-Roman-Web.woff2` | Anthropic Serif | Featured card title, post body, hero description, manifesto tagline, footer logo |
| `AnthropicMono-Roman-Web.woff2` | Anthropic Mono | Code blocks |

### @font-face (in style.css)

```css
@font-face {
  font-family: 'Anthropic Sans';
  src: url('../fonts/AnthropicSans-Roman-Web.woff2') format('woff2');
  font-weight: 300 800;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Anthropic Serif';
  src: url('../fonts/AnthropicSerif-Roman-Web.woff2') format('woff2');
  font-weight: 300 800;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Anthropic Mono';
  src: url('../fonts/AnthropicMono-Roman-Web.woff2') format('woff2');
  font-weight: 300 800;
  font-style: normal;
  font-display: swap;
}
```

### CSS variables

```css
:root {
  --font-sans:  'Anthropic Sans', -apple-system, sans-serif;
  --font-serif: 'Anthropic Serif', Georgia, serif;
  --font-mono:  'Anthropic Mono', 'Courier New', monospace;
}
```

### Usage rules (important — easy to get wrong)

| Element | Font | Weight |
|---|---|---|
| Logo `SAUL'S BLOG` | `--font-sans` | 700, letter-spacing 0.08em, uppercase |
| Nav links | `--font-sans` | 500, 15px |
| **Hero title** | **`--font-sans`** | **800, line-height 1.05, letter-spacing -0.03em** |
| Hero right description | `--font-serif` | 400, clamp(17–20px) |
| Featured card title | `--font-serif` | 400 (elegant, like "Project Glasswing") |
| Card titles (Latest posts) | `--font-sans` | 700 |
| Post/page title | `--font-sans` | 800 |
| Post body text | `--font-serif` | 400, 18px, line-height 1.7 |
| Labels / meta / DATE / CATEGORY | `--font-sans` | 500, 11–13px, uppercase |
| Code | `--font-mono` | 400 |

---

## 2. Colors (verified from Anthropic's official CSS)

```css
:root {
  --bg:         #F0EEE6;  /* ivory-medium — page background */
  --bg-alt:     #E8E6DC;  /* ivory-dark   — card backgrounds */
  --fg:         #191918;  /* near-black body text */
  --fg-sec:     #3D3929;  /* secondary text */
  --fg-muted:   #6B6456;  /* muted / meta text */
  --dark:       #191918;  /* featured card + footer */
  --dark-fg:    #F0EEE6;  /* text on dark */
  --dark-muted: #9B9588;
  --border:     #C8C1B4;  /* hairline dividers */
}
```

**Do not use** `#E8E2D6` (too dark) or `#FFFFFF` (pure white).

---

## 3. Typography sizes

```css
/* Hero title */
font-size: clamp(40px, 6vw, 72px);
font-weight: 800;
line-height: 1.05;
letter-spacing: -0.03em;

/* Hero description (right column, serif) */
font-size: clamp(17px, 2vw, 20px);
line-height: 1.5;

/* Post / page title */
font-size: clamp(28px, 4vw, 48px);
font-weight: 800;
line-height: 1.1;
letter-spacing: -0.02em;

/* Body text */
font-size: 18px;
line-height: 1.7;

/* Featured card title */
font-size: clamp(36px, 5vw, 56px);
font-weight: 400;  /* serif, elegant, not bold */
line-height: 1.08;
```

---

## 4. Layout

```css
/* Container */
max-width: 1280px;
padding: 0 40px;  /* 20px on mobile */

/* Hero — flexbox, NOT grid */
display: flex;
justify-content: space-between;
align-items: flex-start;
padding: 80px 40px 60px;
gap: 60px;
/* hero__left: flex: 0 1 60% */
/* hero__right: flex: 0 1 35%; padding-top: 12px */

/* Section vertical spacing: 80px between major sections */
```

---

## 5. Design rules

- Rounded cards: **16px radius** (not more)
- Buttons: **border-radius: 100px** (pill shape)
- **No box-shadows** anywhere
- **No gradients** on UI elements (only decorative visual in featured card)
- Featured card: dark `#191918` bg, cream text, serif title, cream pill CTA
- Footer: dark bg, serif logo mark top-left, 3-column link groups, sans small text

---

## 6. Stack

- Hexo 7, EJS templates, plain CSS only (no Tailwind, no SCSS)
- Minimal JS — only `source/js/search.js` on `/search/`
- Fully static

## 7. Not in scope

Tags, TOC, dark mode, comments, author cards, share buttons, reading time, related posts, excerpts, thumbnails, pagination.

## 8. Theme file map

```
themes/anthropic/
  layout/
    layout.ejs          shell
    index.ejs           home
    post.ejs            single post
    page.ejs            About, Links
    category.ejs        per-category archive
    categories.ejs      /categories/ index
    archive.ejs         /archives/
    search.ejs          /search/
    _partial/head.ejs
    _partial/header.ejs
    _partial/footer.ejs
  source/
    css/style.css       single stylesheet
    fonts/              3 × Anthropic woff2 files
    js/search.js        client-side search
```

## 9. Running locally

```
npm install
npx hexo clean && npx hexo server
```

New post:
```
npx hexo new "Post title"
```
Set `categories:` and `description:` in front-matter.
