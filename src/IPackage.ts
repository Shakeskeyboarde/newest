import { IDependencies } from "./IDependencies";

export const DEPENDENCY_KEYS: ReadonlyArray<keyof IPackage> = [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies"
];

export interface IPackage {
  dependencies?: IDependencies;
  devDependencies?: IDependencies;
  optionalDependencies?: IDependencies;
  peerDependencies?: IDependencies;
}
