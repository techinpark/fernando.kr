require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

// 기본 플러그인
const plugins = [
  `gatsby-plugin-image`,
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/static`,
    },
  },
  {
    resolve: `gatsby-plugin-sass`,
    options: {
      sassOptions: {
        includePaths: ['src/styles'],
      },
    },
  },
  // TODO: Add gatsby-plugin-manifest later with a PNG icon
  // {
  //   resolve: `gatsby-plugin-manifest`,
  //   options: {
  //     name: `Fernando 기술 블로그`,
  //     short_name: `Fernando Blog`,
  //     start_url: `/`,
  //     background_color: `#ffffff`,
  //     theme_color: `#cc007a`,
  //     display: `minimal-ui`,
  //     icon: `static/favicon.png`,
  //   },
  // },
  `gatsby-plugin-sitemap`,
]

// Google Analytics 플러그인 (환경 변수가 있을 때만 추가)
if (process.env.GA_TRACKING_ID) {
  plugins.push({
    resolve: `gatsby-plugin-google-gtag`,
    options: {
      trackingIds: [process.env.GA_TRACKING_ID],
      pluginConfig: {
        head: true,
        respectDNT: true,
      },
    },
  })
}

module.exports = {
  siteMetadata: {
    title: `Fernando 기술 블로그`,
    description: `가볍게 생각을 정리하기 위해 만들어진 블로그 입니다`,
    siteUrl: process.env.SITE_URL || `https://fernando.kr`,
    author: {
      name: `fernando`,
      summary: `iOS Developer 🇰🇷 : 수트 입는 개발자 / 오픈소스를 좋아합니다`,
    },
    social: {
      twitter: `techinpark`,
      github: `techinpark`,
      facebook: `techinpark.`,
    },
    utterances: `techinpark/blog-comments`,
    giscus: {
      repo: process.env.GISCUS_REPO || '',
      repoId: process.env.GISCUS_REPO_ID || '',
      category: process.env.GISCUS_CATEGORY || '',
      categoryId: process.env.GISCUS_CATEGORY_ID || '',
    },
    sponsor: {
      buyMeACoffeeId: 'techinpark',
    },
  },
  plugins,
}
