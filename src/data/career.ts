import {
  parseCompanyMeta,
  parseTimelineEntry,
  type CompanyMeta,
  type TimelineEntry,
} from './timelineEntry'

// src/content/career/ 폴더(회사별 하위 폴더 포함)에 .md 파일을 추가하면 자동으로 목록에 반영됩니다.
// 파일 형식:
// ---
// year: 2025
// month: 1
// title: 제목
// current: true   (선택, 진행 중인 항목에만 추가)
// ---
// 본문 내용 (마크다운)
//
// 언더스코어로 시작하는 파일(_company.md)은 타임라인 항목이 아닌 회사 정보로 읽습니다.
// ---
// company: 회사명
// period: 2024.09 – 2026.01   (재직 중이면 "2026.01 – 현재")
// ---
const rawFiles = import.meta.glob('../content/career/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const isMetaFile = (path: string) => (path.split('/').pop() ?? '').startsWith('_')

export const careerEntries: TimelineEntry[] = Object.entries(rawFiles)
  .filter(([path]) => !isMetaFile(path))
  .map(([path, raw]) => parseTimelineEntry(path, raw))

export const companyMetas: CompanyMeta[] = Object.entries(rawFiles)
  .filter(([path]) => isMetaFile(path))
  .map(([path, raw]) => parseCompanyMeta(path, raw))
