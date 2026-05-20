# Design Brief — SaaS Billing Portal

| Attribute | Value |
|-----------|-------|
| **Theme** | Dark mode optimized with light mode support |
| **Primary Palette** | Deep electric blue (240°, primary data & CTAs) |
| **Secondary Palette** | Cool slate + vibrant cyan accents |
| **Tone** | Refined minimalism, data-forward, professional |
| **Display Font** | Space Grotesk (geometric, modern) |
| **Body Font** | DM Sans (neutral, highly legible) |
| **Shape Language** | Mixed radii: sharp (0), subtle (8px), medium (12px), generous (16px) |
| **Motion** | Smooth 0.3s cubic-bezier transitions on hover/interactive |
| **Differentiation** | Blue-primary enterprise (not generic tech purple); premium without excess |

## Color Palette

| Token | Light | Dark | Purpose |
|-------|-------|------|--------|
| Primary | 0.48/0.18/240° | 0.62/0.20/240° | Primary CTAs, charts, data highlights |
| Secondary | 0.75/0.06/240° | 0.28/0.06/240° | Elevated surface, secondary actions |
| Accent | 0.58/0.22/200° | 0.68/0.24/200° | Highlights, status changes (use sparingly) |
| Destructive | 0.55/0.24/30° | 0.62/0.22/30° | Cancel, delete, dangerous actions |
| Background | 0.98/0.01/0° | 0.09/0.01/240° | Main surface |
| Card | 1.0/0/0° | 0.14/0.01/240° | Content containers, elevation |
| Border | 0.88/0.02/240° | 0.20/0.02/240° | Subtle dividers |
| Chart-1 to Chart-5 | Vibrant blues | Bright blues | Data visualization palette |

## Structural Zones

| Zone | Treatment | Detail |
|------|-----------|--------|
| Header/Nav | `bg-card` + `border-b border-border` | Fixed elevation, blue primary for logo |
| Content Sections | Alternating `bg-background` (main), `bg-muted` (secondary) | Grid-based card layout, shadow-elevation on cards |
| Dashboard Grid | `gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | Responsive grid for widgets, charts, stats |
| Sidebar (Admin) | `bg-secondary` with `text-secondary-foreground` | Vertical navigation, highlight active routes |
| Footer | `bg-muted` + `border-t border-border` | Copyright, links |
| Modals | `bg-card` overlay, `shadow-elevation` | Centered, focused content |

## Component Patterns

- **Buttons**: Primary = `bg-primary text-primary-foreground` with `shadow-subtle` on hover; Secondary = `bg-secondary` with `text-secondary-foreground`
- **Cards**: `bg-card rounded-lg shadow-subtle` with `p-6` internal spacing
- **Forms**: `bg-input border border-border rounded-md` with `focus:ring-2 focus:ring-primary`
- **Charts**: Use chart-1 through chart-5 palette for data series
- **Tables**: Striped rows with `hover:bg-muted/50`, header `bg-muted` with `text-muted-foreground`
- **Badges**: Role badges = `bg-primary/10 text-primary`, status badges = semantic (success green, warning orange, destructive red)

## Motion & Interaction

- **Smooth transitions**: All interactive elements use `transition-smooth` utility (0.3s cubic-bezier)
- **Hover states**: Subtle elevation lift + slight opacity change on buttons
- **Loading**: Pulsing spinner using chart-1 color
- **Page transitions**: Fade in (100ms opacity increase)

## Constraints

- No gradients on backgrounds (use elevation + color instead)
- No drop shadows > 12px blur radius
- No animations > 0.4s duration
- No more than 2 font families in use
- Chart colors must maintain >= 4.5:1 contrast ratio
- Role badges use semantic sizing (small for chip, medium for inline)

## Signature Detail

Electric blue (#1E40AF equivalent in OKLCH) as primary accent creates a premium tech identity. Combined with geometric Space Grotesk headline font and minimal spacing, establishes distinctiveness vs. default SaaS aesthetic.
