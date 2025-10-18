import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { SiteQueryResult } from '../types'
import './Header.scss'

export const Header: React.FC = () => {
  const data = useStaticQuery<SiteQueryResult>(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { title } = data.site.siteMetadata

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-title">
          {title}
        </Link>
        <nav className="header-nav">
          <Link to="/" className="header-nav-link">
            Posts
          </Link>
          <Link to="/about" className="header-nav-link">
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
