import React from 'react'
import Giscus from '@giscus/react'
import { useTheme } from '../context/ThemeContext'
import './GiscusComments.scss'

interface GiscusCommentsProps {
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping?: string
  reactionsEnabled?: boolean
  emitMetadata?: boolean
  inputPosition?: 'top' | 'bottom'
  lang?: string
  loading?: 'lazy' | 'eager'
}

export const GiscusComments: React.FC<GiscusCommentsProps> = ({
  repo,
  repoId,
  category,
  categoryId,
  mapping = 'pathname',
  reactionsEnabled = true,
  emitMetadata = false,
  inputPosition = 'bottom',
  lang = 'ko',
  loading = 'lazy',
}) => {
  const { theme } = useTheme()

  if (!repo || !repoId || !category || !categoryId) {
    return null
  }

  return (
    <div className="giscus-comments">
      <h3 className="giscus-comments-title">Comments</h3>
      <Giscus
        repo={repo as `${string}/${string}`}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping={mapping}
        reactionsEnabled={reactionsEnabled ? '1' : '0'}
        emitMetadata={emitMetadata ? '1' : '0'}
        inputPosition={inputPosition}
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang={lang}
        loading={loading}
      />
    </div>
  )
}
