import assert from 'node:assert/strict';
import { test } from 'node:test';

const currentNames = [
	'Linux-GeneralsX.flatpak',
	'Linux-GeneralsXZH.flatpak',
	'macOS-GeneralsX.zip',
	'macOS-GeneralsXZH.zip',
	'Windows-GeneralsX.zip',
	'Windows-GeneralsXZH.zip',
];
const legacyNames = [
	'GeneralsX-linux.flatpak',
	'GeneralsXZH-linux.flatpak',
	'macos-generalsx-app.tar.zip',
	'macos-generalsxzh-app.tar.zip',
	'generalsx-windows-x86.zip',
	'generalsxzh-windows-x86.zip',
];

function releasePayload(names = currentNames) {
	return {
		name: 'GeneralsX 1.0.1',
		tag_name: '1.0.1',
		html_url: 'https://github.com/fbraz3/GeneralsX/releases/tag/1.0.1',
		published_at: '2026-09-23T00:14:32Z',
		assets: names.map((name) => ({
			name,
			browser_download_url: `https://github.com/fbraz3/GeneralsX/releases/download/1.0.1/${name}`,
			size: 1024,
			download_count: 1,
		})),
	};
}

let importId = 0;
function freshReleaseModule() {
	return import(`../src/lib/releases.ts?test=${importId++}`);
}

for (const [label, names] of [
	['current ZIP packages', currentNames],
	['legacy packages', legacyNames],
	['legacy macOS suffix with current names', currentNames.map((name) =>
		name.startsWith('macOS-') ? name.replace('.zip', '.tar.zip') : name,
	)],
]) {
	test(`maps all six downloads from ${label}`, async (t) => {
		const payload = releasePayload(names);
		const request = t.mock.method(globalThis, 'fetch', async () => Response.json(payload));
		const { getLatestRelease } = await freshReleaseModule();
		const release = await getLatestRelease();
		assert.equal(await getLatestRelease(), release);
		assert.equal(request.mock.callCount(), 1);
		assert.deepEqual(
			release.assets.map(({ platform, edition }) => `${platform}/${edition}`),
			['Linux/Generals', 'Linux/Zero Hour', 'macOS/Generals', 'macOS/Zero Hour', 'Windows/Generals', 'Windows/Zero Hour'],
		);
		assert.deepEqual(release.assets.map(({ url }) => url), payload.assets.map(({ browser_download_url }) => browser_download_url));
	});
}

test('ignores unrelated archives rather than exposing them as game downloads', async (t) => {
	t.mock.method(globalThis, 'fetch', async () =>
		Response.json(releasePayload([...currentNames, 'macOS-GeneralsX-symbols.zip'])),
	);
	const { getLatestRelease } = await freshReleaseModule();
	assert.equal((await getLatestRelease()).assets.length, 6);
});

test('still rejects missing macOS editions', async (t) => {
	t.mock.method(globalThis, 'fetch', async () =>
		Response.json(releasePayload(currentNames.filter((name) => !name.startsWith('macOS-')))),
	);
	const { getLatestRelease } = await freshReleaseModule();
	await assert.rejects(getLatestRelease(), /missing expected download assets: macOS Generals, macOS Zero Hour/);
});

test('still rejects malformed matched download metadata', async (t) => {
	const payload = releasePayload();
	delete payload.assets[2].browser_download_url;
	t.mock.method(globalThis, 'fetch', async () => Response.json(payload));
	const { getLatestRelease } = await freshReleaseModule();
	await assert.rejects(getLatestRelease(), /browser_download_url must be a non-empty string/);
});

test('surfaces GitHub API failures', async (t) => {
	t.mock.method(globalThis, 'fetch', async () =>
		new Response(null, { status: 503, statusText: 'Service Unavailable' }),
	);
	const { getLatestRelease } = await freshReleaseModule();
	await assert.rejects(getLatestRelease(), /GitHub release request failed with 503 Service Unavailable/);
});
