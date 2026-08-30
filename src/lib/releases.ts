const RELEASE_API = 'https://api.github.com/repos/fbraz3/GeneralsX/releases/latest';

export type Platform = 'Linux' | 'macOS' | 'Windows';
export type Edition = 'Generals' | 'Zero Hour';

export interface DownloadAsset {
	name: string;
	url: string;
	size: number;
	downloadCount: number;
	platform: Platform;
	edition: Edition;
}

export interface LatestRelease {
	name: string;
	tag: string;
	url: string;
	publishedAt: string;
	assets: DownloadAsset[];
}

interface AssetRule {
	pattern: RegExp;
	platform: Platform;
	edition: Edition;
}

const assetRules: AssetRule[] = [
	{ pattern: /^(?:GeneralsX-linux|Linux-GeneralsX)\.flatpak$/i, platform: 'Linux', edition: 'Generals' },
	{ pattern: /^(?:GeneralsXZH-linux|Linux-GeneralsXZH)\.flatpak$/i, platform: 'Linux', edition: 'Zero Hour' },
	{ pattern: /^(?:macos-generalsx-app|macOS-GeneralsX)\.tar\.zip$/i, platform: 'macOS', edition: 'Generals' },
	{ pattern: /^(?:macos-generalsxzh-app|macOS-GeneralsXZH)\.tar\.zip$/i, platform: 'macOS', edition: 'Zero Hour' },
	{ pattern: /^(?:generalsx-windows-x86|Windows-GeneralsX)\.zip$/i, platform: 'Windows', edition: 'Generals' },
	{ pattern: /^(?:generalsxzh-windows-x86|Windows-GeneralsXZH)\.zip$/i, platform: 'Windows', edition: 'Zero Hour' },
];

function asRecord(value: unknown, label: string): Record<string, unknown> {
	if (typeof value !== 'object' || value === null || Array.isArray(value)) {
		throw new Error(`Invalid GitHub release payload: ${label} must be an object.`);
	}

	return value as Record<string, unknown>;
}

function requiredString(record: Record<string, unknown>, key: string, label: string) {
	const value = record[key];
	if (typeof value !== 'string' || value.length === 0) {
		throw new Error(`Invalid GitHub release payload: ${label}.${key} must be a non-empty string.`);
	}
	return value;
}

function requiredNumber(record: Record<string, unknown>, key: string, label: string) {
	const value = record[key];
	if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
		throw new Error(`Invalid GitHub release payload: ${label}.${key} must be a positive number.`);
	}
	return value;
}

function parseRelease(payload: unknown): LatestRelease {
	const release = asRecord(payload, 'release');
	const rawAssets = release.assets;

	if (!Array.isArray(rawAssets)) {
		throw new Error('Invalid GitHub release payload: release.assets must be an array.');
	}

	const assets = rawAssets.flatMap((value, index): DownloadAsset[] => {
		const asset = asRecord(value, `release.assets[${index}]`);
		const name = requiredString(asset, 'name', `release.assets[${index}]`);
		const rule = assetRules.find(({ pattern }) => pattern.test(name));

		if (!rule) {
			return [];
		}

		return [
			{
				name,
				url: requiredString(asset, 'browser_download_url', `release.assets[${index}]`),
				size: requiredNumber(asset, 'size', `release.assets[${index}]`),
				downloadCount: requiredNumber(
					asset,
					'download_count',
					`release.assets[${index}]`,
				),
				platform: rule.platform,
				edition: rule.edition,
			},
		];
	});

	const missingAssets = assetRules.filter(
		(rule) =>
			!assets.some(
				(asset) => asset.platform === rule.platform && asset.edition === rule.edition,
			),
	);

	if (missingAssets.length > 0) {
		const expected = missingAssets
			.map(({ platform, edition }) => `${platform} ${edition}`)
			.join(', ');
		throw new Error(
			`Latest GeneralsX release is missing expected download assets: ${expected}. Update the website asset rules before publishing.`,
		);
	}

	return {
		name: requiredString(release, 'name', 'release').replace(/\s+/g, ' '),
		tag: requiredString(release, 'tag_name', 'release'),
		url: requiredString(release, 'html_url', 'release'),
		publishedAt: requiredString(release, 'published_at', 'release'),
		assets,
	};
}

async function fetchLatestRelease() {
	const headers: Record<string, string> = {
		Accept: 'application/vnd.github+json',
		'User-Agent': 'GeneralsX-Website-build',
		'X-GitHub-Api-Version': '2022-11-28',
	};
	const token = process.env.GITHUB_TOKEN?.trim();

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	const response = await fetch(RELEASE_API, {
		headers,
		signal: AbortSignal.timeout(15_000),
	});

	if (!response.ok) {
		throw new Error(
			`GitHub release request failed with ${response.status} ${response.statusText}.`,
		);
	}

	return parseRelease(await response.json());
}

let releasePromise: Promise<LatestRelease> | undefined;

export function getLatestRelease() {
	releasePromise ??= fetchLatestRelease();
	return releasePromise;
}

export function formatBytes(bytes: number) {
	return new Intl.NumberFormat('en', {
		style: 'unit',
		unit: 'megabyte',
		unitDisplay: 'short',
		maximumFractionDigits: 1,
	}).format(bytes / 1_000_000);
}

export function formatReleaseDate(isoDate: string) {
	return new Intl.DateTimeFormat('en', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		timeZone: 'UTC',
	}).format(new Date(isoDate));
}
