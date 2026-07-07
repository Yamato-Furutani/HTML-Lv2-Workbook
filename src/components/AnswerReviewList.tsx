import { categoryMap } from '../data/categories'
import type { Question } from '../types'

export interface ReviewItem {
  question: Question
  selected: number[]
  correct: boolean
}

export function AnswerReviewList({ items }: { items: ReviewItem[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-slate-500">対象の問題はありません。</p>
  }

  return (
    <ul className="space-y-4">
      {items.map(({ question, selected, correct }) => {
        const selectedSet = new Set(selected)
        const correctSet = new Set(question.correctAnswers)
        const category = categoryMap[question.category]

        return (
          <li key={question.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-xs">
              <span
                className="rounded-full px-2 py-0.5 font-semibold text-white"
                style={{ backgroundColor: category?.color ?? '#64748b' }}
              >
                {category?.shortName ?? question.category}
              </span>
              <span className={`rounded-full px-2 py-0.5 font-semibold ${correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {correct ? '正解' : '不正解'}
              </span>
            </div>
            <p className="mb-3 whitespace-pre-wrap text-sm font-medium text-slate-800">{question.question}</p>
            <ul className="mb-3 space-y-1 text-sm">
              {question.choices.map((choice, i) => {
                const isSelected = selectedSet.has(i)
                const isCorrectChoice = correctSet.has(i)
                let classes = 'text-slate-500'
                if (isCorrectChoice) classes = 'text-green-700 font-medium'
                else if (isSelected) classes = 'text-red-600 line-through'
                return (
                  <li key={i} className={classes}>
                    {isCorrectChoice ? '✓ ' : isSelected ? '✗ ' : '・'}
                    {choice}
                  </li>
                )
              })}
            </ul>
            <div className="rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
              {question.explanation}
              <br />
              <a
                href={question.reference}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                参考: MDN Web Docsで詳細を見る →
              </a>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
