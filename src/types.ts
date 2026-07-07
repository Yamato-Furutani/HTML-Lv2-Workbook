export type CategoryId =
  | 'javascript'
  | 'web-api'
  | 'graphics-animation'
  | 'multimedia'
  | 'storage'
  | 'communication'
  | 'device-access'
  | 'performance-offline'
  | 'security'
  | 'comprehensive'

export type QuestionType = 'single' | 'multiple'
export type Difficulty = 'basic' | 'intermediate' | 'advanced'

export interface Question {
  id: string
  category: CategoryId
  type: QuestionType
  difficulty: Difficulty
  question: string
  code?: string
  choices: string[]
  correctAnswers: number[]
  explanation: string
  reference: string
}

export interface Category {
  id: CategoryId
  order: number
  name: string
  shortName: string
  description: string
  color: string
}

export interface AttemptRecord {
  correct: number
  incorrect: number
  lastResult: boolean
  lastAt: string
}

export type QuizMode = 'study' | 'exam'

export interface HistoryEntry {
  at: string
  categoryId: CategoryId | 'all'
  mode: QuizMode
  score: number
  total: number
}

export interface ProgressState {
  attempts: Record<string, AttemptRecord>
  bookmarks: string[]
  history: HistoryEntry[]
}
