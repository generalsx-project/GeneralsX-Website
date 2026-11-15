# GeneralsX Website

Single-page static Astro website for **GeneralsX** (`https://generalsx.org`), the open-source, cross-platform port of the original *Command & Conquer: Generals* and *Zero Hour*.

## Project Identity & Architecture

- **Positioning**: GeneralsX is a faithful port of the original 2003 RTS—not a remake or a new game. Copy and visuals must reflect the original game, cross-platform online multiplayer (`stats.generalsx.org`), and community derivatives (WebGL/WebGPU, Android, iOS, VR).
- **Visual Theme**: Unified with `generalsx-stats` and `generalsx-login`—deep tactical slate (`#07090e`, `#0d111a`) with Generals gold (`#ffaa00`, `#ffbb33`) and tactical cyan (`#00d4ff`) in `src/styles/global.css`.
- **Single-Page Structure**: `src/pages/index.astro` hosts all sections (`#downloads`, `#ecosystem`, `#docs`, `#community`), with anchor navigation configured in `src/data/site.ts` and documentation links in `src/data/docs.ts`. Keep `src/pages/404.astro` and `src/pages/robots.txt.ts` as the only additional routes.
- **Release Validation**: `src/lib/releases.ts` fetches the latest `fbraz3/GeneralsX` release at build time and strictly validates all six Linux, macOS, and Windows artifacts for *Generals* and *Zero Hour*.

## Development & Verification

When starting the dev server, use background mode:

```sh
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Run all checks before finishing changes:

```sh
npm test
npm run check
npm run build
```

## Media & Licensing Policy

- Never commit raw retail *Command & Conquer: Generals* or *Zero Hour* game archives, textures, models, maps, audio, or video.
- Every image shipped in `src/assets/brand/` or `public/` must be recorded with its provenance, dimensions, and SHA-256 hash in `media-manifest.json` (see `NOTICE.md`).

## Astro Documentation

- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Routing](https://docs.astro.build/en/guides/routing/)
- [Styles and CSS](https://docs.astro.build/en/guides/styling/)
- [Images and assets](https://docs.astro.build/en/guides/images/)
