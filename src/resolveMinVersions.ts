import semver, { SemVer } from 'semver';
import { DEPENDENCY_KEYS, IPackage } from './types/IPackage';

export function resolveMinVersions(pkg: IPackage): Map<string, SemVer> {
  const minVersions = new Map<string, SemVer>();

  for (const key of DEPENDENCY_KEYS) {
    const versions = pkg[key];

    if (versions === undefined) continue;

    for (const name of Object.keys(versions)) {
      const version = semver.minVersion(versions[name]);

      if (version == null) continue;

      const minVersion = minVersions.get(name);

      if (!minVersion || semver.lt(version, minVersion, true)) {
        minVersions.set(name, version);
      }
    }
  }

  return minVersions;
}
