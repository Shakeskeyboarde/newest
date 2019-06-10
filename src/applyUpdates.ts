import { writeFile } from "fs";
import { promisify } from "util";
import { IPackage, DEPENDENCY_KEYS } from "./IPackage";

const aWriteFile = promisify(writeFile);

export async function applyUpdates(indent: string, pkg: IPackage, updates: IPackage) {
  pkg = { ...pkg };

  for (const key of DEPENDENCY_KEYS) {
    if (pkg[key] !== undefined) pkg[key] = { ...pkg[key], ...updates[key] };
  }

  await aWriteFile("./package.json", JSON.stringify(pkg, null, indent));
}
