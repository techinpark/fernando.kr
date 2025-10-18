import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { SiteQueryResult } from '../types'
import './Footer.scss'

export const Footer: React.FC = () => {
  const data = useStaticQuery<SiteQueryResult>(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          author {
            name
          }
          social {
            github
            twitter
            facebook
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-social">
          {social.github && (
            <a
              href={`https://github.com/${social.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub"
            >
              GitHub
            </a>
          )}
          {social.twitter && (
            <a
              href={`https://twitter.com/${social.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Twitter"
            >
              Twitter
            </a>
          )}
          {social.facebook && (
            <a
              href={`https://www.facebook.com/${social.facebook}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Facebook"
            >
              Facebook
            </a>
          )}
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} {author.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
