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
  | 'l1-web-fundamentals'
  | 'l1-css'
  | 'l1-elements'
  | 'l1-responsive'
  | 'l1-api-fundamentals'

export type ExamLevel = 'L1' | 'L2'

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
  level: ExamLevel
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
  categoryId: CategoryId | 'all' | 'all-l1' | 'all-l2'
  mode: QuizMode
  score: number
  total: number
}

export interface ProgressState {
  attempts: Record<string, AttemptRecord>
  bookmarks: string[]
  history: HistoryEntry[]
}
