import { writeFile } from "fs";
import { SemVer } from "semver";
import { promisify } from "util";
import { DEPENDENCY_KEYS, IPackage } from "./types/IPackage";

const aWriteFile = promisify(writeFile);

export async function applyUpdates(
  indent: string,
  pkg: IPackage,
  versions: Map<string, SemVer>
) {
  pkg = { ...pkg };

  for (const key of DEPENDENCY_KEYS) {
    if (pkg[key]) {
      pkg[key] = { ...pkg[key] };

      for (const name of versions.keys()) {
        if (pkg[key]![name]) {
          pkg[key]![name] = `^${versions.get(name)}`;
        }
      }
    }
  }

  await aWriteFile("./package.json", JSON.stringify(pkg, null, indent));
}
