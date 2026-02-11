'use client'

import { RuleSpecificFieldProps } from './types'

type QuizChoice = { id: string; text: string; isCorrect: boolean }

function getChoices(metadata: Record<string, unknown>): QuizChoice[] {
  const raw = metadata.questionChoices
  if (!Array.isArray(raw)) return [{ id: 'choice-0', text: '', isCorrect: true }]
  return raw.map((c, i) => {
    if (typeof c === 'object' && c !== null && 'text' in c) {
      const o = c as QuizChoice
      return {
        id: o.id || `choice-${i}`,
        text: String(o.text),
        isCorrect: Boolean(o.isCorrect),
      }
    }
    return { id: `choice-${i}`, text: '', isCorrect: i === 0 }
  })
}

/**
 * Specific fields for "Answer a Quiz" (quiz) rule type.
 * Mirrors LoyaltyRuleForm QuestionSection: question text + Answers list with one correct, Add Answer.
 */
export function QuizFields({ value, onChange }: RuleSpecificFieldProps) {
  const metadata = value.metadata ?? {}
  const questionText = (metadata.questionText as string) ?? ''
  const choices = getChoices(metadata)

  const updateMetadata = (patch: Record<string, unknown>) =>
    onChange({ metadata: { ...metadata, ...patch } })

  const setChoices = (next: QuizChoice[]) =>
    updateMetadata({ questionChoices: next })

  const updateChoice = (index: number, updates: Partial<QuizChoice>) => {
    const next = [...choices]
    next[index] = { ...next[index], ...updates }
    setChoices(next)
  }

  const setCorrect = (index: number) => {
    setChoices(
      choices.map((c, i) => ({ ...c, isCorrect: i === index }))
    )
  }

  const addChoice = () =>
    setChoices([...choices, { id: `choice-${Date.now()}`, text: '', isCorrect: false }])

  const removeChoice = (index: number) => {
    if (choices.length <= 1) return
    const next = choices.filter((_, i) => i !== index)
    if (choices[index].isCorrect && next.length > 0) next[0].isCorrect = true
    setChoices(next)
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Answer a Quiz</h3>
      <p className="text-sm text-gray-600">
        Reward users for selecting the correct answer in a quiz.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Question</span>
        <input
          type="text"
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={questionText}
          onChange={(e) => updateMetadata({ questionText: e.target.value })}
          placeholder="e.g. What is the capital of France?"
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
                onChange={(e) => updateChoice(index, { text: e.target.value })}
                placeholder={`Answer ${index + 1}`}
              />
              <label className="flex items-center gap-2 shrink-0 cursor-pointer">
                <input
                  type="radio"
                  name="quiz-correct"
                  checked={choice.isCorrect}
                  onChange={() => setCorrect(index)}
                  className="rounded-full border-gray-300"
                />
                <span className="text-sm whitespace-nowrap">Correct</span>
              </label>
              <button
                type="button"
                onClick={() => removeChoice(index)}
                disabled={choices.length <= 1}
                className="p-2 text-tx-secondary hover:text-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
                title={choices.length <= 1 ? 'At least one answer is required' : 'Remove answer'}
              >
                <i className="fi fi-rr-trash text-lg" />
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
