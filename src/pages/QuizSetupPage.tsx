import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { categoryMap } from '../data/categories'
import { getQuestionsByCategory, allQuestions } from '../data'
import type { CategoryId, Difficulty, QuizMode } from '../types'

const COUNT_OPTIONS = [10, 20, 50] as const

const DIFFICULTY_OPTIONS: { value: Difficulty | 'all'; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'basic', label: '基礎' },
  { value: 'intermediate', label: '標準' },
  { value: 'advanced', label: '応用' },
]

export function QuizSetupPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()

  const isAll = categoryId === 'all'
  const category = !isAll ? categoryMap[categoryId ?? ''] : undefined
  const categoryPool = isAll ? allQuestions : getQuestionsByCategory((categoryId ?? '') as CategoryId)

  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all')
  const questionPool =
    difficulty === 'all' ? categoryPool : categoryPool.filter((q) => q.difficulty === difficulty)

  const [count, setCount] = useState<number>(Math.min(10, questionPool.length))
  const [mode, setMode] = useState<QuizMode>('study')

  const handleSelectDifficulty = (value: Difficulty | 'all') => {
    setDifficulty(value)
    const nextPoolLength = value === 'all' ? categoryPool.length : categoryPool.filter((q) => q.difficulty === value).length
    setCount((prev) => Math.min(prev, nextPoolLength) || Math.min(10, nextPoolLength))
  }

  if (!isAll && !category) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-sm text-red-600">指定されたカテゴリが見つかりません。</p>
      </div>
    )
  }

  const handleStart = () => {
    navigate('/quiz/run', {
      state: {
        categoryId: categoryId,
        count,
        mode,
        difficulty,
      },
    })
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-1 text-lg font-bold text-slate-800">
        {isAll ? '模擬試験モード' : category?.name}
      </h1>
      <p className="mb-6 text-sm text-slate-500">
        {isAll ? '全カテゴリからランダムに出題します。' : category?.description}
      </p>

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="mb-2 text-sm font-semibold text-slate-700">難易度</p>
        <div className="flex flex-wrap gap-2">
          {DIFFICULTY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelectDifficulty(opt.value)}
              className={`rounded-md border px-4 py-1.5 text-sm font-medium transition ${
                difficulty === opt.value
                  ? 'border-orange-500 bg-orange-50 text-orange-600'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="mb-2 text-sm font-semibold text-slate-700">出題数（全{questionPool.length}問中）</p>
        <div className="flex flex-wrap gap-2">
          {COUNT_OPTIONS.filter((n) => n <= questionPool.length).map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`rounded-md border px-4 py-1.5 text-sm font-medium transition ${
                count === n ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {n}問
            </button>
          ))}
          <button
            onClick={() => setCount(questionPool.length)}
            className={`rounded-md border px-4 py-1.5 text-sm font-medium transition ${
              count === questionPool.length ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            全問({questionPool.length}問)
          </button>
        </div>
      </div>

      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="mb-2 text-sm font-semibold text-slate-700">モード</p>
        <div className="space-y-2">
          <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm ${mode === 'study' ? 'border-orange-500 bg-orange-50' : 'border-slate-200'}`}>
            <input type="radio" className="mt-1" checked={mode === 'study'} onChange={() => setMode('study')} />
            <span>
              <span className="block font-medium text-slate-800">学習モード</span>
              <span className="block text-xs text-slate-500">1問ごとに解答してすぐ解説を確認できます。</span>
            </span>
          </label>
          <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm ${mode === 'exam' ? 'border-orange-500 bg-orange-50' : 'border-slate-200'}`}>
            <input type="radio" className="mt-1" checked={mode === 'exam'} onChange={() => setMode('exam')} />
            <span>
              <span className="block font-medium text-slate-800">模擬試験モード</span>
              <span className="block text-xs text-slate-500">最後まで解答してからまとめて採点・解説を確認します。</span>
            </span>
          </label>
        </div>
      </div>

      {questionPool.length === 0 && (
        <p className="mb-4 text-sm text-red-600">この難易度の問題がまだ登録されていません。別の難易度を選んでください。</p>
      )}

      <button
        onClick={handleStart}
        disabled={questionPool.length === 0}
        className="w-full rounded-md bg-orange-500 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        演習を開始する
      </button>
    </div>
  )
}
