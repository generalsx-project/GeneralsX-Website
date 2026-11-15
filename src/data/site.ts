const basePath = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');

export function pathFor(pathname = '/') {
	const cleaned = pathname.replace(/^\/|\/$/g, '');
	const isFile = /\/?[^/]+\.[^/]+$/.test(cleaned);
	const normalized = pathname === '/' ? '/' : `/${cleaned}${isFile ? '' : '/'}`;
	return `${basePath}${normalized}`;
}

export const site = {
	name: 'GeneralsX',
	tagline: 'Command & Conquer: Generals & Zero Hour, Cross-Platform.',
	description:
		'GeneralsX is an open-source, cross-platform port of the original Command & Conquer: Generals and Zero Hour for Linux, macOS, and Windows, featuring cross-platform online multiplayer.',
	repository: 'https://github.com/fbraz3/GeneralsX',
	releases: 'https://github.com/fbraz3/GeneralsX/releases',
	issues: 'https://github.com/fbraz3/GeneralsX/issues',
	newIssue: 'https://github.com/fbraz3/GeneralsX/issues/new/choose',
	discussions: 'https://github.com/fbraz3/GeneralsX/discussions',
	contributing: 'https://github.com/fbraz3/GeneralsX/blob/main/CONTRIBUTING.md',
	sponsor: 'https://github.com/sponsors/fbraz3',
	license: 'https://github.com/fbraz3/GeneralsX/blob/main/LICENSE.md',
	browserDemo: 'https://generals.wasm.ltd/',
	wasmRepo: 'https://github.com/origami-ltd/wasm-generals',
	androidPort: 'https://github.com/MYSOREZ/GeneralsZH-Android-Port/',
	iosPort: 'https://github.com/ammaarreshi/Generals-Mac-iOS-iPad',
	vrPort: 'https://github.com/Gonzorro/GeneralsVR',
	stats: 'https://stats.generalsx.org',
	login: 'https://login.generalsx.org',
	installation:
		'https://github.com/fbraz3/GeneralsX/blob/main/docs/HOWTO/INSTALLATION.md',
	gameFiles:
		'https://github.com/fbraz3/GeneralsX/blob/main/docs/HOWTO/GETTING_THE_GAME_FILES.md',
} as const;

export const navigation = [
	{ label: 'Home', href: pathFor('/') },
	{ label: 'Ecosystem', href: `${pathFor('/')}#ecosystem` },
	{ label: 'Downloads', href: `${pathFor('/')}#downloads` },
	{ label: 'Docs', href: `${pathFor('/')}#docs` },
	{ label: 'Community', href: `${pathFor('/')}#community` },
] as const;
