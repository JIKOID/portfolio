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

// 회사 폴더의 _company.md 파일 하나로 근무 기간 등 회사 정보를 관리합니다.
export interface CompanyMeta {
  company: string
  period?: string
}

export function parseCompanyMeta(path: string, raw: string): CompanyMeta {
  const { fields } = parseFrontmatter(path, raw)
  if (!fields.company) {
    throw new Error(`${path}: company 필드가 없습니다.`)
  }
  return {
    company: fields.company,
    period: fields.period,
  }
}

// "2024.09 – 2026.01" 또는 "2026.01 – 현재" 형식의 기간에서 총 근무 개월수를
// 계산합니다. 이력서 표기 관행에 맞춰 시작 달을 포함해 셉니다. (예: 2022.01 – 2022.04 → 4개월)
export function formatPeriodDuration(period: string, now: Date = new Date()): string | undefined {
  const dates = period.match(/(\d{4})\.(\d{1,2})/g)
  if (!dates || dates.length === 0) return undefined

  const [startYear, startMonth] = dates[0].split('.').map(Number)
  const [endYear, endMonth] =
    dates.length >= 2
      ? dates[1].split('.').map(Number)
      : [now.getFullYear(), now.getMonth() + 1]

  const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1
  if (totalMonths <= 0) return undefined

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  if (years === 0) return `${months}개월`
  if (months === 0) return `${years}년`
  return `${years}년 ${months}개월`
}

export interface CompanyGroup {
  company: string
  entries: TimelineEntry[]
  current: boolean
  period?: string
  duration?: string
  latestYear: number
  latestMonth: number
}

// company 필드가 있는 항목을 회사 단위로 묶습니다. 각 회사 내부는 날짜 오름차순,
// 회사 그룹 자체는 최근 근무(현재 재직 중 우선, 그다음 최신 항목 기준) 순으로 정렬합니다.
export function groupByCompany(
  entries: TimelineEntry[],
  metas: CompanyMeta[] = [],
): CompanyGroup[] {
  const sorted = sortTimelineEntries(entries)
  const groups = new Map<string, TimelineEntry[]>()
  const metaByCompany = new Map(metas.map((meta) => [meta.company, meta]))

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
    const period = metaByCompany.get(company)?.period
    return {
      company,
      entries: groupEntries,
      current: groupEntries.some((entry) => entry.current),
      period,
      duration: period ? formatPeriodDuration(period) : undefined,
      latestYear: latest.year,
      latestMonth: latest.month,
    }
  })

  return result.sort((a, b) => {
    if (a.current !== b.current) return a.current ? -1 : 1
    return b.latestYear - a.latestYear || b.latestMonth - a.latestMonth
  })
}
