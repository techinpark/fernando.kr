const { Client } = require('@notionhq/client')
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
require('dotenv').config()

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const databaseId = process.env.NOTION_DATABASE_ID

// 마크다운 파일에서 날짜와 slug 추출
function getSlugInfo(filename, frontmatter, category) {
  // 파일명에서 날짜 부분 추출 (YYYY-MM-DD)
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/)
  if (match) {
    const datePrefix = match[1]
    const slugPart = match[2]
    // URL 구조: /category/YYYY-MM-DD-slug/
    return {
      fullSlug: `${category}/${datePrefix}-${slugPart}`,
      datePrefix,
      slugPart,
    }
  }
  // 날짜가 없는 경우
  const slugPart = filename.replace('.md', '')
  return {
    fullSlug: `${category}/${slugPart}`,
    datePrefix: null,
    slugPart,
  }
}

// 카테고리를 태그로 변환
function categoryToTag(category) {
  const categoryMap = {
    develop: 'Development',
    general: 'General',
    ios: 'iOS',
  }
  return categoryMap[category] || category
}

// 이미지 경로를 절대 경로로 변환
function convertImagePaths(content, datePrefix) {
  // <img src="../../assets/2019-05-24/content.jpg"> 형태를
  // <img src="/assets/2019-05-24/content.jpg"> 형태로 변경
  return content.replace(
    /<img\s+src="\.\.\/\.\.\/assets\//g,
    '<img src="/assets/'
  )
}

// 긴 텍스트를 Notion 블록으로 분할 (2000자 제한)
function splitIntoBlocks(text, maxLength = 2000) {
  const blocks = []
  let currentText = text.trim()

  while (currentText.length > 0) {
    let chunk = currentText.substring(0, maxLength)

    // 2000자가 넘으면 마지막 줄바꿈이나 공백에서 자르기
    if (currentText.length > maxLength) {
      const lastNewline = chunk.lastIndexOf('\n')
      const lastSpace = chunk.lastIndexOf(' ')
      const breakPoint =
        lastNewline > maxLength * 0.8
          ? lastNewline
          : lastSpace > maxLength * 0.8
          ? lastSpace
          : maxLength

      chunk = currentText.substring(0, breakPoint)
    }

    blocks.push({
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: chunk,
            },
          },
        ],
      },
    })

    currentText = currentText.substring(chunk.length).trim()
  }

  return blocks
}

// 마크다운 파일을 Notion 페이지로 변환
async function migrateMarkdownToNotion(filePath, category) {
  let frontmatter = null
  let slugInfo = null

  try {
    // 파일 읽기
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const parsed = matter(fileContent)
    frontmatter = parsed.data
    let content = parsed.content

    // slug 정보 추출
    const filename = path.basename(filePath)
    slugInfo = getSlugInfo(filename, frontmatter, category)

    // 이미지 경로 변환
    content = convertImagePaths(content, slugInfo.datePrefix)

    console.log(`마이그레이션 중: ${frontmatter.title}`)
    console.log(`  - Full Slug: ${slugInfo.fullSlug}`)
    console.log(`  - Date: ${frontmatter.date}`)
    console.log(`  - Category: ${frontmatter.category}`)

    // 콘텐츠를 블록으로 분할
    const contentBlocks = splitIntoBlocks(content)

    // Notion 페이지 생성
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: frontmatter.title,
              },
            },
          ],
        },
        Slug: {
          rich_text: [
            {
              text: {
                content: slugInfo.fullSlug, // /category/YYYY-MM-DD-slug 형태
              },
            },
          ],
        },
        Published: {
          checkbox: true,
        },
        Date: {
          date: {
            start: new Date(frontmatter.date).toISOString(),
          },
        },
        Tags: {
          multi_select: [
            {
              name: categoryToTag(frontmatter.category),
            },
          ],
        },
      },
      children: contentBlocks,
    })

    console.log(`  ✅ 성공: ${response.id}\n`)
    return { success: true, slug: slugInfo.fullSlug, title: frontmatter.title }
  } catch (error) {
    console.error(`  ❌ 실패: ${error.message}\n`)
    return {
      success: false,
      slug: slugInfo?.fullSlug,
      title: frontmatter?.title,
      error: error.message,
    }
  }
}

// Notion에서 기존 슬러그 목록 가져오기
async function getExistingSlugs() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    })

    const slugs = new Set()
    response.results.forEach((page) => {
      const slugProperty = page.properties.Slug
      if (slugProperty?.rich_text?.[0]?.text?.content) {
        slugs.add(slugProperty.rich_text[0].text.content)
      }
    })

    return slugs
  } catch (error) {
    console.error('기존 슬러그 조회 실패:', error.message)
    return new Set()
  }
}

// 모든 마크다운 파일 마이그레이션
async function migrateAllPosts() {
  const blogDir = path.join(__dirname, '../_v1_backup/content/blog')
  const categories = ['develop', 'general', 'ios']

  const results = {
    success: [],
    failed: [],
    skipped: [],
  }

  console.log('📚 마크다운 파일을 Notion으로 마이그레이션을 시작합니다...\n')
  console.log(`Database ID: ${databaseId}\n`)

  // 기존 슬러그 확인
  console.log('🔍 기존 포스트 확인 중...\n')
  const existingSlugs = await getExistingSlugs()
  console.log(`기존 포스트: ${existingSlugs.size}개\n`)

  for (const category of categories) {
    const categoryPath = path.join(blogDir, category)
    if (!fs.existsSync(categoryPath)) {
      console.log(`⚠️  카테고리 폴더가 없습니다: ${category}\n`)
      continue
    }

    const files = fs.readdirSync(categoryPath).filter((file) =>
      file.endsWith('.md')
    )
    console.log(`📁 ${category} 카테고리: ${files.length}개의 파일\n`)

    for (const file of files) {
      const filePath = path.join(categoryPath, file)
      const parsed = matter(fs.readFileSync(filePath, 'utf-8'))
      const slugInfo = getSlugInfo(file, parsed.data, category)

      // 이미 존재하는 포스트는 건너뛰기
      if (existingSlugs.has(slugInfo.fullSlug)) {
        console.log(`⏭️  건너뜀: ${slugInfo.fullSlug} (이미 존재)\n`)
        results.skipped.push({ slug: slugInfo.fullSlug, filename: file })
        continue
      }

      const result = await migrateMarkdownToNotion(filePath, category)

      if (result.success) {
        results.success.push(result)
      } else {
        results.failed.push(result)
      }

      // API 제한을 피하기 위해 잠시 대기
      await new Promise((resolve) => setTimeout(resolve, 334)) // 3 requests per second
    }
  }

  // 결과 요약
  console.log('\n' + '='.repeat(50))
  console.log('📊 마이그레이션 결과')
  console.log('='.repeat(50))
  console.log(`✅ 성공: ${results.success.length}개`)
  console.log(`⏭️  건너뜀: ${results.skipped.length}개`)
  console.log(`❌ 실패: ${results.failed.length}개`)

  if (results.success.length > 0) {
    console.log('\n성공한 글:')
    results.success.forEach(({ title, slug }) => {
      console.log(`  - ${title} (${slug})`)
    })
  }

  if (results.skipped.length > 0) {
    console.log('\n건너뛴 글:')
    results.skipped.forEach(({ slug, filename }) => {
      console.log(`  - ${slug} (${filename})`)
    })
  }

  if (results.failed.length > 0) {
    console.log('\n실패한 글:')
    results.failed.forEach(({ title, error }) => {
      console.log(`  - ${title}: ${error}`)
    })
  }

  console.log('\n마이그레이션이 완료되었습니다!')
}

// 실행
migrateAllPosts().catch(console.error)
