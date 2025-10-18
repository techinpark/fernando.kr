import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Layout } from '../components/Layout'
import { SiteQueryResult, AllNotionPostsQueryResult } from '../types'
import './index.scss'

type IndexPageData = SiteQueryResult & AllNotionPostsQueryResult

const IndexPage: React.FC<PageProps<IndexPageData>> = ({ data }) => {
  const posts = data.allNotionPost?.nodes || []
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout>
      <div className="index-page">
        <h1 className="index-title">{siteTitle}</h1>
        <p className="index-description">
          {data.site.siteMetadata.description}
        </p>

        {posts.length === 0 ? (
          <div className="index-empty">
            <p>
              아직 포스트가 없습니다. Notion 데이터베이스를 설정하고 포스트를
              작성해주세요.
            </p>
            <p>
              <a
                href="https://www.notion.so"
                target="_blank"
                rel="noopener noreferrer"
              >
                Notion으로 이동하기 →
              </a>
            </p>
          </div>
        ) : (
          <div className="index-posts">
            {posts.map((post) => (
              <article key={post.id} className="post-card">
                <a href={`/${post.slug}`} className="post-card-link">
                  {post.cover && (
                    <div className="post-card-cover">
                      <img src={post.cover} alt={post.title} />
                    </div>
                  )}
                  <div className="post-card-content">
                    <h2 className="post-card-title">{post.title}</h2>
                    <p className="post-card-description">{post.description}</p>
                    <div className="post-card-meta">
                      <time className="post-card-date">{post.date}</time>
                      {post.tags && post.tags.length > 0 && (
                        <div className="post-card-tags">
                          {post.tags.map((tag) => (
                            <span key={tag} className="post-card-tag">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allNotionPost(sort: { date: DESC }) {
      nodes {
        id
        slug
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        description
        cover
      }
    }
  }
`
