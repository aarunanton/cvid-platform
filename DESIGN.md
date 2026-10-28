---
version: alpha
name: Universal-CV-ID
description: Universal CV ID (cvid.app) is a free CV checker, CV builder and job tracker for people who are not tech-savvy. The look is calm and premium (Notion and Apple restraint, Ramp's palette) on a warm cream canvas, with near-black ink, white cards, and one electric lime accent ({colors.accent}) used sparingly to mark the single most important thing on screen. Bricolage Grotesque for headings, Instrument Sans for everything else. Marketing pages are airy and centred on one action ("drop your CV here"); the app uses a Teal-style dark left sidebar with a cream workspace and 50:50 input/preview panes. The hiring side (companies and recruiters) uses the same shell, tokens and components, with a denser, faster-to-scan voice and a proof badge that shows how well each CV claim is backed.

colors:
  primary: "#1A1919"
  canvas: "#F4F2F0"
  surface: "#FFFFFF"
  surface-2: "#F1EFEC"
  surface-hover: "#EAE7E3"
  hairline: "#E6E3DF"
  hairline-strong: "#CBD2DD"
  ink: "#0C0A08"
  ink-2: "#3D3B39"
  ink-3: "#6D6C6B"
  night: "#1A1919"
  night-2: "#2A2928"
  night-line: "#3B3A38"
  on-night: "#FFFFFF"
  on-night-2: "#CFCDCA"
  on-night-3: "#A9A6A2"
  accent: "#E4F222"
  on-accent: "#0C0A08"
  accent-soft: "#F6FAC0"
  accent-text: "#4A5000"
  good: "#1F7A4D"
  good-soft: "#E3F2EA"
  warn: "#8A5A00"
  warn-soft: "#FBF0DC"
  bad: "#B3261E"
  bad-soft: "#FBE6E4"
  info: "#2B4A63"
  info-soft: "#EEF2F6"
  mark-high: "#F6D2CD"
  mark-high-tag: "#B8322A"
  mark-medium: "#F8E2B6"
  mark-medium-tag: "#8A5A00"
  mark-low: "#DCD3F4"
  mark-low-tag: "#5B3FB5"

typography:
  display:
    fontFamily: Bricolage Grotesque
    fontSize: 52px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.03em
  heading-1:
    fontFamily: Bricolage Grotesque
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.025em
  heading-2:
    fontFamily: Bricolage Grotesque
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.02em
  heading-3:
    fontFamily: Bricolage Grotesque
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.01em
  heading-4:
    fontFamily: Instrument Sans
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
  lede:
    fontFamily: Instrument Sans
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: Instrument Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Instrument Sans
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: Instrument Sans
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.3
  caption:
    fontFamily: Instrument Sans
    fontSize: 12.5px
    fontWeight: 500
    lineHeight: 1.3
  button:
    fontFamily: Instrument Sans
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1
  button-lg:
    fontFamily: Instrument Sans
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1

rounded:
  xs: 4px
  sm: 8px
  md: 10px
  lg: 16px
  full: 999px

spacing:
  sp-1: 4px
  sp-2: 8px
  sp-3: 12px
  sp-4: 16px
  sp-5: 24px
  sp-6: 32px
  sp-7: 48px
  sp-8: 64px
  sp-9: 96px
  gutter: clamp(16px, 3vw, 24px)
  section: clamp(48px, 7vw, 88px)
  wrap: 1200px
  read: 720px
  sidebar: 240px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-night}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  button-ghost:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-2}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  button-cta-pill:
    backgroundColor: "{colors.night}"
    textColor: "{colors.on-night}"
    typography: "{typography.button-lg}"
    rounded: "{rounded.full}"
    padding: "14px 28px"
  button-cta-pill-outline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-lg}"
    rounded: "{rounded.full}"
    padding: "14px 28px"
  button-cta-pill-on-night:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.button-lg}"
    rounded: "{rounded.full}"
    padding: "14px 28px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.sp-5}"
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.sp-5}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
  field-label:
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
  chip:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  tag-status-good:
    backgroundColor: "{colors.good-soft}"
    textColor: "{colors.good}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  tag-status-bad:
    backgroundColor: "{colors.bad-soft}"
    textColor: "{colors.bad}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  tag-hero:
    backgroundColor: "{colors.night}"
    textColor: "{colors.accent}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "5px 14px"
  sidebar:
    backgroundColor: "{colors.night}"
    textColor: "{colors.on-night-2}"
    width: "{spacing.sidebar}"
    padding: "20px 14px"
  sidebar-link-active:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.night}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
  fix-card:
    backgroundColor: "{colors.good-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
  toast:
    backgroundColor: "{colors.night}"
    textColor: "{colors.on-night}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: "11px 16px"
  site-close:
    backgroundColor: "{colors.night}"
    textColor: "{colors.on-night}"
    padding: "72px 32px 56px"
  highlight-high:
    backgroundColor: "{colors.mark-high}"
    textColor: "{colors.ink}"
  highlight-high-tag:
    backgroundColor: "{colors.mark-high-tag}"
    textColor: "{colors.on-night}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: "0 5px"
  highlight-medium:
    backgroundColor: "{colors.mark-medium}"
    textColor: "{colors.ink}"
  highlight-medium-tag:
    backgroundColor: "{colors.mark-medium-tag}"
    textColor: "{colors.on-night}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: "0 5px"
  highlight-low:
    backgroundColor: "{colors.mark-low}"
    textColor: "{colors.ink}"
  highlight-low-tag:
    backgroundColor: "{colors.mark-low-tag}"
    textColor: "{colors.on-night}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: "0 5px"
  tag-status-warn:
    backgroundColor: "{colors.warn-soft}"
    textColor: "{colors.warn}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  tag-status-info:
    backgroundColor: "{colors.info-soft}"
    textColor: "{colors.info}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  tag-new:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-text}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  field-hint:
    textColor: "{colors.ink-3}"
    typography: "{typography.body-sm}"
  drop-zone:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.lg}"
    padding: "{spacing.sp-7}"
  drop-zone-hover:
    backgroundColor: "{colors.surface-hover}"
  divider:
    backgroundColor: "{colors.hairline}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.hairline-strong}"
    height: 1px
  divider-on-night:
    backgroundColor: "{colors.night-line}"
    height: 1px
  proof-badge-0:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-2}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  proof-badge-1:
    backgroundColor: "{colors.info-soft}"
    textColor: "{colors.info}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  proof-badge-2:
    backgroundColor: "{colors.good-soft}"
    textColor: "{colors.good}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  proof-badge-3:
    backgroundColor: "{colors.good}"
    textColor: "{colors.on-night}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  proof-badge-4:
    backgroundColor: "{colors.night}"
    textColor: "{colors.on-night}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  requirement-met:
    backgroundColor: "{colors.good-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
  requirement-unproven:
    backgroundColor: "{colors.warn-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
  requirement-not-met:
    backgroundColor: "{colors.bad-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
  applicant-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: "{spacing.sp-5}"
  applicant-card-selected:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.sp-5}"
  footer-small-print:
    backgroundColor: "{colors.night}"
    textColor: "{colors.on-night-3}"
    typography: "{typography.caption}"
