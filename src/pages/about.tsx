import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Layout } from '../components/Layout'
import { SiteQueryResult } from '../types'
import './about.scss'

const AboutPage: React.FC<PageProps<SiteQueryResult>> = ({ data }) => {
  const { author, social } = data.site.siteMetadata

  return (
    <Layout>
      <div className="about-page">
        <h1>About</h1>
        <div className="about-content">
          <h2>👋 안녕하세요!</h2>
          <p>{author.summary}</p>

          <h2>🔗 Links</h2>
          <ul className="about-links">
            {social.github && (
              <li>
                <a
                  href={`https://github.com/${social.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub: @{social.github}
                </a>
              </li>
            )}
            {social.twitter && (
              <li>
                <a
                  href={`https://twitter.com/${social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter: @{social.twitter}
                </a>
              </li>
            )}
            {social.facebook && (
              <li>
                <a
                  href={`https://www.facebook.com/${social.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook: @{social.facebook}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author {
          name
          summary
        }
        social {
          github
          twitter
          facebook
        }
      }
    }
  }
`
