import prompts from "prompts";
import { SemVer } from "semver";

export async function selectUpdates(
  currentVersions: Map<string, SemVer | string>,
  updateVersions: Map<string, SemVer>
): Promise<Map<string, SemVer>> {
  const updates = new Map<string, SemVer>();

  const selected =
    (
      await prompts({
        type: "multiselect",
        name: "value",
        message: "Pick Updates",
        choices: [...updateVersions.keys()].map((name) => {
          return {
            title: `${name} (${currentVersions.get(
              name
            )} -> ${updateVersions.get(name)})`,
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
