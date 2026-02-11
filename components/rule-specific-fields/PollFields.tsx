'use client'

import { RuleSpecificFieldProps } from './types'

type PollChoice = { id: string; text: string }

function getChoices(metadata: Record<string, unknown>): PollChoice[] {
  const raw = metadata.questionChoices
  if (!Array.isArray(raw)) return [{ id: 'choice-0', text: '' }]
  return raw.map((c, i) =>
    typeof c === 'object' && c !== null && 'text' in c
      ? { id: (c as PollChoice).id || `choice-${i}`, text: String((c as PollChoice).text) }
      : { id: `choice-${i}`, text: '' }
  )
}

/**
 * Specific fields for "Answer a Poll" (poll) rule type.
 * Mirrors LoyaltyRuleForm QuestionSection: question text + Answers list with Add Answer.
 */
export function PollFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const questionText = (metadata.questionText as string) ?? ''
  const choices = getChoices(metadata)

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  const setChoices = (next: PollChoice[]) =>
    updateMetadata({ questionChoices: next })

  const updateChoice = (index: number, text: string) => {
    const next = [...choices]
    next[index] = { ...next[index], text }
    setChoices(next)
  }

  const addChoice = () =>
    setChoices([...choices, { id: `choice-${Date.now()}`, text: '' }])

  const removeChoice = (index: number) => {
    if (choices.length <= 1) return
    setChoices(choices.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Answer a Poll</h3>
      <p className="text-sm text-gray-600">
        Reward users for answering a poll.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Question</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={questionText}
          onChange={(e) => updateMetadata({ questionText: e.target.value })}
          placeholder="e.g. What is your favorite feature?"
        />
      </label>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">Answers *</span>
        <div className="flex flex-col gap-2">
          {choices.map((choice, index) => (
            <div key={choice.id} className="flex items-center gap-2">
              <input
                type="text"
                className="rounded-lg border border-gray-300 px-3 py-2 flex-1"
                value={choice.text}
                onChange={(e) => updateChoice(index, e.target.value)}
                placeholder={`Answer ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeChoice(index)}
                disabled={choices.length <= 1}
                className="p-2 text-tx-secondary hover:text-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
                title={choices.length <= 1 ? 'At least one answer is required' : 'Remove answer'}
              >
                delete
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addChoice}
          className="inline-flex items-center gap-2 text-sm font-medium text-ui-primary hover:underline max-w-fit"
        >
          <i className="fi fi-rr-plus" />
          Add Answers
        </button>
      </div>
    </div>
  )
}
