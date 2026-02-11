'use client'

import { RuleSpecificFieldProps } from './types'

type DiscordChannel = {
  id: string
  text?: string
  emojis: { id: string }[]
}

function getServers(metadata: Record<string, unknown>) {
  const arr = metadata.discordServersToJoin as { channels?: DiscordChannel[] }[] | undefined
  return Array.isArray(arr) && arr[0] != null ? arr : [{ channels: [{ id: '', text: '', emojis: [{ id: '' }] }] }]
}

export function DiscordMessagesFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const servers = getServers(metadata)
  const server = servers[0] ?? { channels: [] }
  const channels: DiscordChannel[] = Array.isArray(server.channels) && server.channels.length > 0
    ? server.channels
    : [{ id: '', text: '', emojis: [{ id: '' }] }]

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  const setChannels = (next: DiscordChannel[]) =>
    updateMetadata({ discordServersToJoin: [{ ...server, channels: next }] })

  const updateChannel = (channelIndex: number, field: keyof DiscordChannel, val: string | { id: string }[]) => {
    const next = [...channels]
    if (!next[channelIndex]) next[channelIndex] = { id: '', text: '', emojis: [{ id: '' }] }
    ;(next[channelIndex] as Record<string, unknown>)[field] = val
    setChannels(next)
  }

  const updateEmoji = (channelIndex: number, emojiIndex: number, id: string) => {
    const ch = channels[channelIndex]
    if (!ch) return
    const emojis = [...(ch.emojis || [{ id: '' }])]
    if (!emojis[emojiIndex]) emojis[emojiIndex] = { id: '' }
    emojis[emojiIndex] = { id }
    updateChannel(channelIndex, 'emojis', emojis)
  }

  const addEmoji = (channelIndex: number) => {
    const ch = channels[channelIndex]
    if (!ch) return
    const emojis = [...(ch.emojis || []), { id: '' }]
    updateChannel(channelIndex, 'emojis', emojis)
  }

  const removeEmoji = (channelIndex: number, emojiIndex: number) => {
    const ch = channels[channelIndex]
    if (!ch?.emojis) return
    const emojis = ch.emojis.filter((_, i) => i !== emojiIndex)
    updateChannel(channelIndex, 'emojis', emojis.length ? emojis : [{ id: '' }])
  }

  const addChannel = () =>
    setChannels([...channels, { id: '', text: '', emojis: [{ id: '' }] }])

  const removeChannel = (channelIndex: number) =>
    setChannels(channels.filter((_, i) => i !== channelIndex))

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Send Discord Messages</h3>
      <p className="text-sm text-gray-600">
        This rule rewards Discord messages based on a specific emoji response, normally from a moderator, or a specific string of text included by the user.
      </p>
      {channels.map((channel, channelIndex) => (
        <div key={channelIndex} className="flex flex-col gap-3 pl-4 border-l-2 border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Channel {channelIndex + 1}</span>
            {channels.length > 1 && (
              <button type="button" className="text-sm text-red-600 hover:underline" onClick={() => removeChannel(channelIndex)}>
                Remove channel
              </button>
            )}
          </div>
          <label className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-500">Discord Channel ID *</span>
            <input
              type="text"
              className="rounded-lg border border-gray-300 px-3 py-2 font-mono"
              value={channel.id}
              onChange={(e) => updateChannel(channelIndex, 'id', e.target.value)}
              placeholder="Discord Channel id"
            />
          </label>
          <label className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-500">Text to be present in the Discord message</span>
            <input
              type="text"
              className="rounded-lg border border-gray-300 px-3 py-2"
              value={channel.text ?? ''}
              onChange={(e) => updateChannel(channelIndex, 'text', e.target.value)}
              placeholder="Text to be present in the discord message"
            />
          </label>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">Emoji, emoji id OR name</span>
            {(channel.emojis ?? [{ id: '' }]).map((emoji, emojiIndex) => (
              <div key={emojiIndex} className="flex gap-2 items-center">
                <input
                  type="text"
                  className="rounded-lg border border-gray-300 px-3 py-2 flex-1"
                  value={emoji.id}
                  onChange={(e) => updateEmoji(channelIndex, emojiIndex, e.target.value)}
                  placeholder="e.g. 👍, 1222388175788441610 OR CustomEmojiName"
                />
                {(channel.emojis?.length ?? 0) > 1 && (
                  <button type="button" className="text-sm text-red-600 hover:underline" onClick={() => removeEmoji(channelIndex, emojiIndex)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="text-sm text-blue-600 hover:underline self-start" onClick={() => addEmoji(channelIndex)}>
              + Add emoji
            </button>
          </div>
        </div>
      ))}
      <button type="button" className="text-sm text-blue-600 hover:underline self-start" onClick={addChannel}>
        + Add new channel
      </button>
    </div>
  )
}
