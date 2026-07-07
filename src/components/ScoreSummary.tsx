interface ScoreSummaryProps {
  score: number
  total: number
}

export function ScoreSummary({ score, total }: ScoreSummaryProps) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0
  const passed = pct >= 62

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="mb-1 text-sm text-slate-500">結果</p>
      <p className="mb-2 text-4xl font-bold text-slate-800">
        {score} <span className="text-lg font-normal text-slate-400">/ {total} 問正解</span>
      </p>
      <p className={`mb-4 text-lg font-semibold ${passed ? 'text-green-600' : 'text-red-500'}`}>{pct}%</p>
      <p className="text-sm text-slate-500">
        {passed ? '目安の合格ライン(62%)を超えています。この調子で他のカテゴリも演習しましょう。' : '合格ラインの目安は62%です。誤答した問題を復習しましょう。'}
      </p>
    </div>
  )
}
