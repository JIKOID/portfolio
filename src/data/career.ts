import { parseTimelineEntry, type TimelineEntry } from './timelineEntry'

// src/content/career/ 폴더에 .md 파일을 추가하면 자동으로 목록에 반영됩니다.
// 파일 형식:
// ---
// year: 2025
// month: 1
// title: 제목
// current: true   (선택, 진행 중인 항목에만 추가)
// ---
// 본문 내용 (마크다운)
const rawFiles = import.meta.glob('../content/career/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export const careerEntries: TimelineEntry[] = Object.entries(rawFiles).map(
  ([path, raw]) => parseTimelineEntry(path, raw),
)
