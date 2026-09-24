// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const repository = process.env.GITHUB_REPOSITORY ?? 'generalsx-project/GeneralsX-Website';
const [owner, repositoryName] = repository.split('/');
const isProductionWebsite = repository === 'generalsx-project/GeneralsX-Website';

if (!owner || !repositoryName) {
	throw new Error(`GITHUB_REPOSITORY must use the "owner/repository" format. Received: ${repository}`);
}

const defaultSite = isProductionWebsite ? 'https://generalsx.org' : `https://${owner}.github.io`;
const site = process.env.PUBLIC_SITE_URL ?? defaultSite;
const configuredBase = process.env.PUBLIC_BASE_PATH ?? (isProductionWebsite ? '/' : `/${repositoryName}`);
const base = configuredBase === '/' ? '/' : `/${configuredBase.replace(/^\/|\/$/g, '')}`;

export default defineConfig({
	site,
	base,
	trailingSlash: 'always',
	integrations: [sitemap()],
	image: {
		responsiveStyles: true,
	},
});
