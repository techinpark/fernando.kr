# Fernando 기술 블로그 v2.0

Gatsby v5 + Notion CMS 기반 개인 기술 블로그

## ✨ 주요 기능

- **Notion CMS**: Notion 데이터베이스를 CMS로 사용
- **Pretendard 폰트**: 한글 최적화 폰트 적용
- **다크/라이트 테마**: 시스템 설정 감지 및 수동 전환
- **Disqus 댓글**: 댓글 시스템 통합
- **소셜 공유**: Facebook, Twitter, LinkedIn, Telegram, URL 복사
- **SEO 최적화**: 메타 태그, OG 이미지, Sitemap
- **Google Analytics 4**: 방문자 추적
- **반응형 디자인**: 모바일 최적화

## 🚀 시작하기

### 1. 저장소 클론 및 의존성 설치

```bash
git clone https://github.com/techinpark/fernando.kr.git
cd fernando.kr
git checkout v2-notion-migration
npm install
```

### 2. Notion 설정

상세한 설정 방법은 [NOTION_SETUP.md](./NOTION_SETUP.md)를 참고하세요.

**간단 요약:**
1. [Notion Integration 생성](https://www.notion.so/my-integrations)
2. 블로그 데이터베이스 생성 (템플릿은 NOTION_SETUP.md 참고)
3. Integration을 데이터베이스에 연결
4. `.env` 파일 생성 및 설정

### 3. 환경 변수 설정

`.env.example` 파일을 복사하여 `.env` 파일을 생성하고 값을 입력하세요.

```bash
cp .env.example .env
```

```.env
# Notion API
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id

# 사이트 정보
SITE_URL=https://fernando.kr

# Google Analytics
GA_TRACKING_ID=G-XXXXXXXXXX

# Disqus
DISQUS_SHORTNAME=your_disqus_shortname
```

### 4. 개발 서버 실행

```bash
npm run develop
```

브라우저에서 http://localhost:8000을 엽니다.

### 5. 빌드

```bash
npm run build
npm run serve
```

## 📁 프로젝트 구조

```
fernando.kr/
├── src/
│   ├── components/        # React 컴포넌트
│   │   ├── Layout.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ThemeSwitch.jsx
│   │   ├── SEO.jsx
│   │   ├── SocialShare.jsx
│   │   └── DisqusComments.jsx
│   ├── context/           # React Context
│   │   └── ThemeContext.jsx
│   ├── pages/             # 페이지
│   │   ├── index.jsx
│   │   ├── about.jsx
│   │   └── 404.jsx
│   ├── templates/         # 페이지 템플릿
│   │   └── blog-post.jsx
│   └── styles/            # 스타일
│       ├── global.scss
│       └── variables.scss
├── static/                # 정적 파일
├── gatsby-config.js       # Gatsby 설정
├── gatsby-node.js         # Notion API 연동
├── gatsby-browser.js      # 브라우저 API
├── gatsby-ssr.js          # SSR API
├── .env.example           # 환경 변수 예제
└── package.json
```

## 🎨 커스터마이징

### 색상 테마 변경

`src/styles/variables.scss` 파일에서 색상 변수를 수정하세요.

```scss
:root {
  --color-primary-light: #cc007a;
  --color-link-dark: #bb72ec;
  // ...
}
```

### 폰트 변경

`src/styles/global.scss`에서 Pretendard 대신 다른 폰트를 사용할 수 있습니다.

### 메타데이터 수정

`gatsby-config.js`의 `siteMetadata`를 수정하세요.

## 📝 블로그 포스트 작성

1. Notion 데이터베이스에서 새 페이지 생성
2. 필수 속성 입력:
   - **Title**: 포스트 제목
   - **Slug**: URL 슬러그
   - **Date**: 작성일
   - **Published**: 체크 (공개)
3. 본문 작성
4. Gatsby 재빌드 (`npm run develop`)

## 🚀 배포

### Netlify

```bash
# Build command
npm run build

# Publish directory
public

# 환경 변수 설정 (Netlify Dashboard)
NOTION_TOKEN=xxx
NOTION_DATABASE_ID=xxx
GA_TRACKING_ID=xxx
DISQUS_SHORTNAME=xxx
SITE_URL=https://yourdomain.com
```

### Vercel

```bash
# Build command
npm run build

# Output directory
public

# 환경 변수 설정 (Vercel Dashboard)
```

## 🛠 기술 스택

- **Gatsby v5**: React 기반 정적 사이트 생성기
- **Notion API**: CMS
- **React 18**: UI 라이브러리
- **Sass**: CSS 전처리기
- **Pretendard**: 폰트
- **Disqus**: 댓글 시스템
- **react-share**: 소셜 공유
- **react-helmet**: SEO

## 📄 라이선스

MIT License

## 👤 작성자

**Fernando (techinpark)**

- GitHub: [@techinpark](https://github.com/techinpark)
- Twitter: [@techinpark](https://twitter.com/techinpark)

## 🙏 감사

- [gatsby-starter-bee](https://github.com/JaeYeopHan/gatsby-starter-bee) - 초기 템플릿 영감
- [Pretendard](https://github.com/orioncactus/pretendard) - 폰트
- [Notion API](https://developers.notion.com/) - CMS
