export function parseFrontmatter(path: string, raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    throw new Error(`${path}: frontmatter(---)가 없습니다.`)
  }
  const [, frontmatter, body] = match

  const fields: Record<string, string> = {}
  for (const line of frontmatter.split('\n')) {
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) continue
    const key = line.slice(0, separatorIndex).trim()
    const value = line
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '')
    fields[key] = value
  }

  return { fields, body: body.trim() }
}
