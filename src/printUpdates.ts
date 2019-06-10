import chalk from "chalk";
import { IPackage, DEPENDENCY_KEYS } from "./IPackage";

export function printUpdates(updates: IPackage) {
  for (const key of DEPENDENCY_KEYS) {
    const dependencies = updates[key];

    if (dependencies === undefined) continue;

    console.log(chalk.yellowBright(`Found Updated "${key}":`));

    for (const name of Object.keys(dependencies)) {
      console.log(`  ${chalk.blueBright(name)}: ${chalk.greenBright(dependencies[name])}`);
    }
  }
}
