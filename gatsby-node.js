const { Client } = require('@notionhq/client')
const { NotionToMarkdown } = require('notion-to-md')
const MarkdownIt = require('markdown-it')
const path = require('path')

// Markdown-it 인스턴스 생성
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

// Notion client 초기화
const notion = process.env.NOTION_TOKEN
  ? new Client({ auth: process.env.NOTION_TOKEN })
  : null

const n2m = notion ? new NotionToMarkdown({ notionClient: notion }) : null

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  // Notion 토큰이 없으면 스킵
  if (!notion || !process.env.NOTION_DATABASE_ID) {
    console.warn('⚠️  Notion API가 설정되지 않았습니다. 환경 변수를 확인하세요.')
    return
  }

  try {
    // Notion 데이터베이스에서 게시된 포스트 가져오기
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    })

    // 각 포스트를 Gatsby 노드로 변환
    for (const page of response.results) {
      const pageId = page.id
      const properties = page.properties

      // 제목 추출
      const title = properties.Title?.title?.[0]?.plain_text || 'Untitled'

      // 슬러그 추출 (없으면 제목으로 생성)
      const slug =
        properties.Slug?.rich_text?.[0]?.plain_text ||
        title.toLowerCase().replace(/\s+/g, '-')

      // 날짜 추출
      const date = properties.Date?.date?.start || new Date().toISOString()

      // 태그 추출
      const tags = properties.Tags?.multi_select?.map((tag) => tag.name) || []

      // 설명 추출
      const description =
        properties.Description?.rich_text?.[0]?.plain_text || ''

      // 커버 이미지 추출
      const cover = page.cover?.external?.url || page.cover?.file?.url || null

      // Notion 콘텐츠를 마크다운으로 변환
      const mdBlocks = await n2m.pageToMarkdown(pageId)
      const mdString = n2m.toMarkdownString(mdBlocks)
      const markdown = mdString.parent || ''

      // 마크다운을 HTML로 변환
      const content = md.render(markdown)

      // Gatsby 노드 생성
      const nodeData = {
        id: createNodeId(`notion-post-${pageId}`),
        parent: null,
        children: [],
        internal: {
          type: 'NotionPost',
          contentDigest: createContentDigest({
            title,
            slug,
            date,
            tags,
            description,
            content,
            cover,
          }),
        },
        // 데이터
        notionId: pageId,
        title,
        slug,
        date,
        tags,
        description,
        content,
        cover,
      }

      createNode(nodeData)
    }

    console.log(`✅ ${response.results.length}개의 Notion 포스트를 가져왔습니다.`)
  } catch (error) {
    console.error('❌ Notion API 호출 중 오류 발생:', error)
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // 포스트 템플릿
  const blogPostTemplate = path.resolve('./src/templates/blog-post.tsx')

  // GraphQL로 모든 포스트 가져오기
  const result = await graphql(`
    query {
      allNotionPost(sort: { date: DESC }) {
        nodes {
          id
          slug
          title
          date
          tags
          description
          content
          cover
        }
      }
    }
  `)

  if (result.errors) {
    console.error('❌ GraphQL 쿼리 중 오류 발생:', result.errors)
    return
  }

  const posts = result.data.allNotionPost.nodes

  // 각 포스트 페이지 생성
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]

    createPage({
      path: `/${post.slug}`,
      component: blogPostTemplate,
      context: {
        id: post.id,
        slug: post.slug,
        previous,
        next,
      },
    })
  })

  console.log(`✅ ${posts.length}개의 블로그 페이지를 생성했습니다.`)
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type NotionPost implements Node {
      notionId: String!
      title: String!
      slug: String!
      date: Date! @dateformat
      tags: [String!]!
      description: String
      content: String!
      cover: String
    }
  `)
}
