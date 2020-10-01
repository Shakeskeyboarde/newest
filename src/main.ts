import chalk from "chalk";
import delay from "delay";
import prompts from "prompts";
import AbortController from "abort-controller";
import { applyUpdates } from "./applyUpdates";
import { readPackage } from "./readPackage";
import { resolveMinVersions } from "./resolveMinVersions";
import { resolveUpdateVersions } from "./resolveUpdateVersions";
import { selectUpdates } from "./selectUpdates";

export default async () => {
  let confirmAnswered = false;

  const confirmed = await Promise.race([
    prompts({
      type: "confirm",
      name: "value",
      message: "Do you want to update packages?",
    }).finally(() => {
      confirmAnswered = true;
    }),
    delay(5000).then(() => {
      if (!confirmAnswered) console.log();
    }),
  ]);

  if (!confirmed || !confirmed?.value) {
    if (confirmed == null) {
      console.log(chalk.gray("Confirmation timed out."));
    }

    process.exit(0);
  }

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
