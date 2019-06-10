import { IPackage, DEPENDENCY_KEYS } from "./IPackage";

export function countDependencies(pkg: IPackage) {
  let count = 0;

  for (const key of DEPENDENCY_KEYS) {
    if (pkg[key] !== undefined) count += Object.keys(pkg[key]!).length;
  }

  return count;
}
