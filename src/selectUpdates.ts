import prompts from 'prompts';

export async function selectUpdates(
  minVersions: Map<string, string>,
  updateVersions: Map<string, string>
): Promise<Map<string, string>> {
  const updates = new Map<string, string>();

  const selected =
    (
      await prompts({
        type: "multiselect",
        name: "value",
        message: "Pick Updates",
        choices: [...updateVersions.keys()].map((name) => {
          return {
            title: `${name}: ${minVersions.get(name)} -> ${updateVersions.get(
              name
            )}`,
            value: name,
          };
        }),
        instructions: false,
        hint: "[space] to select, [enter] to submit, [a] for all",
      } as any)
    ).value ?? ([] as string[]);

  for (const name of [...updateVersions.keys()]) {
    if (selected.includes(name)) {
      updates.set(name, updateVersions.get(name)!);
    }
  }

  return updates;
}
