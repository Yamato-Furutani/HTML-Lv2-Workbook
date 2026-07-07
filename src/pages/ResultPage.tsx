import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ScoreSummary } from '../components/ScoreSummary'
import { AnswerReviewList, type ReviewItem } from '../components/AnswerReviewList'
import { categoryMap } from '../data/categories'
import type { CategoryId } from '../types'

interface ResultLocationState {
  reviewItems: ReviewItem[]
  score: number
  total: number
}

export function ResultPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as ResultLocationState | null
  const [filter, setFilter] = useState<'all' | 'incorrect'>('incorrect')

  const categoryBreakdown = useMemo(() => {
    if (!state) return []
    const map = new Map<CategoryId, { correct: number; total: number }>()
    for (const item of state.reviewItems) {
      const entry = map.get(item.question.category) ?? { correct: 0, total: 0 }
      entry.total += 1
      if (item.correct) entry.correct += 1
      map.set(item.question.category, entry)
    }
    return Array.from(map.entries()).map(([categoryId, v]) => ({ categoryId, ...v }))
  }, [state])

  if (!state) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <p className="mb-4 text-sm text-slate-600">結果データが見つかりませんでした。</p>
        <button onClick={() => navigate('/')} className="rounded-md bg-slate-800 px-4 py-2 text-sm text-white">
          ホームへ戻る
        </button>
      </div>
    )
  }

  const displayedItems = filter === 'all' ? state.reviewItems : state.reviewItems.filter((r) => !r.correct)

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6">
        <ScoreSummary score={state.score} total={state.total} />
      </div>

      {categoryBreakdown.length > 1 && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-3 text-sm font-semibold text-slate-700">カテゴリ別正答率</p>
          <ul className="space-y-2">
            {categoryBreakdown.map(({ categoryId, correct, total }) => (
              <li key={categoryId} className="flex items-center justify-between text-sm">
                <span className="text-slate-600">{categoryMap[categoryId]?.shortName ?? categoryId}</span>
                <span className="font-medium text-slate-800">
                  {correct} / {total} ({Math.round((correct / total) * 100)}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800">解答詳細</h2>
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setFilter('incorrect')}
            className={`rounded-full px-3 py-1 ${filter === 'incorrect' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            誤答のみ
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`rounded-full px-3 py-1 ${filter === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            すべて
          </button>
        </div>
      </div>

      <AnswerReviewList items={displayedItems} />

      <button
        onClick={() => navigate('/')}
        className="mt-8 w-full rounded-md bg-slate-800 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        ホームへ戻る
      </button>
    </div>
  )
}
