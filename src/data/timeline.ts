export interface TimelineEntry {
  year: number
  month: number
  title: string
  description: string
  current: boolean
}

// src/content/timeline/ 폴더에 .md 파일을 추가하면 자동으로 목록에 반영됩니다.
// 파일 형식:
// ---
// year: 2025
// month: 1
// title: 제목
// current: true   (선택, 진행 중인 항목에만 추가)
// ---
// 본문 내용 (마크다운)
const rawFiles = import.meta.glob('../content/timeline/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function parseEntry(path: string, raw: string): TimelineEntry {
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

  return {
    year: Number(fields.year),
    month: Number(fields.month),
    title: fields.title ?? '',
    current: fields.current === 'true',
    description: body.trim(),
  }
}

export const timelineEntries: TimelineEntry[] = Object.entries(rawFiles).map(
  ([path, raw]) => parseEntry(path, raw),
)
