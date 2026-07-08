import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { QuestionCard } from '../components/QuestionCard'
import { allQuestions, getQuestionsByCategory } from '../data'
import { useProgressContext } from '../context/ProgressContext'
import { pickRandom, shuffleChoices } from '../utils/shuffle'
import { isCorrect } from '../utils/scoring'
import type { CategoryId, Difficulty, Question, QuizMode } from '../types'
import type { ReviewItem } from '../components/AnswerReviewList'

interface QuizLocationState {
  categoryId: string
  count: number
  mode: QuizMode
  difficulty?: Difficulty | 'all'
  customQuestions?: Question[]
}

export function QuizPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { progress, recordAnswer, addHistoryEntry, toggleBookmark } = useProgressContext()

  const state = location.state as QuizLocationState | null

  const questions = useMemo(() => {
    if (!state) return []
    if (state.customQuestions) return state.customQuestions.map(shuffleChoices)
    const pool = state.categoryId === 'all' ? allQuestions : getQuestionsByCategory(state.categoryId as CategoryId)
    const filteredPool =
      state.difficulty && state.difficulty !== 'all' ? pool.filter((q) => q.difficulty === state.difficulty) : pool
    return pickRandom(filteredPool, state.count).map(shuffleChoices)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedByQuestion, setSelectedByQuestion] = useState<Record<string, number[]>>({})
  const [submittedByQuestion, setSubmittedByQuestion] = useState<Record<string, boolean>>({})

  if (!state || questions.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <p className="mb-4 text-sm text-slate-600">演習データが見つかりませんでした。ホームから演習を開始してください。</p>
        <button onClick={() => navigate('/')} className="rounded-md bg-slate-800 px-4 py-2 text-sm text-white">
          ホームへ戻る
        </button>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const selected = selectedByQuestion[currentQuestion.id] ?? []
  const submitted = submittedByQuestion[currentQuestion.id] ?? false
  const isLast = currentIndex === questions.length - 1

  const handleToggleChoice = (choiceIndex: number) => {
    if (submitted) return
    setSelectedByQuestion((prev) => {
      const current = prev[currentQuestion.id] ?? []
      if (currentQuestion.type === 'single') {
        return { ...prev, [currentQuestion.id]: [choiceIndex] }
      }
      const next = current.includes(choiceIndex)
        ? current.filter((i) => i !== choiceIndex)
        : [...current, choiceIndex]
      return { ...prev, [currentQuestion.id]: next }
    })
  }

  const finishQuiz = (finalSelected: Record<string, number[]>) => {
    const reviewItems: ReviewItem[] = questions.map((q) => {
      const sel = finalSelected[q.id] ?? []
      const correct = isCorrect(sel, q.correctAnswers)
      return { question: q, selected: sel, correct }
    })
    const score = reviewItems.filter((r) => r.correct).length

    reviewItems.forEach((r) => recordAnswer(r.question.id, r.correct))
    addHistoryEntry({
      at: new Date().toISOString(),
      categoryId: state.categoryId === 'all' ? 'all' : (state.categoryId as CategoryId),
      mode: state.mode,
      score,
      total: questions.length,
    })

    navigate('/quiz/result', { state: { reviewItems, score, total: questions.length } })
  }

  const handleNext = () => {
    if (state.mode === 'study' && !submitted) {
      setSubmittedByQuestion((prev) => ({ ...prev, [currentQuestion.id]: true }))
      return
    }

    if (isLast) {
      finishQuiz(selectedByQuestion)
      return
    }
    setCurrentIndex((i) => i + 1)
  }

  const canProceed = selected.length > 0

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-4">
        <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
          <span>進捗</span>
          <span>
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-orange-500 transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <QuestionCard
        question={currentQuestion}
        index={currentIndex}
        total={questions.length}
        selected={selected}
        submitted={state.mode === 'study' && submitted}
        isBookmarked={progress.bookmarks.includes(currentQuestion.id)}
        onToggleChoice={handleToggleChoice}
        onToggleBookmark={() => toggleBookmark(currentQuestion.id)}
      />

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className="rounded-md bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {state.mode === 'study' && !submitted ? '解答する' : isLast ? '結果を見る' : '次の問題へ'}
        </button>
      </div>
    </div>
  )
}
