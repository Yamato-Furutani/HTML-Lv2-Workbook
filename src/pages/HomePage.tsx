import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CategoryCard } from '../components/CategoryCard'
import { categories } from '../data/categories'
import { questionsByCategory } from '../data'
import { useProgressContext } from '../context/ProgressContext'
import { useLevelContext } from '../context/LevelContext'
import { getCategoryStats } from '../hooks/useProgress'

export function HomePage() {
  const navigate = useNavigate()
  const { progress, resetProgress } = useProgressContext()
  const { level } = useLevelContext()

  const levelCategories = useMemo(() => categories.filter((c) => c.level === level), [level])
  const levelQuestions = useMemo(
    () => levelCategories.flatMap((c) => questionsByCategory[c.id]),
    [levelCategories],
  )

  const overallStats = useMemo(
    () => getCategoryStats(progress, levelQuestions.map((q) => q.id)),
    [progress, levelQuestions],
  )

  const handleResetProgress = () => {
    if (confirm('学習進捗(正誤履歴・ブックマーク・受験履歴)をすべて削除します。よろしいですか？')) {
      resetProgress()
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <section className="mb-8 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white shadow-sm sm:p-8">
        <h1 className="mb-2 text-xl font-bold sm:text-2xl">
          HTML5プロフェッショナル認定試験 {level === 'L1' ? 'レベル1' : 'レベル2'} 問題集
        </h1>
        <p className="mb-4 text-sm text-orange-50">
          公式サイトの例題解説カテゴリとMDN Web Docsに基づいた全{levelQuestions.length}問を収録。カテゴリ別演習と模擬試験モードで実力をチェックしましょう。
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate(`/quiz/setup/all-${level.toLowerCase()}`)}
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm transition hover:bg-orange-50"
          >
            模擬試験モードを開始
          </button>
          <button
            onClick={() => navigate('/review')}
            className="rounded-md border border-white/60 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            復習(ブックマーク・誤答)
          </button>
          <span className="text-xs text-orange-50">
            全体正答率: {overallStats.attempted > 0 ? Math.round((overallStats.correct / overallStats.attempted) * 100) : 0}%
            ({overallStats.attempted}/{overallStats.total}問挑戦済み)
          </span>
        </div>
      </section>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">カテゴリ別演習</h2>
        <button onClick={handleResetProgress} className="text-xs text-slate-400 underline hover:text-slate-600">
          進捗をリセット
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {levelCategories.map((category) => {
          const questions = questionsByCategory[category.id]
          const stats = getCategoryStats(progress, questions.map((q) => q.id))
          return (
            <CategoryCard
              key={category.id}
              category={category}
              totalQuestions={stats.total}
              correctCount={stats.correct}
              attemptedCount={stats.attempted}
              onStart={() => navigate(`/quiz/setup/${category.id}`)}
            />
          )
        })}
      </div>
    </div>
  )
}
