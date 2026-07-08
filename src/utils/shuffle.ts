import type { Question } from '../types'

export function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function pickRandom<T>(items: T[], count: number): T[] {
  return shuffle(items).slice(0, Math.min(count, items.length))
}

export function shuffleChoices(question: Question): Question {
  const order = shuffle(question.choices.map((_, i) => i))
  const correctSet = new Set(question.correctAnswers)
  const choices = order.map((originalIndex) => question.choices[originalIndex])
  const correctAnswers = order.reduce<number[]>((acc, originalIndex, newIndex) => {
    if (correctSet.has(originalIndex)) acc.push(newIndex)
    return acc
  }, [])
  return { ...question, choices, correctAnswers }
}
