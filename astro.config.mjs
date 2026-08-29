// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const repository = process.env.GITHUB_REPOSITORY ?? 'arazmj/GeneralsX-Website';
const [owner, repositoryName] = repository.split('/');

if (!owner || !repositoryName) {
	throw new Error(`GITHUB_REPOSITORY must use the "owner/repository" format. Received: ${repository}`);
}

const site = process.env.PUBLIC_SITE_URL ?? `https://${owner}.github.io`;
const configuredBase = process.env.PUBLIC_BASE_PATH ?? `/${repositoryName}`;
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