---

## Overview

Universal CV ID helps someone fix and send a CV without needing to understand recruiting, design or software. The design's job is to make that feel **calm, safe and obvious**. Most users are not technical. Design every screen so an 8-year-old could tell what to do next, but make it look like a premium product for adults: no emojis, mascots, confetti or cartoon illustration.

The same system serves the hiring side. Companies and recruiters get the same night sidebar, cream workspace and tokens; only the voice (see Content and tone) and a few components (see Hiring side) differ. Nothing here is a separate brand.

The visual language borrows three references:

- **Ramp** for the palette: warm off-white canvas, near-black ink, one electric lime accent.
- **Notion and Apple** for restraint: lots of space, few colours on screen, flat surfaces, short sentences.
- **Teal** for the app structure: a dark left sidebar listing the tools, with the work area on the right.

**Key characteristics**

- Warm cream canvas ({colors.canvas}) with white cards ({colors.surface}) separated by hairlines, not shadows.
- Near-black ({colors.night}) for primary actions, the app sidebar, and the closing band of every public page.
- Lime ({colors.accent}) appears **once per view** as a highlight: the active sidebar item, one highlighted word in a headline, or the main button on a dark band.
- Two typefaces only: Bricolage Grotesque for headings, Instrument Sans for everything else. Both are modern sans-serifs; no serif or classic fonts in the interface.
- One 4/8px spacing scale and one type scale on every page.
- The CV checker report reads like a Turnitin originality report: the user's own CV on the left with coloured highlights and numbered markers, the list of findings with a fix for each on the right.

