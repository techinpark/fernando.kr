import React, { ReactNode } from 'react'
import { ThemeProvider } from '../context/ThemeContext'
import { Header } from './Header'
import { Footer } from './Footer'
import './Layout.scss'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <div className="layout">
        <div className="layout-container">
          <Header />
          <main className="layout-main">{children}</main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}
