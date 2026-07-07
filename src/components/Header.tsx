import { Link, useLocation } from 'react-router-dom'

export function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-slate-800">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-500 text-sm text-white">
            L2
          </span>
          <span className="text-base sm:text-lg">HTML5 Lv2 問題集</span>
        </Link>
        {!isHome && (
          <Link
            to="/"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            ホームへ戻る
          </Link>
        )}
      </div>
    </header>
  )
}