## Colors

### Canvas and surfaces
- **Canvas** ({colors.canvas}): page background everywhere, marketing and app.
- **Surface** ({colors.surface}): cards, panels, inputs, the CV paper.
- **Surface 2** ({colors.surface-2}): chips, secondary button fills, quiet wells. **Surface hover** ({colors.surface-hover}) for hover on drop zones and cards.
- **Hairline** ({colors.hairline}): every 1px border on light surfaces. **Hairline strong** ({colors.hairline-strong}) only when a border must read on a white card inside a white panel.

### Ink
- **Ink** ({colors.ink}): headings and body text.
- **Ink 2** ({colors.ink-2}): ledes, labels, secondary text.
- **Ink 3** ({colors.ink-3}): hints, captions, placeholders. This is the lightest text allowed on cream or white (4.7:1 on cream).

### Night (dark areas)
- **Night** ({colors.night}): primary buttons, app sidebar, closing band, footer, toasts.
- **Night 2** ({colors.night-2}) for hover and notes inside dark areas; **Night line** ({colors.night-line}) for dividers on dark.
- Text on night: {colors.on-night} for headings, {colors.on-night-2} for body, {colors.on-night-3} for small print.

### Accent
- **Lime** ({colors.accent}) is a **fill only**. It never carries text or thin lines on a light background (contrast is 1.1:1 on cream). Use it as a background with {colors.on-accent} text, or as text/icon colour on {colors.night} (14:1).
- **Accent soft** ({colors.accent-soft}) for focus rings and gentle "new" tags. **Accent text** ({colors.accent-text}) when a lime-family word must appear as text on a light surface.

### Status
Each status has a strong colour for text/icons and a soft fill for backgrounds. Always pair them; never use a strong colour as a large fill.
- Good {colors.good} / {colors.good-soft}: passed checks, the suggested fix.
- Warn {colors.warn} / {colors.warn-soft}: worth improving.
- Bad {colors.bad} / {colors.bad-soft}: problems that cost interviews.
- Info {colors.info} / {colors.info-soft}: neutral notes, "beta" or "coming soon".

### Checker highlights
The report marks lines on the user's CV by priority, like Turnitin's source colours. Highlight with the soft colour; label with a small numbered tag in the strong colour with white text.
- High priority: {colors.mark-high} / {colors.mark-high-tag}
- Medium: {colors.mark-medium} / {colors.mark-medium-tag}
- Low: {colors.mark-low} / {colors.mark-low-tag}

Never colour the whole CV red and green. Highlight only the lines that need attention.

## Typography

### Font family
- **Bricolage Grotesque** (600, 700): headings h1 to h3, the brand wordmark, the user's name in the builder.
- **Instrument Sans** (400 to 700): body, labels, buttons, navigation, h4.
- Fonts are self-hosted from `assets/fonts/`. The extra families in that folder (EB Garamond, Merriweather, Source Serif, Lato, Figtree, IBM Plex) are **CV template fonts** for the paper preview and exported PDFs. Never use them in the interface.

