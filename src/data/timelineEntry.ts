import { parseFrontmatter } from './frontmatter'

export interface TimelineEntry {
  year: number
  month: number
  title: string
  org?: string
  company?: string
  period?: string
  description: string
  current: boolean
}

export function parseTimelineEntry(path: string, raw: string): TimelineEntry {
  const { fields, body } = parseFrontmatter(path, raw)

  return {
    year: Number(fields.year),
    month: Number(fields.month),
    title: fields.title ?? '',
    org: fields.org,
    company: fields.company,
    period: fields.period,
    current: fields.current === 'true',
    description: body,
  }
}

export function sortTimelineEntries(entries: TimelineEntry[]): TimelineEntry[] {
  return [...entries].sort((a, b) => a.year - b.year || a.month - b.month)
}

export interface CompanyGroup {
  company: string
  entries: TimelineEntry[]
  current: boolean
  latestYear: number
  latestMonth: number
}

// company 필드가 있는 항목을 회사 단위로 묶습니다. 각 회사 내부는 날짜 오름차순,
// 회사 그룹 자체는 최근 근무(현재 재직 중 우선, 그다음 최신 항목 기준) 순으로 정렬합니다.
export function groupByCompany(entries: TimelineEntry[]): CompanyGroup[] {
  const sorted = sortTimelineEntries(entries)
  const groups = new Map<string, TimelineEntry[]>()

  for (const entry of sorted) {
    const key = entry.company ?? entry.org ?? entry.title
    const group = groups.get(key)
    if (group) {
      group.push(entry)
    } else {
      groups.set(key, [entry])
    }
  }

  const result: CompanyGroup[] = Array.from(groups.entries()).map(([company, groupEntries]) => {
    const latest = groupEntries[groupEntries.length - 1]
    return {
      company,
      entries: groupEntries,
      current: groupEntries.some((entry) => entry.current),
      latestYear: latest.year,
      latestMonth: latest.month,
    }
  })

  return result.sort((a, b) => {
    if (a.current !== b.current) return a.current ? -1 : 1
    return b.latestYear - a.latestYear || b.latestMonth - a.latestMonth
  })
}
