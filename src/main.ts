import chalk from 'chalk';
import prompts from 'prompts';
import { applyUpdates } from './applyUpdates';
import { readPackage } from './readPackage';
import { resolveMinVersions } from './resolveMinVersions';
import { resolveUpdateVersions } from './resolveUpdateVersions';
import { selectUpdates } from './selectUpdates';

export default async () => {
  const { indent, pkg } = await readPackage();
  const minVersions = resolveMinVersions(pkg);
  const updateVersions = await resolveUpdateVersions(minVersions);

  if (updateVersions.size === 0) {
    console.log(chalk.gray("All packages are up to date."));
    process.exit(0);
  }

  const selectedUpdateVersions = await selectUpdates(
    minVersions,
    updateVersions
  );

  if (selectedUpdateVersions.size === 0) {
    console.log(chalk.gray(`No changes have been made.`));
    process.exit(0);
  }

  await applyUpdates(indent, pkg, selectedUpdateVersions);

  console.log(
    chalk.yellow(
      `Remember to run "npm i" or "yarn" to apply the updated package versions.`
    )
  );
};
