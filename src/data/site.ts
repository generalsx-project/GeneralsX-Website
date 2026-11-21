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
	playOnline: 'https://play.generalsx.org/',
	ecosystemPorts: 'https://github.com/fbraz3/GeneralsX/discussions/436',
	stats: 'https://stats.generalsx.org',
	login: 'https://login.generalsx.org',
	installation:
		'https://github.com/fbraz3/GeneralsX/blob/main/docs/HOWTO/INSTALLATION.md',
	gameFiles:
		'https://github.com/fbraz3/GeneralsX/blob/main/docs/HOWTO/GETTING_THE_GAME_FILES.md',
} as const;

export const navigation = [
	{ label: 'Home', href: pathFor('/'), external: false },
	{ label: 'Play in Browser', href: site.playOnline, external: true },
	{ label: 'Ecosystem', href: `${pathFor('/')}#ecosystem`, external: false },
	{ label: 'Downloads', href: `${pathFor('/')}#downloads`, external: false },
	{ label: 'Docs', href: `${pathFor('/')}#docs`, external: false },
	{ label: 'Community', href: `${pathFor('/')}#community`, external: false },
] as const;
