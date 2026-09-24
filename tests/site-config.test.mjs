import assert from 'node:assert/strict';
import { test } from 'node:test';

let importId = 0;
async function loadConfig(t, environment = {}) {
	const keys = ['GITHUB_REPOSITORY', 'PUBLIC_SITE_URL', 'PUBLIC_BASE_PATH'];
	const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
	t.after(() => {
		for (const key of keys) {
			if (previous[key] === undefined) delete process.env[key];
			else process.env[key] = previous[key];
		}
	});
	for (const key of keys) {
		if (environment[key] === undefined) delete process.env[key];
		else process.env[key] = environment[key];
	}
	return (await import(`../astro.config.mjs?test=${importId++}`)).default;
}

test('uses the production custom domain after the organization transfer', async (t) => {
	const config = await loadConfig(t, { GITHUB_REPOSITORY: 'generalsx-project/GeneralsX-Website' });
	assert.equal(config.site, 'https://generalsx.org');
	assert.equal(config.base, '/');
});

test('defaults local builds to the production custom domain', async (t) => {
	const config = await loadConfig(t);
	assert.equal(config.site, 'https://generalsx.org');
	assert.equal(config.base, '/');
});

test('keeps GitHub Pages project paths for forks', async (t) => {
	const config = await loadConfig(t, { GITHUB_REPOSITORY: 'example/website-fork' });
	assert.equal(config.site, 'https://example.github.io');
	assert.equal(config.base, '/website-fork');
});

test('honors explicit site and base overrides', async (t) => {
	const config = await loadConfig(t, {
		GITHUB_REPOSITORY: 'example/website-fork',
		PUBLIC_SITE_URL: 'https://example.com',
		PUBLIC_BASE_PATH: '/preview/',
	});
	assert.equal(config.site, 'https://example.com');
	assert.equal(config.base, '/preview');
});
