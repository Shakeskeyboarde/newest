import chalk from "chalk";
import commander from "commander";
import micromatch from "micromatch";
import { applyUpdates } from "./applyUpdates";
import { readPackage } from "./readPackage";
import { resolveMinVersions } from "./resolveMinVersions";
import { resolveUpdateVersions } from "./resolveUpdateVersions";
import { selectUpdates } from "./selectUpdates";
import { confirmInteractive } from "./confirmInteractive";

export default async () => {
  // Remove npm_* variables from the environment because they block correct
  // usage of the .npmrc file.
  Object.keys(process.env)
    .filter((key) => key.startsWith("npm_"))
    .forEach((key) => delete process.env[key]);

  const appPkg = require("../package.json");

  commander
    .storeOptionsAsProperties(false)
    .usage("newest [options] [globs...]")
    .version(appPkg.version, "-v, --version")
    .option("-a, --all", "Update everything without asking.")
    .option("-i, --interactive", "Skip the interactivity confirmation.")
    .on("--help", () => {
      console.log();
      console.log(
        "If any glob arguments are given, only matching packages will be updated."
      );
      console.log();
    })
    .parse(process.argv);

  const options = commander.opts();
  const globs = commander.args;

  if (!options.interactive && !process.stdout.isTTY) {
    return;
  }

  console.log(chalk.gray(`Newest ${appPkg.version}`));

  const { indent, pkg } = await readPackage();
  const minVersions = resolveMinVersions(pkg);

  if (globs.length > 0) {
    const matches = micromatch([...minVersions.keys()], globs, {});

    [...minVersions.keys()].forEach((key) => {
      if (!matches.includes(key)) {
        minVersions.delete(key);
      }
    });
  }

  const updateVersions = await resolveUpdateVersions(minVersions);

  if (updateVersions.size === 0) {
    console.log(chalk.gray("All packages are up to date."));
    process.exit(0);
  }

  if (!options.all && !options.interactive && !(await confirmInteractive())) {
    console.log(chalk.gray(`No changes have been made.`));
    process.exit(0);
  }

  const selectedUpdateVersions = options.all
    ? updateVersions
    : await selectUpdates(minVersions, updateVersions);

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
