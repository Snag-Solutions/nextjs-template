'use client'

import { RuleSpecificFieldProps } from './types'

type StreakEntry = {
  streakMilestone: number
  streakAmount: number
}

const defaultStreakEntry: StreakEntry = { streakMilestone: 7, streakAmount: 0 }

export function CheckInFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const enableStreaks = (metadata.enableStreaks as boolean) ?? false
  const streakArray = (metadata.streakArray as StreakEntry[] | undefined)
  const entry =
    Array.isArray(streakArray) && streakArray[0] != null
      ? streakArray[0]
      : defaultStreakEntry

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  const setStreak = (field: keyof StreakEntry, val: number) =>
    updateMetadata({ streakArray: [{ ...entry, [field]: val }] })

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Check-in options</h3>

      {/* Enable streak */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={enableStreaks}
          onChange={(e) => updateMetadata({ enableStreaks: e.target.checked })}
        />
        <span className="text-sm font-medium">Enable streak</span>
      </label>
      {enableStreaks && (
        <div className="flex flex-col gap-2 pl-4 border-l-2 border-gray-200">
          <span className="text-sm font-medium">Streak milestone (days → points)</span>
          <div className="grid grid-cols-2 gap-2 items-center rounded-lg border border-gray-200 p-2">
            <label className="flex flex-col gap-0.5">
              <span className="text-xs text-gray-500">Days</span>
              <input
                type="number"
                min={1}
                className="rounded border border-gray-300 px-2 py-1"
                value={entry.streakMilestone}
                onChange={(e) =>
                  setStreak('streakMilestone', parseInt(e.target.value, 10) || 0)
                }
              />
            </label>
            <label className="flex flex-col gap-0.5">
              <span className="text-xs text-gray-500">Points</span>
              <input
                type="number"
                min={0}
                className="rounded border border-gray-300 px-2 py-1"
                value={entry.streakAmount}
                onChange={(e) =>
                  setStreak('streakAmount', parseInt(e.target.value, 10) || 0)
                }
              />
            </label>
          </div>
        </div>
      )}

    </div>
  )
}
