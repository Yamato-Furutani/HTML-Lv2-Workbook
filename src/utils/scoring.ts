export function arraysEqualAsSets(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false
  const setB = new Set(b)
  return a.every((item) => setB.has(item))
}

export function isCorrect(selected: number[], correctAnswers: number[]): boolean {
  return arraysEqualAsSets(selected, correctAnswers)
}