### Hierarchy
| Token | Size | Weight | Line height | Use |
|---|---|---|---|---|
| `{typography.display}` | clamp(36px, 5vw, 52px) | 700 | 1.05 | Homepage hero only |
| `{typography.heading-1}` | clamp(32px, 4vw, 48px) | 700 | 1.08 | Page titles |
| `{typography.heading-2}` | clamp(26px, 2.6vw, 32px) | 700 | 1.15 | Section titles |
| `{typography.heading-3}` | 20px | 600 | 1.3 | Card and panel titles |
| `{typography.heading-4}` | 16px | 600 | 1.5 | FAQ questions, small headings |
| `{typography.lede}` | 18px | 400 | 1.55 | Intro paragraph under a title |
| `{typography.body}` | 16px | 400 | 1.5 | Marketing body text |
| `{typography.body-sm}` | 14px | 400 | 1.43 | App body text, inputs, buttons |
| `{typography.label}` | 13px | 600 | 1.3 | Form labels, chips, eyebrows |
| `{typography.caption}` | 12.5px | 500 | 1.3 | Small print, status tags |

### Principles
- Headings use negative letter-spacing that tightens as size grows (−0.01em at 20px to −0.03em at 52px).
- Sentence case everywhere: headings, buttons, labels, tags. No ALL CAPS except footer column headings.
- A headline may emphasise **one** phrase with `<em>`: a lime highlighter band behind the words on light backgrounds, lime text on night.
- Headlines are plain, specific promises ("Build a CV that gets read."). Max about 8 words; `text-wrap: balance`.
- The app is denser than the marketing site: body-sm (14px) is the default in the workspace.

## Layout

### Spacing system
All gaps, paddings and margins are steps of the 4/8px scale: {spacing.sp-1} 4, {spacing.sp-2} 8, {spacing.sp-3} 12, {spacing.sp-4} 16, {spacing.sp-5} 24, {spacing.sp-6} 32, {spacing.sp-7} 48, {spacing.sp-8} 64, {spacing.sp-9} 96. Use the CSS custom properties `--sp-1` to `--sp-9`, never a raw number.

Rule: **internal spacing never exceeds external spacing.** Cards pad 24 and sit 16 apart; sections sit {spacing.section} apart.

### Grid and containers
- Marketing content width {spacing.wrap} with {spacing.gutter} side padding. Reading pages (blog, FAQ, privacy) cap text at {spacing.read}.
- App: fixed {spacing.sidebar} night sidebar, cream workspace padded 32px 40px, content up to 1080px.
- **Two-pane tools** (builder, checker report, tailoring) split **50:50** input/preview on screens wider than 1000px and stack below. 40:60 is allowed for preview-heavy tools and for **list and detail** screens on the hiring side (applicant list on the left, the selected person on the right); never other ratios.
- Homepage hero: copy on the left, product picture on the right, wrapping to one column under about 900px.

### Whitespace
Generous on marketing pages (one idea per section), compact but never cramped in the app. If a screen feels busy, remove something before shrinking anything.

## Elevation and depth

The interface is flat. Separation comes from colour (white card on cream) and hairlines.
- No shadows on cards, panels, buttons or inputs.
- Shadows are allowed only on **floating product pictures** in the hero (the CV paper `0 12px 40px rgba(26,25,25,.18)`, the floating finding card `0 16px 48px rgba(26,25,25,.22)`), on toasts, and on menus or dialogs that float over content.
- No glassmorphism or gradients in the interface.

## Shapes

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Numbered highlight tags, focus outline |
| `{rounded.sm}` | 8px | Inputs, toasts, small images |
| `{rounded.md}` | 10px | App buttons, panels, sidebar links, fix cards |
| `{rounded.lg}` | 16px | Marketing cards, step cards, floating cards |
| `{rounded.full}` | 999px | Marketing CTAs, chips, status tags |

Two button shapes, two jobs: **pills** for the big page-level calls to action on public pages; **10px rectangles** for every button inside the app. Do not mix them on the same screen.

## Components

