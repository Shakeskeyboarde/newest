import { memo } from "@xornot/memo";
import getPackageInfo from "package-json";

export const getLatestVersion = memo(async (packageName: string) => {
  const {version} = await getPackageInfo(packageName);
  return version as string;
});