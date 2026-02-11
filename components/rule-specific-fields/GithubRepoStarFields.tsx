'use client'

import { RuleSpecificFieldProps } from './types'

const GITHUB_REPO_PATTERN = /^https:\/\/github\.com\/[^/]+\/[^/]+/

export function GithubRepoStarFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const githubRepoUrl = (metadata.githubRepoUrl as string) ?? ''

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Star a GitHub Repository</h3>
      <p className="text-sm text-gray-600">
        Reward users for starring a GitHub repository.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">GitHub Repo URL *</span>
        <input
          type="url"
          className="rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm"
          value={githubRepoUrl}
          onChange={(e) => updateMetadata({ githubRepoUrl: e.target.value })}
          placeholder="https://github.com/owner/repo"
        />
        {githubRepoUrl && !GITHUB_REPO_PATTERN.test(githubRepoUrl) && (
          <span className="text-xs text-amber-600">Please use a valid GitHub repo URL.</span>
        )}
      </label>
    </div>
  )
}
