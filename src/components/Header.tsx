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
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-title">
          {title}
        </Link>
        <ThemeSwitch />
      </div>
    </header>
  )
}