### Buttons
- **`button-cta-pill`**: the main action on a public page ("Check my CV"). Night fill, white text, 16px/600, padding 14px 28px, min width 190px. Hover {colors.night-2}.
- **`button-cta-pill-outline`**: the second action beside it. Transparent, 1.5px night border; hover fills white.
- **`button-cta-pill-on-night`**: main action on the dark closing band. Lime fill, ink text.
- **`button-primary`**: the one main action in an app view (Download PDF, Save). Night fill.
- **`button-accent`**: optional lime version of the main app action when it must stand out; always with a 1px ink border so its edge is visible on cream.
- **`button-secondary`**: everything else. White fill, hairline border.
- **`button-ghost`**: low-priority actions in toolbars.
- Destructive: secondary style with {colors.bad} text; on confirm, fills {colors.bad} with white text.
- One primary button per view. Labels are verbs that say the outcome ("Download PDF", not "Submit").
- Minimum height 40px (44px on touch). Pressed state moves down 1px.

### Cards and panels
- **`card`**: marketing content blocks, step cards ("1 Drop your CV"), blog cards. White, hairline, 16px radius, padding 24 (20 on mobile).
- **`panel`**: app work areas. White, no border, 10px radius, padding 24, stacked 16 apart.

### Inputs and forms
- **`input`**: white, hairline border, 8px radius, padding 10px 12px, 14px text. Dates and months 40px tall.
- **Focus**: border turns ink and a 3px {colors.accent-soft} ring appears. Keyboard focus elsewhere uses a 2px ink outline, offset 2px.
- **Labels** sit above the field in `{typography.label}` ink-2. Hints sit below in body-sm ink-3. Error text in {colors.bad} under the field, saying how to fix it.
- Upload drop zone: large white area with a dashed hairline border, one short instruction ("Drop your CV here, or choose a file"), accepted formats in caption text. Hover fills {colors.surface-hover}.

### Chips and tags
- **`chip`**: skills and keywords; full-round, surface-2 fill, 13px. Missing keyword: transparent with a dashed ink-3 border; on hover the border goes solid.
- **Status tags**: full-round soft fill with strong text (`tag-status-good`, `tag-status-bad`, warn and info versions likewise).
- **`tag-hero`**: the small night pill with lime text above the homepage headline. Once per page at most.

### Navigation
- **Public pages**: brand on the left, 3 to 5 text links, one pill CTA on the right. Active link has a 2px ink underline. Below 820px the links collapse.
- **App sidebar** (`sidebar`): night, 240px, fixed. Links are 15px/500 {colors.on-night-2} with a 20px stroke icon; hover {colors.night-2}; active is a lime fill with night text (`sidebar-link-active`). Counts sit in a small round badge at the right. A short note card and feedback link sit at the bottom.
- **Mobile app**: sidebar becomes a bottom tab bar with icon and short label, respecting the safe-area inset.

### Signature components
- **Checker report (Turnitin-style)**: left pane is the user's CV on white paper with priority highlights and numbered tags; right pane lists the findings in the same order. Each finding shows a status tag, one plain sentence on what is wrong, and a **`fix-card`** (good-soft fill, 1.5px good border, "Fix:" in bold green) with the suggested rewrite and a button to apply it. Clicking a finding scrolls to its highlight and back.
- **CV builder**: 50:50 form and live A4 preview. The preview is the real paper in the chosen CV template font; the form stays in Instrument Sans.
- **Floating hero picture**: a real CV fragment with two or three highlights, overlapped by a white finding card with its fix. Built in HTML/CSS, not a screenshot, so it stays sharp.
- **Closing band** (`site-close`): night background, centred headline with one lime phrase, a sentence, and two pill buttons. Appears at the end of every public page, followed by the night footer.
- **Coming soon / beta**: info-soft tag with info text. Never let an unfinished feature look clickable; point to the blog post that explains it.

## Hiring side

Companies and recruiters use the same app shell as candidates: night sidebar, cream workspace, 10px buttons, flat white panels. Their sidebar is labelled "Companies" and has a visible "Switch to job seeker" link at the bottom. What differs is below.

