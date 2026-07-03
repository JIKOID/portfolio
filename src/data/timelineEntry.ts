import { parseFrontmatter } from './frontmatter'

export interface TimelineEntry {
  year: number
  month: number
  title: string
  description: string
  current: boolean
}

export function parseTimelineEntry(path: string, raw: string): TimelineEntry {
  const { fields, body } = parseFrontmatter(path, raw)

  return {
    year: Number(fields.year),
    month: Number(fields.month),
    title: fields.title ?? '',
    current: fields.current === 'true',
    description: body,
  }
}

export function sortTimelineEntries(entries: TimelineEntry[]): TimelineEntry[] {
  return [...entries].sort((a, b) => a.year - b.year || a.month - b.month)
}
