'use client'

import { RuleSpecificFieldProps } from './types'

function getServers(metadata: Record<string, unknown>) {
  const arr = metadata.discordServersToJoin as { id?: string }[] | undefined
  return Array.isArray(arr) && arr[0] != null ? arr : [{ id: '' }]
}

export function DiscordJoinFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const servers = getServers(metadata)
  const serverId = servers[0]?.id ?? ''
  const ctaHref = (metadata.cta as { href?: string } | undefined)?.href ?? ''

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  const setCtaHref = (href: string) =>
    updateMetadata({ cta: { ...(metadata.cta as object || {}), href } })

  const setServerId = (id: string) =>
    updateMetadata({ discordServersToJoin: [{ ...servers[0], id }] })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Join Discord Server</h3>
      <p className="text-sm text-gray-600">
        Reward users for joining your Discord server.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Guild or Server ID *</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2 font-mono"
          value={serverId}
          onChange={(e) => setServerId(e.target.value)}
          placeholder="e.g. 123…"
        />
        <span className="text-xs text-gray-500">
          Enable Developer Mode, then right-click the server and select Copy Server ID.
        </span>
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Server invite link *</span>
        <input
          type="url"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={ctaHref}
          onChange={(e) => setCtaHref(e.target.value)}
          placeholder="https://discord.gg/..."
        />
      </label>
    </div>
  )
}
