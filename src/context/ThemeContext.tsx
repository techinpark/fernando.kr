import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { Theme, ThemeContextType } from '../types'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    // 브라우저에서만 실행
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme | null
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches

      const initialTheme: Theme =
        savedTheme || (systemPrefersDark ? 'dark' : 'light')
      setTheme(initialTheme)
      document.body.classList.remove('light', 'dark')
      document.body.classList.add(initialTheme)
    }
  }, [])

  const toggleTheme = (): void => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme)
      document.body.classList.remove('light', 'dark')
      document.body.classList.add(newTheme)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
