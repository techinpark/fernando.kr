# Notion CMS 설정 가이드

이 가이드는 Fernando 블로그에서 Notion을 CMS로 사용하기 위한 설정 방법을 안내합니다.

## 📋 목차

1. [Notion Integration 생성](#1-notion-integration-생성)
2. [블로그 데이터베이스 생성](#2-블로그-데이터베이스-생성)
3. [Integration 연결](#3-integration-연결)
4. [환경 변수 설정](#4-환경-변수-설정)
5. [첫 포스트 작성](#5-첫-포스트-작성)

---

## 1. Notion Integration 생성

### 1.1 Notion Integrations 페이지 접속

1. [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations) 접속
2. **"New integration"** 버튼 클릭

### 1.2 Integration 설정

- **Name**: `Fernando Blog` (또는 원하는 이름)
- **Logo**: (선택사항)
- **Associated workspace**: 본인의 워크스페이스 선택
- **Type**: Internal Integration
- **Capabilities**:
  - ✅ Read content
  - ✅ Update content
  - ✅ Insert content

### 1.3 Integration 생성 완료

"Submit" 버튼을 클릭하면 **Integration Token**이 생성됩니다.

**⚠️ 중요:** 토큰을 안전한 곳에 복사해두세요! (`.env` 파일에 사용)

---

## 2. 블로그 데이터베이스 생성

### 2.1 새 페이지 생성

1. Notion에서 새 페이지 생성
2. 페이지 이름: `블로그 포스트` (또는 원하는 이름)

### 2.2 데이터베이스 생성

1. `/table` 입력하여 Table Database 생성
2. 아래 속성(Properties)를 추가:

| 속성 이름 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| **Title** | Title | ✅ | 포스트 제목 |
| **Slug** | Text | ✅ | URL 슬러그 (예: `my-first-post`) |
| **Date** | Date | ✅ | 작성일 |
| **Tags** | Multi-select | ⬜ | 태그 (예: React, JavaScript) |
| **Published** | Checkbox | ✅ | 공개 여부 |
| **Description** | Text | ⬜ | 포스트 설명 (SEO) |
| **Cover** | Files & media | ⬜ | 커버 이미지 |

### 2.3 데이터베이스 ID 복사

1. 데이터베이스 페이지 우측 상단 `...` 메뉴 클릭
2. **"Copy link"** 선택
3. URL에서 Database ID 추출:
   ```
   https://www.notion.so/12345678901234567890123456789012?v=...
                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                             이 부분이 Database ID
   ```

**⚠️ 중요:** Database ID를 복사해두세요! (`.env` 파일에 사용)

---

## 3. Integration 연결

### 3.1 데이터베이스에 Integration 연결

1. 데이터베이스 페이지에서 우측 상단 `...` 메뉴 클릭
2. **"+ Add connections"** 선택
3. 1단계에서 생성한 Integration 선택 (예: `Fernando Blog`)
4. **"Confirm"** 클릭

이제 Integration이 이 데이터베이스에 접근할 수 있습니다!

---

## 4. 환경 변수 설정

### 4.1 `.env` 파일 생성

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 입력:

```env
# Notion API 설정
NOTION_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=12345678901234567890123456789012

# 사이트 URL
SITE_URL=https://fernando.kr

# Google Analytics (선택사항)
GA_TRACKING_ID=G-XXXXXXXXXX

# Disqus (선택사항)
DISQUS_SHORTNAME=fernando-blog
```

### 4.2 값 설명

- **NOTION_TOKEN**: 1.3단계에서 복사한 Integration Token
- **NOTION_DATABASE_ID**: 2.3단계에서 복사한 Database ID
- **SITE_URL**: 배포할 도메인 (로컬 개발 시에는 비워둬도 됨)
- **GA_TRACKING_ID**: Google Analytics 추적 ID (선택사항)
- **DISQUS_SHORTNAME**: Disqus 댓글 시스템 Short Name (선택사항)

---

## 5. 첫 포스트 작성

### 5.1 새 포스트 생성

1. Notion 데이터베이스에서 **"+ New"** 버튼 클릭
2. 각 속성 입력:

**예시:**
- **Title**: `안녕하세요, 첫 포스트입니다!`
- **Slug**: `hello-world`
- **Date**: `2025-01-15`
- **Tags**: `일상`, `블로그`
- **Published**: ✅ (체크)
- **Description**: `첫 포스트를 작성해봤습니다.`
- **Cover**: (선택사항) 이미지 업로드

### 5.2 본문 작성

페이지를 열고 일반 Notion 페이지처럼 본문을 작성합니다.

**지원하는 블록:**
- 제목 (Heading 1, 2, 3)
- 단락 (Paragraph)
- 목록 (Bulleted list, Numbered list)
- 인용 (Quote)
- 코드 블록 (Code)
- 이미지 (Image)
- 표 (Table)
- 등등...

### 5.3 확인

1. 터미널에서 개발 서버 실행:
   ```bash
   npm run develop
   ```

2. 브라우저에서 http://localhost:8000 접속

3. 포스트가 보이는지 확인!

---

## 📝 포스트 작성 팁

### Slug 작성 규칙

- 영문 소문자, 숫자, 하이픈(`-`)만 사용
- 공백 대신 하이픈 사용
- 한글 URL을 원하면 한글로 작성 가능

**좋은 예:**
- `my-first-post`
- `react-hooks-guide`
- `2025-회고`

**나쁜 예:**
- `My First Post` (공백, 대문자)
- `react_hooks_guide` (언더스코어)

### Description 작성

- SEO와 소셜 공유 시 사용됩니다
- 1-2문장으로 포스트 내용 요약
- 150-160자 이내 권장

### Cover 이미지

- 1200x630 크기 권장 (OG 이미지 표준)
- JPG, PNG 형식 지원
- Notion에 직접 업로드하거나 외부 URL 사용 가능

---

## 🔄 포스트 업데이트

포스트를 수정한 후에는:

1. Notion에서 포스트 수정
2. Gatsby 재빌드 (`Ctrl+C` 후 `npm run develop` 다시 실행)
3. 브라우저에서 변경사항 확인

**배포 후:**
- Netlify/Vercel에서 자동으로 재빌드됩니다
- 또는 수동으로 빌드 트리거

---

## ❓ 문제 해결

### "Notion API가 설정되지 않았습니다" 오류

- `.env` 파일이 프로젝트 루트에 있는지 확인
- `NOTION_TOKEN`과 `NOTION_DATABASE_ID`가 올바른지 확인
- 개발 서버 재시작 (`Ctrl+C` 후 `npm run develop`)

### 포스트가 안 보임

- Notion 데이터베이스에서 **Published** 체크박스가 체크되어 있는지 확인
- Integration이 데이터베이스에 연결되어 있는지 확인 (3단계)
- 개발 서버 재시작

### 이미지가 안 보임

- Notion에서 이미지가 제대로 업로드되었는지 확인
- 외부 URL 이미지의 경우 CORS 정책 확인

---

## 🎉 완료!

이제 Notion에서 포스트를 작성하고 블로그에 게시할 수 있습니다!

더 자세한 내용은 [Notion API 문서](https://developers.notion.com/)를 참고하세요.
