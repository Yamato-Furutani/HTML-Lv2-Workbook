import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { ExamLevel } from '../types'

const STORAGE_KEY = 'html5exam-level'

function loadLevel(): ExamLevel {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw === 'L1' ? 'L1' : 'L2'
}

interface LevelContextValue {
  level: ExamLevel
  setLevel: (level: ExamLevel) => void
}

const LevelContext = createContext<LevelContextValue | null>(null)

export function LevelProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState<ExamLevel>(loadLevel)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, level)
  }, [level])

  return <LevelContext.Provider value={{ level, setLevel }}>{children}</LevelContext.Provider>
}

export function useLevelContext(): LevelContextValue {
  const ctx = useContext(LevelContext)
  if (!ctx) throw new Error('useLevelContext must be used within LevelProvider')
  return ctx
}
