const { Client } = require('@notionhq/client')
require('dotenv').config()

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const databaseId = process.env.NOTION_DATABASE_ID

async function deleteAllPosts() {
  try {
    console.log('🗑️  Notion 데이터베이스의 모든 포스트를 삭제합니다...\n')
    console.log(`Database ID: ${databaseId}\n`)

    // 모든 페이지 가져오기
    const response = await notion.databases.query({
      database_id: databaseId,
    })

    console.log(`총 ${response.results.length}개의 포스트를 찾았습니다.\n`)

    let deleted = 0
    let failed = 0

    // 각 페이지 아카이브 (삭제)
    for (const page of response.results) {
      const title =
        page.properties.Title?.title?.[0]?.plain_text || 'Untitled'
      const slug = page.properties.Slug?.rich_text?.[0]?.plain_text || ''

      try {
        await notion.pages.update({
          page_id: page.id,
          archived: true,
        })
        console.log(`✅ 삭제됨: ${title} (${slug})`)
        deleted++

        // API 제한을 피하기 위해 잠시 대기
        await new Promise((resolve) => setTimeout(resolve, 334))
      } catch (error) {
        console.error(`❌ 삭제 실패: ${title} - ${error.message}`)
        failed++
      }
    }

    console.log('\n' + '='.repeat(50))
    console.log('📊 삭제 결과')
    console.log('='.repeat(50))
    console.log(`✅ 성공: ${deleted}개`)
    console.log(`❌ 실패: ${failed}개`)
    console.log('\n삭제가 완료되었습니다!')
  } catch (error) {
    console.error('❌ 오류 발생:', error.message)
  }
}

// 실행
deleteAllPosts().catch(console.error)
