import semver, { SemVer } from "semver";
import { DEPENDENCY_KEYS, IPackage } from "./types/IPackage";

export function resolveMinVersions(pkg: IPackage): Map<string, SemVer> {
  const minVersions = new Map<string, SemVer>();

  for (const key of DEPENDENCY_KEYS) {
    const versions = pkg[key];

    if (versions === undefined) continue;

    for (const name of Object.keys(versions)) {
      const version = versions[name];

      if (!/^\^\S+$/.test(version)) {
        continue;
      }

      const minVersion = semver.minVersion(version);
      const currentMinVersion = minVersions.get(name);

      if (
        minVersion &&
        (!currentMinVersion || semver.lt(minVersion, currentMinVersion, true))
      ) {
        minVersions.set(name, minVersion);
      }
    }
  }

  return minVersions;
}
