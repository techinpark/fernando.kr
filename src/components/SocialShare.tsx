import React from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
} from 'react-share'
import { SocialShareProps } from '../types'
import './SocialShare.scss'

export const SocialShare: React.FC<SocialShareProps> = ({
  url,
  title,
  description,
}) => {
  const handleCopyLink = (): void => {
    navigator.clipboard.writeText(url)
    alert('링크가 복사되었습니다!')
  }

  return (
    <div className="social-share">
      <h3 className="social-share-title">이 글을 공유하세요</h3>
      <div className="social-share-buttons">
        <FacebookShareButton url={url} quote={title}>
          <div className="social-share-button">
            <FacebookIcon size={40} round />
            <span>Facebook</span>
          </div>
        </FacebookShareButton>

        <TwitterShareButton url={url} title={title}>
          <div className="social-share-button">
            <TwitterIcon size={40} round />
            <span>Twitter</span>
          </div>
        </TwitterShareButton>

        <LinkedinShareButton url={url} title={title} summary={description}>
          <div className="social-share-button">
            <LinkedinIcon size={40} round />
            <span>LinkedIn</span>
          </div>
        </LinkedinShareButton>

        <TelegramShareButton url={url} title={title}>
          <div className="social-share-button">
            <TelegramIcon size={40} round />
            <span>Telegram</span>
          </div>
        </TelegramShareButton>

        <button onClick={handleCopyLink} className="social-share-button copy">
          <div className="social-share-copy-icon">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="currentColor"
            >
              <circle cx="20" cy="20" r="20" fill="#6c757d" />
              <path
                d="M20 14v8m0 4h.01M28 20c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <span>URL 복사</span>
        </button>
      </div>
    </div>
  )
}
