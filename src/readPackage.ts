import { readFile } from 'fs';
import { promisify } from 'util';
import { detectIndent } from './detectIndent';
import { IPackage } from './types/IPackage';

const aReadFile = promisify(readFile);

export async function readPackage(): Promise<{
  indent: string;
  pkg: IPackage;
}> {
  try {
    const text = await aReadFile("./package.json", "utf8");
    const indent = detectIndent(text);
    const pkg = JSON.parse(await aReadFile("./package.json", "utf8"));

    return { indent, pkg };
  } catch (err) {
    if (err.code === "ENOENT") throw new Error(`No "package.json" found.`);
    else throw new Error(`Invalid package.json file`);
  }
}
