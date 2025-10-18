import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { SEOProps, SiteQueryResult } from '../types'

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  article = false,
}) => {
  const { site } = useStaticQuery<SiteQueryResult>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author {
            name
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  const metaDescription = description || site.siteMetadata.description
  const metaTitle = title || site.siteMetadata.title
  const fullTitle = title
    ? `${title} | ${site.siteMetadata.title}`
    : site.siteMetadata.title
  const metaImage = image
    ? image.startsWith('http')
      ? image
      : `${site.siteMetadata.siteUrl}${image}`
    : `${site.siteMetadata.siteUrl}/og-default.png`

  // 구조화된 데이터
  const schemaOrgWebPage = {
    '@context': 'https://schema.org',
    '@type': article ? 'BlogPosting' : 'WebSite',
    url: site.siteMetadata.siteUrl,
    name: fullTitle,
    headline: metaTitle,
    description: metaDescription,
    image: metaImage,
    author: {
      '@type': 'Person',
      name: site.siteMetadata.author.name,
    },
  }

  return (
    <Helmet
      htmlAttributes={{
        lang: 'ko',
      }}
      title={fullTitle}
      link={[
        {
          rel: 'preconnect',
          href: 'https://cdn.jsdelivr.net',
        },
        {
          rel: 'dns-prefetch',
          href: 'https://cdn.jsdelivr.net',
        },
      ]}
      script={[
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(schemaOrgWebPage),
        },
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'theme-color',
          content: '#cc007a',
        },
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: article ? `article` : `website`,
        },
        {
          property: `og:url`,
          content: site.siteMetadata.siteUrl,
        },
        {
          property: `og:site_name`,
          content: site.siteMetadata.title,
        },
        {
          property: `og:image`,
          content: metaImage,
        },
        {
          property: `og:image:width`,
          content: `1200`,
        },
        {
          property: `og:image:height`,
          content: `630`,
        },
        {
          property: `og:locale`,
          content: 'ko_KR',
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: metaTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: metaImage,
        },
      ]}
    />
  )
}
