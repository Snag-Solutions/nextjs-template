'use client'

import { useState, useRef, useEffect } from 'react'
import { AuthType } from '@/lib/loyalty'
import { Button } from './ui/Button'

type ConnectVerifyModalProps = {
  open: boolean
  code: string
  authType: AuthType
  onClose: () => void
  onSubmit: (profileUrl: string) => void
}

const authPlaceholders: Partial<Record<AuthType, string>> = {
  tiktok: 'https://www.tiktok.com/@username',
  reddit: 'https://www.reddit.com/user/username',
  instagram: 'https://www.instagram.com/username',
}

export function ConnectVerifyModal({
  open,
  code,
  authType,
  onClose,
  onSubmit,
}: ConnectVerifyModalProps) {
  const [profileUrl, setProfileUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setProfileUrl('')
      setError(null)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = profileUrl.trim()
    if (!trimmed) {
      setError('Please enter your profile URL.')
      return
    }
    setError(null)
    onSubmit(trimmed)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="connect-verify-title"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="connect-verify-title" className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Add code to your {authType} bio
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Add this code to your {authType} bio, then enter your profile URL below.
        </p>
        <div className="mb-4 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 font-mono text-center text-lg tracking-widest">
          {code}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Your {authType} profile URL *
            </span>
            <input
              ref={inputRef}
              type="url"
              value={profileUrl}
              onChange={(e) => {
                setProfileUrl(e.target.value)
                setError(null)
              }}
              placeholder={authPlaceholders[authType] ?? `https://www.${authType}.com/@username`}
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
            />
            {error && (
              <span className="text-sm text-red-600" role="alert">
                {error}
              </span>
            )}
          </label>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
