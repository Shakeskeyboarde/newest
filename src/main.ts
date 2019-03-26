import { readPackage } from "./readPackage";
import { updatePackage as resolveUpdates } from "./resolveUpdates";
import { printUpdates } from "./printUpdates";
import { countDependencies } from "./countDependencies";
import chalk from "chalk";
import { confirmUpdates } from "./confirmUpdates";
import { applyUpdates } from "./applyUpdates";

export default async () => {
  const {indent, pkg} = await readPackage();
  const updates = await resolveUpdates(pkg);
  const updateCount = countDependencies(updates);

  if (updateCount === 0) {
    console.log(chalk.gray("All packages are up to date."));
    process.exit(0);
  }

  printUpdates(updates);

  if (!await confirmUpdates()) {
    console.log(chalk.gray(`No changes have been made to "package.json".`));
    return;
  }
  
  await applyUpdates(indent, pkg, updates);

  console.log(chalk.gray(`Updated ${updateCount} "package.json" dependency versions.`));
  console.log(chalk.gray(`* Remember to run "npm update" to install the updated package versions.`));
};