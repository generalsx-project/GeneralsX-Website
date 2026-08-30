# GeneralsX Website

The standalone public website for [GeneralsX](https://github.com/fbraz3/GeneralsX), the open-source, cross-platform Command & Conquer: Generals and Zero Hour engine restoration.

The site is built with Astro and TypeScript, reads the latest public release metadata from GitHub at build time, and deploys as a static GitHub Pages project.

**Production:** <https://generalsx.org/>

## Development

Requirements:

- Node.js 22.12 or newer
- npm 11 or newer

Install and run:

```sh
npm ci
npm run dev
```

The production repository serves from `/` at `generalsx.org`. Forks default to their GitHub Pages project path.

Run the strict project checks and production build:

```sh
npm run check
npm run build
```

Preview the GitHub Pages path locally:

```sh
npm run preview
```

## Configuration

Astro derives its production owner and repository name from `GITHUB_REPOSITORY`. These optional variables override the generated URL:

| Variable | Purpose | Default |
|---|---|---|
| `GITHUB_REPOSITORY` | GitHub `owner/repository` identity | `arazmj/GeneralsX-Website` |
| `PUBLIC_SITE_URL` | Pages origin or custom domain | `https://generalsx.org` for this repository |
| `PUBLIC_BASE_PATH` | Project path, or `/` for a root/custom domain | `/` for this repository |
| `GITHUB_TOKEN` | Raises GitHub API limits during the build | Unauthenticated public API |

The build requests `fbraz3/GeneralsX`'s latest release and validates all six expected Linux, macOS, and Windows artifacts. It fails explicitly if the request or filename mapping changes so a deployment cannot silently publish incorrect download links.

## Deployment

1. Create the public website repository and push this project to its `main` branch.
2. Open **Settings → Pages** and select **GitHub Actions** as the source.
3. Run the `Deploy website` workflow or push to `main`.

`.github/workflows/verify.yml` checks pull requests. `.github/workflows/deploy-pages.yml` checks, builds, and deploys pushes to `main`; a scheduled build refreshes upstream release data daily.

The production repository publishes `public/CNAME` for `generalsx.org`. The domain's DNS must point its apex to GitHub Pages before HTTPS can be enforced.

If the repository is transferred or renamed, `astro.config.mjs`, canonical metadata, the sitemap, and `robots.txt` adapt automatically in GitHub Actions.

## Media policy

All publishable media must be listed in `media-manifest.json` with provenance, hashes, transformations, and AI-enhancement status. Project artwork is pinned to a specific upstream GeneralsX commit.

Do not add raw retail game archives, textures, models, maps, video, or audio. The presence of legally owned game data on a contributor's machine does not grant redistribution rights. Add future screenshots or derived visuals only after maintainer approval and a provenance update.

The current first-party artwork is large enough for its intended placement and has not been AI-upscaled. Astro generates responsive image widths and modern formats during the build.

## Content ownership

The canonical game repository remains the source of truth for:

- Releases and downloadable binaries
- Installation and build documentation
- Issues, discussions, and contribution rules
- Platform and feature status
- Licensing and project attribution

Website copy should link to those sources instead of duplicating long-lived technical instructions.

## License

Website source code is available under GPL-3.0-or-later. Media and trademarks are governed separately; see [LICENSE](LICENSE) and [NOTICE.md](NOTICE.md).
