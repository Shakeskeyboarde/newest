import compareVersions from 'compare-versions';
import { DEPENDENCY_KEYS, IPackage } from './types/IPackage';

export function resolveMinVersions(pkg: IPackage): Map<string, string> {
  const minVersions = new Map<string, string>();

  for (const key of DEPENDENCY_KEYS) {
    const versions = pkg[key];

    if (versions === undefined) continue;

    for (const name of Object.keys(versions)) {
      const minVersion = minVersions.get(name);

      if (!minVersion || compareVersions(minVersion, versions[name]) > 0) {
        minVersions.set(name, versions[name]);
      }
    }
  }

  return minVersions;
}
