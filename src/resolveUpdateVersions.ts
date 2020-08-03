import compareVersions from 'compare-versions';
import { getLatestVersion } from './getLatestVersion';

const RX_VERSION = /^(>|>=|<|<=|~|\^)?(\S+)$/;

export async function resolveUpdateVersions(
  versions: Map<string, string>
): Promise<Map<string, string>> {
  const maxVersions = new Map<string, string>();

  for (const name of versions.keys()) {
    try {
      const version = versions.get(name)!;
      const match = RX_VERSION.exec(version);

      if (match === null) continue;

      const [, range = "", versionNumber] = match;
      const maxVersion = await getLatestVersion(name);

      if (compareVersions(maxVersion, versionNumber) > 0) {
        maxVersions.set(name, `${range}${maxVersion}`);
      }
    } catch (_err) {
      // Silently ignore missing packages/versions.
    }
  }

  return maxVersions;
}
