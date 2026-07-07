import type { Category } from '../types'
import { ProgressBar } from './ProgressBar'

interface CategoryCardProps {
  category: Category
  totalQuestions: number
  correctCount: number
  attemptedCount: number
  onStart: () => void
}

export function CategoryCard({
  category,
  totalQuestions,
  correctCount,
  attemptedCount,
  onStart,
}: CategoryCardProps) {
  const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0

  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
            style={{ backgroundColor: category.color }}
          >
            {category.shortName}
          </span>
          <span className="text-xs text-slate-400">全{totalQuestions}問</span>
        </div>
        <h3 className="mb-1 text-sm font-bold text-slate-800">{category.name}</h3>
        <p className="mb-4 text-xs leading-relaxed text-slate-500">{category.description}</p>
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
          <span>
            正答率 {attemptedCount > 0 ? `${accuracy}%` : '未挑戦'}
          </span>
          <span>
            {attemptedCount}/{totalQuestions} 問挑戦済み
          </span>
        </div>
        <ProgressBar value={accuracy} color={category.color} />
        <button
          onClick={onStart}
          className="mt-4 w-full rounded-md bg-slate-800 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          このカテゴリを演習する
        </button>
      </div>
    </div>
  )
}
