# Newest

Interactively update dependency versions in `package.json`, to their "newest" release (non-tagged) versions.

- Only affects dependencies with caret (`^`) versions.
- Only modifies `package.json`.
- Interactively select the packages to update.

**Author's Note:** I'm hereby coopting the word "newest" (as opposed to "latest") to mean "latest release (un-tagged) versions".

## Getting started

1. Run `npx newest` command.
   - It will exit silently if the environment is not interactive (non-TTY).
   - It will exit silently if no updates are available.
2. Answer yes to the prompt asking if you want to update packages.
   - It will exit silently if no answer is received within 10 seconds.
   - _You can skip this prompt and assume interactivity by using the `-i` option._
3. Select the updates you want to apply.
   - _You can skip this prompt and update all packages by using the `-a` option._
4. Run `yarn` or `npm install` to _apply_ the changes to your `package.json` file.

If you only want to update certain packages, you can use glob pattern arguments. For example, the following would only update `@babel` scoped packages, _except_ for `@babel/core`

```bash
npx newest "@babel/*" "!@babel/core"
```

**Optional:** Add the `npx newest` command to your `package.json` file "preinstall" script to keep your project evergreen.

## Why only caret versions?

- That's the default version range when adding a new package using `npm` or `yarn`. So, it's likely that the range and current version are simply what was there when the package was added.
- It indicates that you are reasonably open to version updates.
- More limiting ranges (e.g. `~`) or exact versions probably indicate a "pinned" version.
- More expansive ranges (e.g. `*` or `>=`) also probably indicate some "special" circumstance, so better to leave them alone.

## Why update to the newest version?

A version range is useful in allowing others who install your package to get small (probably safe) updates to transitive dependencies. You _could_ use an open ended range (i.e. `>=`), but there's a strong risk of future incompatibility if you do so.

So, a well maintained package should also have its explicit dependency version ranges regularly updated. Otherwise, it may stop working, have open vulnerabilities, or become incompatible with the ecosystem at large.

## Why is this better than the Yarn and NPM update solutions?

Both Yarn and NPM have an update/upgrade capability. Yarn has `yarn upgrade-interactive --latest`, and NPM has `npm update`. However, both solutions have some drawbacks.

- Installing an update, _but not updating `package.json`._
- Installing _only within the current range._
- Installing _pre-release versions._

They also cannot be added to the "preinstall" script if the project is used in a non-interactive pipeline.
