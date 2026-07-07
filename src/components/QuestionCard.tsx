import type { Question } from '../types'

interface QuestionCardProps {
  question: Question
  index: number
  total: number
  selected: number[]
  submitted: boolean
  isBookmarked: boolean
  onToggleChoice: (choiceIndex: number) => void
  onToggleBookmark: () => void
}

const difficultyLabel: Record<Question['difficulty'], string> = {
  basic: '基礎',
  intermediate: '標準',
  advanced: '応用',
}

export function QuestionCard({
  question,
  index,
  total,
  selected,
  submitted,
  isBookmarked,
  onToggleChoice,
  onToggleBookmark,
}: QuestionCardProps) {
  const correctSet = new Set(question.correctAnswers)
  const selectedSet = new Set(selected)

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
        <span>
          問題 {index + 1} / {total}
        </span>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-slate-100 px-2 py-0.5">{difficultyLabel[question.difficulty]}</span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5">
            {question.type === 'single' ? '単一選択' : '複数選択'}
          </span>
          <button
            type="button"
            onClick={onToggleBookmark}
            aria-label="ブックマーク"
            className={`text-lg leading-none ${isBookmarked ? 'text-amber-500' : 'text-slate-300 hover:text-amber-400'}`}
          >
            {isBookmarked ? '★' : '☆'}
          </button>
        </div>
      </div>

      <p className="mb-4 whitespace-pre-wrap text-base font-medium text-slate-800">{question.question}</p>

      {question.code && (
        <pre className="mb-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          <code>{question.code}</code>
        </pre>
      )}

      <ul className="space-y-2">
        {question.choices.map((choice, i) => {
          const isSelected = selectedSet.has(i)
          const isCorrectChoice = correctSet.has(i)

          let stateClasses = 'border-slate-200 hover:border-slate-300'
          if (submitted) {
            if (isCorrectChoice) {
              stateClasses = 'border-green-500 bg-green-50'
            } else if (isSelected && !isCorrectChoice) {
              stateClasses = 'border-red-500 bg-red-50'
            }
          } else if (isSelected) {
            stateClasses = 'border-orange-500 bg-orange-50'
          }

          return (
            <li key={i}>
              <button
                type="button"
                disabled={submitted}
                onClick={() => onToggleChoice(i)}
                className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left text-sm transition disabled:cursor-default ${stateClasses}`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border text-xs ${
                    question.type === 'single' ? 'rounded-full' : 'rounded-md'
                  } ${isSelected ? 'border-orange-500 bg-orange-500 text-white' : 'border-slate-300 text-transparent'}`}
                >
                  {question.type === 'single' ? '●' : '✓'}
                </span>
                <span className="text-slate-700">{choice}</span>
              </button>
            </li>
          )
        })}
      </ul>

      {submitted && (
        <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm">
          <p className="mb-2 font-semibold text-slate-800">解説</p>
          <p className="mb-2 whitespace-pre-wrap leading-relaxed text-slate-600">{question.explanation}</p>
          <a
            href={question.reference}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-blue-600 hover:underline"
          >
            参考: MDN Web Docsで詳細を見る →
          </a>
        </div>
      )}
    </div>
  )
}
