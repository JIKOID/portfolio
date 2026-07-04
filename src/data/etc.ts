import { parseTimelineEntry, type TimelineEntry } from './timelineEntry'

// src/content/etc/ 폴더에 .md 파일을 추가하면 자동으로 목록에 반영됩니다.
// 파일 형식은 src/data/career.ts와 동일합니다. (수상/자격증/교육 등)
const rawFiles = import.meta.glob('../content/etc/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export const etcEntries: TimelineEntry[] = Object.entries(rawFiles).map(
  ([path, raw]) => parseTimelineEntry(path, raw),
)
