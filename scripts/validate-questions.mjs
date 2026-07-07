import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const questionsDir = join(__dirname, '..', 'src', 'data', 'questions')

const files = readdirSync(questionsDir).filter((f) => f.endsWith('.json'))

let hasError = false
const allIds = new Set()
let totalCount = 0

for (const file of files) {
  const categoryId = file.replace(/\.json$/, '')
  const path = join(questionsDir, file)
  let data
  try {
    data = JSON.parse(readFileSync(path, 'utf8'))
  } catch (e) {
    console.error(`[NG] ${file}: JSON parse error - ${e.message}`)
    hasError = true
    continue
  }

  if (!Array.isArray(data)) {
    console.error(`[NG] ${file}: not an array`)
    hasError = true
    continue
  }

  if (data.length < 50) {
    console.error(`[NG] ${file}: only ${data.length} questions (need >= 50)`)
    hasError = true
  }

  const localIds = new Set()
  data.forEach((q, i) => {
    const label = `${file}[${i}] (${q.id ?? 'no-id'})`
    if (!q.id) {
      console.error(`[NG] ${label}: missing id`)
      hasError = true
      return
    }
    if (localIds.has(q.id)) {
      console.error(`[NG] ${label}: duplicate id within file`)
      hasError = true
    }
    localIds.add(q.id)
    if (allIds.has(q.id)) {
      console.error(`[NG] ${label}: duplicate id across files`)
      hasError = true
    }
    allIds.add(q.id)

    if (q.category !== categoryId) {
      console.error(`[NG] ${label}: category mismatch (${q.category} !== ${categoryId})`)
      hasError = true
    }
    if (!['single', 'multiple'].includes(q.type)) {
      console.error(`[NG] ${label}: invalid type ${q.type}`)
      hasError = true
    }
    if (!['basic', 'intermediate', 'advanced'].includes(q.difficulty)) {
      console.error(`[NG] ${label}: invalid difficulty ${q.difficulty}`)
      hasError = true
    }
    if (!Array.isArray(q.choices) || q.choices.length < 2) {
      console.error(`[NG] ${label}: bad choices`)
      hasError = true
      return
    }
    if (!Array.isArray(q.correctAnswers) || q.correctAnswers.length < 1) {
      console.error(`[NG] ${label}: bad correctAnswers`)
      hasError = true
      return
    }
    q.correctAnswers.forEach((idx) => {
      if (typeof idx !== 'number' || idx < 0 || idx >= q.choices.length) {
        console.error(`[NG] ${label}: correctAnswers index out of range (${idx})`)
        hasError = true
      }
    })
    if (q.type === 'single' && q.correctAnswers.length !== 1) {
      console.error(`[NG] ${label}: single type must have exactly 1 correct answer`)
      hasError = true
    }
    if (q.type === 'multiple' && q.correctAnswers.length < 2) {
      console.error(`[NG] ${label}: multiple type must have >= 2 correct answers`)
      hasError = true
    }
    if (!q.question || !q.explanation || !q.reference) {
      console.error(`[NG] ${label}: missing question/explanation/reference`)
      hasError = true
    }
  })

  totalCount += data.length
  console.log(`[OK] ${file}: ${data.length} questions`)
}

console.log(`\nTotal questions: ${totalCount}`)
if (hasError) {
  console.error('\nValidation FAILED')
  process.exit(1)
} else {
  console.log('\nValidation PASSED')
}
