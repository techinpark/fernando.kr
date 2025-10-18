import React from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { SocialShare } from '../components/SocialShare'
import { GiscusComments } from '../components/GiscusComments'
import {
  SiteQueryResult,
  NotionPostQueryResult,
  BlogPostContext,
} from '../types'
import './blog-post.scss'

type BlogPostData = SiteQueryResult & NotionPostQueryResult

const BlogPostTemplate: React.FC<
  PageProps<BlogPostData, BlogPostContext>
> = ({ data, pageContext }) => {
  const post = data.notionPost
  const { previous, next } = pageContext
  const siteUrl = data.site.siteMetadata.siteUrl
  const giscus = data.site.siteMetadata.giscus

  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.description}
        image={post.cover || undefined}
        article={true}
      />

      <article className="blog-post">
        {/* Header */}
        <header className="blog-post-header">
          {post.cover && (
            <div className="blog-post-cover">
              <img src={post.cover} alt={post.title} />
            </div>
          )}
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            <time className="blog-post-date">{post.date}</time>
            {post.tags && post.tags.length > 0 && (
              <div className="blog-post-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-post-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Social Share */}
        <div className="blog-post-share">
          <SocialShare
            url={`${siteUrl}/${post.slug}`}
            title={post.title}
            description={post.description}
          />
        </div>

        {/* Giscus Comments */}
        {giscus && giscus.repo && (
          <div className="blog-post-comments">
            <GiscusComments
              repo={giscus.repo}
              repoId={giscus.repoId}
              category={giscus.category}
              categoryId={giscus.categoryId}
              mapping="pathname"
              reactionsEnabled={true}
              lang="ko"
            />
          </div>
        )}

        {/* Navigation */}
        {(previous || next) && (
          <nav className="blog-post-nav">
            <div className="blog-post-nav-inner">
              {previous && (
                <Link
                  to={`/${previous.slug}`}
                  className="blog-post-nav-link prev"
                >
                  <span className="blog-post-nav-label">← Previous</span>
                  <span className="blog-post-nav-title">{previous.title}</span>
                </Link>
              )}
              {next && (
                <Link to={`/${next.slug}`} className="blog-post-nav-link next">
                  <span className="blog-post-nav-label">Next →</span>
                  <span className="blog-post-nav-title">{next.title}</span>
                </Link>
              )}
            </div>
          </nav>
        )}
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
        giscus {
          repo
          repoId
          category
          categoryId
        }
      }
    }
    notionPost(slug: { eq: $slug }) {
      id
      slug
      title
      date(formatString: "MMMM DD, YYYY")
      tags
      description
      content
      cover
    }
  }
`
