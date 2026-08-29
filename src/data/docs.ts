import { site } from './site';

export const docGroups = [
	{
		eyebrow: 'Deploy',
		title: 'Start playing',
		description: 'Everything needed to bring your legally owned game data to GeneralsX.',
		links: [
			{
				title: 'Installation guide',
				description: 'Platform-specific setup for Linux, macOS, and Windows.',
				href: site.installation,
			},
			{
				title: 'Get the game files',
				description: 'Supported ways to obtain the original data you already own.',
				href: site.gameFiles,
			},
			{
				title: 'SagePatch configuration',
				description: 'Tune camera, scroll speed, draw distance, and quality-of-life settings.',
				href: 'https://github.com/fbraz3/GeneralsX/blob/main/docs/HOWTO/SAGEPATCH_CONFIGURATION.md',
			},
		],
	},
	{
		eyebrow: 'Build',
		title: 'Work on the engine',
		description: 'Reproducible build paths for contributors and platform maintainers.',
		links: [
			{
				title: 'Linux build guide',
				description: 'Configure, build, package, and troubleshoot the Linux target.',
				href: 'https://github.com/fbraz3/GeneralsX/blob/main/docs/BUILD/LINUX.md',
			},
			{
				title: 'macOS build guide',
				description: 'Build the Vulkan-backed Apple Silicon application bundles.',
				href: 'https://github.com/fbraz3/GeneralsX/blob/main/docs/BUILD/MACOS.md',
			},
			{
				title: 'Contributing',
				description: 'Code standards, review expectations, and contribution workflow.',
				href: site.contributing,
			},
		],
	},
	{
		eyebrow: 'Diagnose',
		title: 'Keep matches deterministic',
		description: 'Technical references for testing, reporting, and investigating problems.',
		links: [
			{
				title: 'Investigate desyncs',
				description: 'Trace cross-platform simulation divergence using deep CRC data.',
				href: 'https://github.com/fbraz3/GeneralsX/blob/main/docs/HOWTO/INVESTIGATING_DESYNCS.md',
			},
			{
				title: 'Known issues',
				description: 'Search active reports, limitations, and work in progress.',
				href: site.issues,
			},
			{
				title: 'Security policy',
				description: 'Report a vulnerability through the project’s documented process.',
				href: 'https://github.com/fbraz3/GeneralsX/blob/main/SECURITY.md',
			},
		],
	},
] as const;
