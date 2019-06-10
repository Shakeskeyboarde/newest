import prompts from "prompts";

export async function confirmUpdates() {
  const { value } = await prompts({
    name: "value",
    type: "confirm",
    message: "Apply all version updates?"
  });

  return value;
}
