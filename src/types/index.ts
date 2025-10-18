// Notion Post Type
export interface NotionPost {
  id: string
  notionId: string
  slug: string
  title: string
  date: string
  tags: string[]
  description: string
  content: string
  cover: string | null
}

// Site Metadata
export interface SiteMetadata {
  title: string
  description: string
  siteUrl: string
  author: {
    name: string
    summary: string
  }
  social: {
    twitter: string
    github: string
    facebook: string
  }
  utterances: string
  giscus: {
    repo: string
    repoId: string
    category: string
    categoryId: string
  }
  sponsor: {
    buyMeACoffeeId: string
  }
}

// GraphQL Query Results
export interface SiteQueryResult {
  site: {
    siteMetadata: SiteMetadata
  }
}

export interface NotionPostQueryResult {
  notionPost: NotionPost
}

export interface AllNotionPostsQueryResult {
  allNotionPost: {
    nodes: NotionPost[]
  }
}

// Component Props
export interface SEOProps {
  title?: string
  description?: string
  image?: string
  article?: boolean
}

export interface SocialShareProps {
  url: string
  title: string
  description?: string
}

export interface GiscusCommentsProps {
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping?: string
  reactionsEnabled?: boolean
  emitMetadata?: boolean
  inputPosition?: 'top' | 'bottom'
  lang?: string
  loading?: 'lazy' | 'eager'
}

export interface BlogPostContext {
  id: string
  slug: string
  previous: NotionPost | null
  next: NotionPost | null
}

// Theme
export type Theme = 'light' | 'dark'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}