### Proof badge
Every claim on a CV (a job, a qualification, a registration) shows how well it is backed. Five levels, one badge each, always shown as a number and a name so colour never carries the meaning alone:

| Level | Name | Badge | Meaning |
|---|---|---|---|
| 0 | Self-declared | `proof-badge-0` (surface-2, ink-2) | The candidate says so. |
| 1 | Referee confirmed | `proof-badge-1` (info) | A named person confirmed it. |
| 2 | Employer or school confirmed | `proof-badge-2` (good-soft) | The organisation confirmed it from a verified address. |
| 3 | Register matched | `proof-badge-3` (good, white text) | Matched to a public register, within that register's terms. |
| 4 | Signed credential | `proof-badge-4` (night, white text, check icon) | A digitally signed credential. |

- Format: "Level 2: Employer confirmed". On narrow screens the number alone ("2") is allowed once the legend has been shown on the page.
- Lime is never used for proof. It stays the single highlight of the view.
- Higher is not "better" for every claim. A claim with no proof is normal; the badge says what is true, not who to reject. Never use red for level 0.
- A demo or sample badge is labelled "Sample" in an info tag. Never show a proof level that the system did not record.

### Requirement row
A job lists must-haves. On an applicant, each must-have is a row inside a panel:
- **Met** (`requirement-met`): good-soft fill, claim text, its proof badge.
- **Unproven** (`requirement-unproven`): warn-soft fill. The candidate claims it, but it is at level 0. Offers one **Ask for proof** button (`button-secondary`).
- **Not met** (`requirement-not-met`): bad-soft fill, no badge, no button.
- Order: not met first, then unproven, then met, so the recruiter sees what needs a decision before what is fine.
- Never more than five must-haves per job; the posting form says so.

### Applicant card
`applicant-card`: white, hairline, 16px radius, padding 24. Top line: name, role, county. Second line: the fit reason in one plain sentence ("Meets 4 of 5 must-haves; 2 backed by proof"). Below: up to three requirement rows, then the actions.
- One primary action per card (**Shortlist**, `button-primary`). Share, Not interested and Request to chat are `button-secondary` or `button-ghost`.
- Pay expectation and availability sit in caption text under the name, in euro.
- Selected state: 2px ink border (`applicant-card-selected`), never a lime border.
- Ranking always shows its reasons. No bare scores.

### Lists, tables and density
- Hiring screens use `body-sm` (14px) throughout and may place up to eight applicant rows above the fold. The "three findings above the fold" rule applies to candidate-facing reports only.
- Filters sit in a collapsible panel above the list on phones, and in a left rail on desktop.
- Status changes (Applied, Interview, Hired, Declined) always say whether the candidate was told. A change that notifies the candidate shows "Candidate will be told" as an info tag before it is confirmed.

## Content and tone
- Write for someone who is nervous about their CV. Short sentences, everyday words, second person ("your CV").
- Say what happens next before it happens ("We read your CV on this device. Nothing is uploaded.").
- One idea per section, one action per screen.
- No jargon: say "what recruiters notice", not "ATS parsing heuristics".
- Present Universal CV ID as an ongoing project changing how recruitment works, for candidates and companies; future features are labelled "coming soon", never promised dates.

### Hiring-side voice
- Write for a busy recruiter who is scanning. Lead with the answer ("4 of 5 must-haves met"), then the reason.
- Same plain words and sentence case as the candidate side. Numbers are welcome; jargon and buzzwords are not ("shortlist", not "talent pipeline").
- Show what is proven and what is not, without judging the person. Say "Self-declared", never "Unverified" or "Suspicious".
- Never invent figures. Sample data is always labelled as sample; pricing that is not decided says "Planned", not a price.
- Pay is shown in euro as a range. A job without a pay range cannot be published.

## Do's and Don'ts

