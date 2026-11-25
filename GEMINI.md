# Project Instructions - znojmo-autodoprava.cz

## Design & Identity
- **Brand Name:** ZNOJMO AUTODOPRAVA (ZNOJMO TRANSPORT in DE/EN).
- **Theme:** Clean Monochrome Dark Charcoal, Silver & Crisp White.
- **Brand Colors:**
  - Background: `#14161a` / `#1a1d23` (Charcoal / Anthracite)
  - Accent: `#ffffff` (Pure White) & `#cbd5e1` (Metallic Silver)
  - Text: `#f1f5f9` (Crisp Off-White)
- **Typography:** Always use **Inter** (Sans-Serif) for all text and headings.

## Technical Architecture
- **Framework:** React + TypeScript + Vite.
- **Styling:** Vanilla CSS (`src/index.css`, `src/App.css`).
- **Localization:** Full CZ, DE, and EN translations in `src/i18n.tsx` (always defaults to `cz` on load).
- **Vehicle Photos:** Located in `public/vozidla/` with SEO filenames (`01.jpg` to `06.jpg`) so they can be replaced directly on FTP without rebuilding.
- **Contact Form & Hosting:** Deployed from `dist/` to Active24.cz FTP (`public/send-mail.php` + `public/.htaccess`, reads `$smtp_pass` from `smtp-heslo.php` on FTP).
