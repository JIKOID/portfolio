import { parseFrontmatter } from './frontmatter'

export interface AboutLink {
  label: string
  url: string
}

export interface About {
  eyebrow: string
  name: string
  role: string
  bio: string
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

const linkFields: Array<[label: string, key: string]> = [
  ['LinkedIn', 'linkedin'],
  ['GitHub', 'github'],
  ['Blog (Old)', 'blog1'],
  ['Blog (New)', 'blog2'],
]

export const about: About = {
  eyebrow: fields.eyebrow ?? '',
  name: fields.name ?? '',
  role: fields.role ?? '',
  bio: body,
  links: linkFields
    .filter(([, key]) => fields[key])
    .map(([label, key]) => ({ label, url: fields[key] })),
}
