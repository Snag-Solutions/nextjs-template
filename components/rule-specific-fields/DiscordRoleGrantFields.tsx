'use client'

import { RuleSpecificFieldProps } from './types'

function getServers(metadata: Record<string, unknown>) {
  const arr = metadata.discordServersToJoin as { id?: string; roles?: { id: string }[] }[] | undefined
  return Array.isArray(arr) && arr[0] != null ? arr : [{ id: '', roles: [{ id: '' }] }]
}

export function DiscordRoleGrantFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const servers = getServers(metadata)
  const server = servers[0] ?? { id: '', roles: [{ id: '' }] }
  const serverId = server.id ?? ''
  const roles = Array.isArray(server.roles) && server.roles.length > 0 ? server.roles : [{ id: '' }]
  const ctaHref = (metadata.cta as { href?: string } | undefined)?.href ?? ''

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  const setCtaHref = (href: string) =>
    updateMetadata({ cta: { ...(metadata.cta as object || {}), href } })

  const setServerId = (id: string) =>
    updateMetadata({ discordServersToJoin: [{ ...server, id }] })

  const setRoles = (next: { id: string }[]) =>
    updateMetadata({ discordServersToJoin: [{ ...server, roles: next }] })

  const setRoleId = (index: number, id: string) => {
    const next = [...roles]
    if (!next[index]) next[index] = { id: '' }
    next[index] = { id }
    setRoles(next)
  }

  const addRole = () => setRoles([...roles, { id: '' }])
  const removeRole = (index: number) => setRoles(roles.filter((_, i) => i !== index))

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Grant a Discord Role</h3>
      <p className="text-sm text-gray-600">
        Reward users for granting a specific role in your Discord server.
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
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">User will be granted the following roles upon completion</span>
        <p className="text-xs text-gray-500">
          Go to Server Settings → Roles, then right-click the role and select Copy ID.
        </p>
        {roles.map((role, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              type="text"
              className="rounded-lg border border-gray-300 px-3 py-2 font-mono flex-1 max-w-[276px]"
              value={role.id}
              onChange={(e) => setRoleId(i, e.target.value)}
              placeholder="e.g. 456…"
            />
            {roles.length > 1 && (
              <button
                type="button"
                className="text-red-600 hover:underline text-sm"
                onClick={() => removeRole(i)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" className="text-sm text-blue-600 hover:underline self-start" onClick={addRole}>
          + Add another role
        </button>
      </div>
    </div>
  )
}
