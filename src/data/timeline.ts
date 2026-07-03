export interface TimelineEntry {
  year: number
  month: number
  title: string
  description: string
  current?: boolean
}

// 새로운 경력/활동을 추가하려면 이 배열에 항목을 하나 더 넣으면 됩니다.
// 정렬은 자동으로 처리되므로 순서는 신경 쓰지 않아도 됩니다.
export const timelineEntries: TimelineEntry[] = [
  {
    year: 2022,
    month: 3,
    title: '프론트엔드 개발자로 첫 커리어 시작',
    description:
      'React와 TypeScript를 활용해 사내 서비스의 UI를 개발하며 프론트엔드 기초를 다졌습니다.',
  },
  {
    year: 2023,
    month: 6,
    title: '주요 프로젝트 리드',
    description:
      '팀의 핵심 프로젝트를 주도하며 컴포넌트 설계와 성능 최적화 경험을 쌓았습니다.',
  },
  {
    year: 2024,
    month: 9,
    title: '새로운 도전',
    description:
      '더 넓은 시야를 갖기 위해 새로운 팀에 합류하여 다양한 기술 스택을 경험했습니다.',
  },
  {
    year: 2026,
    month: 7,
    title: '현재',
    description: '지금도 계속 배우고 성장하며 새로운 프로젝트를 진행하고 있습니다.',
    current: true,
  },
]
