import prompts from "prompts";
import delay from "delay";
import chalk from "chalk";

export async function confirmInteractive(): Promise<boolean> {
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

    return false;
  }

  return true;
}
