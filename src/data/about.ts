import { parseFrontmatter } from './frontmatter'

export interface AboutLink {
  label: string
  url: string
  description: string
  mark: string
}

export interface About {
  eyebrow: string
  name: string
  role: string
  bio: string
  email?: string
  skills: { label: string; items: string[] }[]
  links: AboutLink[]
}

// src/content/about/ 폴더의 .md 파일 하나로 자기소개를 관리합니다.
const rawFiles = import.meta.glob('../content/about/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const [path, raw] = Object.entries(rawFiles)[0] ?? []
if (!path || !raw) {
  throw new Error('src/content/about/ 폴더에 .md 파일이 없습니다.')
}

const { fields, body } = parseFrontmatter(path, raw)

const linkFields: Array<[label: string, key: string, description: string, mark: string]> = [
  ['LinkedIn', 'linkedin', '경력과 활동, 그리고 새로운 연결', 'in'],
  ['GitHub', 'github', '코드와 프로젝트 살펴보기', '{ }'],
  ['Blog (New)', 'blog2', '새롭게 이어가는 학습과 기술 기록', 'B'],
  ['Blog (Old)', 'blog1', '차곡차곡 쌓아온 이전의 기록', 'B'],
]

export const about: About = {
  eyebrow: fields.eyebrow ?? '',
  name: fields.name ?? '',
  role: fields.role ?? '',
  bio: body,
  email: fields.email,
  skills: [
    { label: '데이터 처리·플랫폼', key: 'skills-data' },
    { label: '인프라·운영', key: 'skills-platform' },
    { label: 'AI·데이터 서비스', key: 'skills-ai' },
  ].map(({ label, key }) => ({ label, items: (fields[key] ?? '').split('|').map((item) => item.trim()).filter(Boolean) })),
  links: linkFields
    .filter(([, key]) => fields[key])
    .map(([label, key, description, mark]) => ({ label, url: fields[key], description, mark })),
}
