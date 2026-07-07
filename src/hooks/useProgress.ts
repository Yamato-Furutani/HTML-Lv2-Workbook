import { useCallback, useEffect, useState } from 'react'
import type { HistoryEntry, ProgressState, QuizMode } from '../types'

const STORAGE_KEY = 'html5l2-progress'

const initialState: ProgressState = {
  attempts: {},
  bookmarks: [],
  history: [],
}

function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const parsed = JSON.parse(raw) as ProgressState
    return {
      attempts: parsed.attempts ?? {},
      bookmarks: parsed.bookmarks ?? [],
      history: parsed.history ?? [],
    }
  } catch {
    return initialState
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(loadProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const recordAnswer = useCallback((questionId: string, correct: boolean) => {
    setProgress((prev) => {
      const existing = prev.attempts[questionId]
      const nextAttempt = {
        correct: (existing?.correct ?? 0) + (correct ? 1 : 0),
        incorrect: (existing?.incorrect ?? 0) + (correct ? 0 : 1),
        lastResult: correct,
        lastAt: new Date().toISOString(),
      }
      return {
        ...prev,
        attempts: { ...prev.attempts, [questionId]: nextAttempt },
      }
    })
  }, [])

  const addHistoryEntry = useCallback((entry: HistoryEntry) => {
    setProgress((prev) => ({
      ...prev,
      history: [...prev.history, entry],
    }))
  }, [])

  const toggleBookmark = useCallback((questionId: string) => {
    setProgress((prev) => {
      const isBookmarked = prev.bookmarks.includes(questionId)
      return {
        ...prev,
        bookmarks: isBookmarked
          ? prev.bookmarks.filter((id) => id !== questionId)
          : [...prev.bookmarks, questionId],
      }
    })
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(initialState)
  }, [])

  return { progress, recordAnswer, addHistoryEntry, toggleBookmark, resetProgress }
}

export function getCategoryStats(progress: ProgressState, questionIds: string[]) {
  let correct = 0
  let attempted = 0
  for (const id of questionIds) {
    const attempt = progress.attempts[id]
    if (attempt) {
      attempted += 1
      if (attempt.lastResult) correct += 1
    }
  }
  return { attempted, correct, total: questionIds.length }
}

export type { QuizMode }
