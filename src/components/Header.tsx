import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { SiteQueryResult } from '../types'
import { ThemeSwitch } from './ThemeSwitch'
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
    <header className="header" role="banner">
      <div className="header-inner">
        <Link to="/" className="header-title" aria-label="홈으로 이동">
          FERNANDO
          <br />
          기술블로그
        </Link>
        <ThemeSwitch />
      </div>
    </header>
  )
}