### Do
- Keep lime to one element per view.
- Use night for primary actions on light backgrounds; lime for primary actions on night.
- Use tokens (`var(--sp-4)`, `var(--ink-2)`) instead of raw values.
- Apply any type or spacing change to every page in the same commit.
- Show the user's own CV as the product picture.
- Keep two-pane tools at 50:50 (list and detail screens may use 40:60).
- Show every proof badge as a number plus a name.
- Show the reasons behind every ranking.

### Don't
- Don't put lime text, lime borders or lime icons on cream or white.
- Don't add emojis, mascots, confetti, stock photos or illustrated people.
- Don't add shadows to cards or panels.
- Don't use serif fonts, or CV template fonts, in the interface.
- Don't mark the entire CV red/green; highlight only what needs attention.
- Don't show more than one primary button, or more than three findings above the fold, at once.
- Don't add a dark mode or theme switcher; the site has one theme.
- Don't use lime, red or a padlock/shield icon to signal proof; use the badge.
- Don't show a bare score or rank without its reasons.
- Don't mix a candidate's contact details into a list before they have agreed to share them.

## Responsive behavior

### Breakpoints
| Name | Width | Key changes |
|---|---|---|
| Phone | < 560px | Single column, 16px gutters, pill CTAs go full width, app tabs move to a bottom bar |
| Large phone | 560–819px | Feature rows stack, hero picture below the copy |
| Tablet | 820–1000px | Nav links visible, two-pane tools still stacked |
| Desktop | > 1000px | Sidebar app shell, 50:50 two-pane tools |
| Wide | ≥ 1240px | Content capped at {spacing.wrap}; two-pane tools up to 1680px |

### Touch targets
Buttons, sidebar links and tabs are at least 44px tall on touch screens; chips at least 32px with 8px spacing.

### Collapsing strategy
- Hero: copy first, picture second; hero picture height drops from 500px to 460px.
- Step cards and feature rows: three across, then one column.
- Checker report: on phones the findings list comes first, each finding with an "Show on my CV" link that opens the highlighted line.
- Footer: columns wrap to two, then one.

## Iteration guide
1. Change one component at a time and name the token you are changing.
2. Add new variants as new `components:` entries; do not invent new colours outside `colors:`.
3. Run `npx @google/design.md lint DESIGN.md` after editing this file.
4. Before redesigning a screen, look at how two or three real, current sites (Teal, Rezi, Enhancv, Notion, Ramp) solve the same problem, and keep the result human-centred.

## Known gaps (to tidy in the CSS)
These come from the current code in `assets/styles.css` and `assets/shell.css` (v39) and should be brought in line with this file:
- `styles.css` stacks several older themes (slate/lime, dark mode, Ramp mock, v36). The Ramp block and the v36 block are the live ones; the older blocks and the dark-mode tokens can be deleted.
- `shell.css` hard-codes hex values (`#1A1919`, `#E4F222`, `#5A5855`, `#44423F`) instead of tokens; there are two creams (`#F4F2F0` in styles, `#F3F2F0` in shell) and two hairlines (`#E5E7EB` cool, `#E6E3DF` warm). This file standardises on `#F4F2F0` and `#E6E3DF`.
- `.btn-primary` is currently lime on cream with no visible edge; switch to `button-primary` (night) or add the 1px ink border of `button-accent`.
- The homepage's medium-priority tag (`.hm-paper .s2`, `#B7791F`) fails contrast with white text (3.6:1); this file uses `#8A5A00` (6.4:1).
- `--mono` is mapped to the body font; the `.pill` rule still asks for mono uppercase and is overridden later. Simplify to the status-tag style.
- Hiring-side CSS (v40 to v42: `.hr-*`, `.ap-*`, `.bd-*`, `.ft-*`, `.cd-*`, `.cj-*` in `shell.css`) was written before the Hiring side section. Audit it for raw hex values, more than one lime element per view, shadows on cards, and more than one primary button per view or card.
- Proof badges, requirement rows and the applicant card are specified here but not yet built; the current demo shows a simple Verified badge only.
- Animation timings are not tokenised; current practice is 150ms ease for colour changes and 200ms for toasts.
