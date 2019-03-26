import { getLatestVersion } from "./getLatestVersion";
import { IDependencies } from "./IDependencies";
import { IPackage, DEPENDENCY_KEYS } from "./IPackage";
import compareVersions from "compare-versions";

const RX_VERSION = /^(>|>=|<|<=|~|\^)?([^\s]+)$/;

export async function updatePackage(pkg: IPackage): Promise<IPackage> {
  const updates: IPackage = {};

  for (const key of DEPENDENCY_KEYS) {
    if (pkg[key] !== undefined) {
      const dependencies = await updateDependencies(pkg[key]!);

      if (dependencies !== undefined)
        updates[key] = dependencies;
    }
  }

  return updates;
}

async function updateDependencies(dependencies: IDependencies): Promise<IDependencies | undefined> {
  const updates: IDependencies = {};
  let updated = false;

  for (const name of Object.keys(dependencies)) {
    try {
      const match = RX_VERSION.exec(dependencies[name]);

      if (match === null)
        continue;
      
      const [, range, currentVersion] = match;
      const latestVersion = await getLatestVersion(name);

      if (compareVersions(latestVersion, currentVersion) === 1) {
        updates[name] = `${range}${latestVersion}`;
        updated = true;
      }
    } catch (_err) {
      // Silently ignore missing packages/versions.
    }
  }
  
  return updated ? updates : undefined;
}
