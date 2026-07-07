import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgressContext } from '../context/ProgressContext'
import { allQuestions, getQuestionById } from '../data'
import { categoryMap } from '../data/categories'
import type { Question } from '../types'

function QuestionListSection({
  title,
  description,
  questions,
  onStartAll,
}: {
  title: string
  description: string
  questions: Question[]
  onStartAll: () => void
}) {
  return (
    <section className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-800">{title}</h2>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
        {questions.length > 0 && (
          <button
            onClick={onStartAll}
            className="rounded-md bg-orange-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-orange-600"
          >
            まとめて復習する ({questions.length}問)
          </button>
        )}
      </div>
      {questions.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-200 p-4 text-xs text-slate-400">対象の問題はありません。</p>
      ) : (
        <ul className="space-y-2">
          {questions.map((q) => (
            <li key={q.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 text-sm">
              <div className="min-w-0">
                <span
                  className="mr-2 rounded-full px-2 py-0.5 text-xs font-semibold text-white"
                  style={{ backgroundColor: categoryMap[q.category]?.color ?? '#64748b' }}
                >
                  {categoryMap[q.category]?.shortName ?? q.category}
                </span>
                <span className="truncate text-slate-700">{q.question}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export function ReviewPage() {
  const { progress } = useProgressContext()
  const navigate = useNavigate()

  const bookmarkedQuestions = useMemo(
    () => progress.bookmarks.map((id) => getQuestionById(id)).filter((q): q is Question => Boolean(q)),
    [progress.bookmarks],
  )

  const incorrectQuestions = useMemo(
    () =>
      allQuestions.filter((q) => {
        const attempt = progress.attempts[q.id]
        return attempt && !attempt.lastResult
      }),
    [progress.attempts],
  )

  const startReview = (questions: Question[]) => {
    navigate('/quiz/run', {
      state: {
        categoryId: 'custom',
        count: questions.length,
        mode: 'study',
        customQuestions: questions,
      },
    })
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-1 text-lg font-bold text-slate-800">復習</h1>
      <p className="mb-6 text-sm text-slate-500">ブックマークした問題や、直近で間違えた問題を再演習できます。</p>

      <QuestionListSection
        title="ブックマークした問題"
        description="学習中に★をつけた問題の一覧です。"
        questions={bookmarkedQuestions}
        onStartAll={() => startReview(bookmarkedQuestions)}
      />

      <QuestionListSection
        title="直近で間違えた問題"
        description="最後に解答した際に不正解だった問題の一覧です。"
        questions={incorrectQuestions}
        onStartAll={() => startReview(incorrectQuestions)}
      />
    </div>
  )
}
