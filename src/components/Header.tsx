import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLevelContext } from '../context/LevelContext'
import type { ExamLevel } from '../types'

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const { level, setLevel } = useLevelContext()

  const handleSelectLevel = (next: ExamLevel) => {
    setLevel(next)
    if (!isHome) navigate('/')
  }

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-slate-800">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-500 text-sm text-white">
            {level}
          </span>
          <span className="text-base sm:text-lg">HTML5 {level === 'L1' ? 'Lv1' : 'Lv2'} 問題集</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex rounded-md border border-slate-200 p-0.5 text-xs font-semibold">
            {(['L1', 'L2'] as const).map((l) => (
              <button
                key={l}
                onClick={() => handleSelectLevel(l)}
                className={`rounded px-2.5 py-1 transition ${
                  level === l ? 'bg-orange-500 text-white' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          {!isHome && (
            <Link
              to="/"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              ホームへ戻る
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
