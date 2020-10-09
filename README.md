# newest

Interactively update dependency versions in `package.json`, to their "newest" release (non-tagged) versions.

- Interactive. You will be prompted to choose which updates you want.
- Ignores dependencies that have a wildcard (`"*"`) version.
- Always updates to a caret (`^`) range (e.g. `^1.0.0`).
- Supports the same dependency in multiple categories (e.g. peer and dev).
- _Only_ updates `package.json` (does not install updated versions).

**Author's Note:** I'm hereby coopting the word "newest" to mean "latest, but only including released (un-tagged) versions".

## Usage

1. Run the `npx newest` command.
   - _Using `npx` to stay evergreen and avoid installation is recommended._
2. Select the updates you want to apply.
   - Use the arrow keys to navigate, `space` to select specific updates (or `a` to select all), and `enter` to apply the selected updates.
3. Run `yarn` or `npm i` to apply the updated minimum version numbers.

## Why?

The `yarn upgrade-interactive --latest` command _almost_ does this, except that it does not always update the dependency version in `package.json` to the new minimum. Instead, it _installs_ the latest version of a package, and leaves `package.json` unchanged if the latest version matches the current version range. This can result in an inaccurate indication of the version which is _actually_ supported. A feature may be introduced and used in a higher than minimum version that still matches the version range, causing the library to not actually be compatible with the minimum version indicated by the range. It will also install tagged (pre-release) versions, which are more often unstable.

The `npm update` command also _almost_ does this, except that it does not install the latest release version, only the highest version which matches the current version range. This leaves packages to slowly become outdated, requiring major updates at some point, instead of adopting early and incrementally.
