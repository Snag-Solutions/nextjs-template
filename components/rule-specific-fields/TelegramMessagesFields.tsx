'use client'

import { RuleSpecificFieldProps } from './types'

export function TelegramMessagesFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const telegramChannelId = (metadata.telegramChannelId as string) ?? ''
  const ctaHref = (metadata.cta as { href?: string } | undefined)?.href ?? ''

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  const setCtaHref = (href: string) =>
    updateMetadata({ cta: { ...(metadata.cta as object || {}), href } })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Send Telegram Messages</h3>
      <p className="text-sm text-gray-600">
        Reward users for sending messages in your Telegram group.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Telegram group ID *</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2 font-mono"
          value={telegramChannelId}
          onChange={(e) => updateMetadata({ telegramChannelId: e.target.value })}
          placeholder="e.g. @mygroup"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Group link *</span>
        <input
          type="url"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={ctaHref}
          onChange={(e) => setCtaHref(e.target.value)}
          placeholder="https://t.me/..."
        />
      </label>
    </div>
  )
}
