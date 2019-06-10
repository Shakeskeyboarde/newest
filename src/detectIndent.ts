export function detectIndent(str: string) {
  const match = /^([ \t]+)/m.exec(str);
  return match !== null ? match[1] : "  ";
}
