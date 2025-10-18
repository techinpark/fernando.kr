// 전역 스타일 import
import './src/styles/global.scss'

// 테마 초기화 (localStorage에서 로드)
export const onClientEntry = () => {
  // 브라우저에서만 실행
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light')
    document.body.classList.add(theme)
  }
}
