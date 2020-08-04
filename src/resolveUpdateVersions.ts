import semver, { SemVer } from 'semver';
import { getLatestVersion } from './getLatestVersion';

export async function resolveUpdateVersions(
  versions: Map<string, SemVer>
): Promise<Map<string, SemVer>> {
  const maxVersions = new Map<string, SemVer>();

  for (const name of versions.keys()) {
    try {
      const version = versions.get(name)!;
      const maxVersion = await getLatestVersion(name);

      if (maxVersion && semver.gt(maxVersion, version)) {
        maxVersions.set(name, new SemVer(maxVersion));
      }
    } catch (_err) {
      // Silently ignore missing packages/versions or version errors.
    }
  }

  return maxVersions;
}
