import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/Layout'
import './404.scss'

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <div className="not-found-page">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>요청하신 페이지를 찾을 수 없습니다.</p>
        <Link to="/" className="home-link">
          홈으로 돌아가기 →
        </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage
