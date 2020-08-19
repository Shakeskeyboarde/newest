import getPackageInfo from 'package-json';
import { compare } from 'semver';

const cache = new Map<string, string | undefined>();

export async function getLatestVersion(
  packageName: string
): Promise<string | undefined> {
  const cached = cache.get(packageName);

  if (cached) {
    return cached;
  }

  const { versions } = await getPackageInfo(packageName, {
    allVersions: true,
  });

  const version = Object.keys(versions)
    .filter((v) => !v.includes("-"))
    .sort(compare)
    .slice(-1)[0];

  cache.set(packageName, version);

  return version;
}
