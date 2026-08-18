# Radio Prywoz Design System

Редизайн зібраний шарами, щоб дизайн-схему можна було міняти без переписування сторінок.

## CSS Layers

1. `styles/tokens.css` — головні дизайн-токени: кольори, типографіка, spacing, radius, shadows, motion.
2. `styles/main.css` — базова сітка, header/footer і старі глобальні правила.
3. `styles/pages/*.css` — локальна верстка конкретних сторінок.
4. `styles/components.css` — повторювані компоненти: кнопки, фільтри, пагінація, форми, focus state.
5. `styles/open-fm-redesign.css` — тема редизайну поверх існуючих БЕМ-класів.

## What To Change First

- Palette: `--ds-color-*` in `styles/tokens.css`.
- Typography: `--ds-font-*`, `--ds-line-*`, `--ds-weight-*`.
- Spacing: `--ds-space-*` and `--gutter`.
- Radius: `--ds-radius-*`.
- Shadows and glow: `--ds-shadow-*`.
- Interaction speed: `--ds-motion-*`.

## Component Rules

- Keep page markup in BEM classes.
- Use existing component classes before adding new ones: `.button`, `.news-card`, `.gallery-card`, `.listen-player`, `.contact-form-card`.
- New pages should include CSS in the same order:

```html
<link rel="stylesheet" href="./styles/tokens.css">
<link rel="stylesheet" href="./styles/main.css">
<link rel="stylesheet" href="./styles/pages/page-name.css">
<link rel="stylesheet" href="./styles/components.css">
<link rel="stylesheet" href="./styles/open-fm-redesign.css">
```

## Current Theme

The active visual direction is inspired by Open FM:

- dark base `#0f142e`;
- system-ui typography;
- compact 4px card/button radius;
- blue and purple interactive accents;
- subtle hover elevation;
- high-contrast white text on dark surfaces.
