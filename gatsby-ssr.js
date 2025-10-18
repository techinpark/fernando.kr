const React = require('react')

// SSR에서 테마 초기화
export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  // 테마 플래시 방지 스크립트
  const themeInitScript = `
    (function() {
      function getInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          return savedTheme;
        }
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
      }

      const theme = getInitialTheme();
      document.body.classList.add(theme);
    })();
  `

  setPreBodyComponents([
    React.createElement('script', {
      key: 'theme-init',
      dangerouslySetInnerHTML: { __html: themeInitScript },
    }),
  ])
}
