import getPackageInfo from 'package-json';
import { memo } from '@xornot/memo';

export const getLatestVersion = memo(async (packageName: string) => {
  const { versions } = await getPackageInfo(packageName, {
    allVersions: true,
  });
  const version = Object.keys(versions)
    .filter((v) => !v.includes("-"))
    .sort()
    .slice(-1)[0];
  return version;
});
