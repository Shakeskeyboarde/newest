import prompts from "prompts";
import delay from "delay";
import chalk from "chalk";

export async function confirmInteractive(): Promise<boolean> {
  let confirmAnswered = false;

  const confirmed = await Promise.race([
    prompts({
      type: "confirm",
      name: "value",
      message: "Do you want to interactively update packages?",
    }).finally(() => {
      confirmAnswered = true;
    }),
    delay(10000).then(() => {
      if (!confirmAnswered) console.log();
    }),
  ]);

  if (!confirmed || !confirmed?.value) {
    if (confirmed == null) {
      console.log(chalk.gray("Interactive confirmation timed out."));
    }

    return false;
  }

  return true;
}
