import type { CategoryId, Question } from '../types'
import javascriptQuestions from './questions/javascript.json'
import webApiQuestions from './questions/web-api.json'
import graphicsAnimationQuestions from './questions/graphics-animation.json'
import multimediaQuestions from './questions/multimedia.json'
import storageQuestions from './questions/storage.json'
import communicationQuestions from './questions/communication.json'
import deviceAccessQuestions from './questions/device-access.json'
import performanceOfflineQuestions from './questions/performance-offline.json'
import securityQuestions from './questions/security.json'
import comprehensiveQuestions from './questions/comprehensive.json'
import l1WebFundamentalsQuestions from './questions/l1/web-fundamentals.json'
import l1CssQuestions from './questions/l1/css.json'
import l1ElementsQuestions from './questions/l1/elements.json'
import l1ResponsiveQuestions from './questions/l1/responsive.json'
import l1ApiFundamentalsQuestions from './questions/l1/api-fundamentals.json'

export const questionsByCategory: Record<CategoryId, Question[]> = {
  javascript: javascriptQuestions as Question[],
  'web-api': webApiQuestions as Question[],
  'graphics-animation': graphicsAnimationQuestions as Question[],
  multimedia: multimediaQuestions as Question[],
  storage: storageQuestions as Question[],
  communication: communicationQuestions as Question[],
  'device-access': deviceAccessQuestions as Question[],
  'performance-offline': performanceOfflineQuestions as Question[],
  security: securityQuestions as Question[],
  comprehensive: comprehensiveQuestions as Question[],
  'l1-web-fundamentals': l1WebFundamentalsQuestions as Question[],
  'l1-css': l1CssQuestions as Question[],
  'l1-elements': l1ElementsQuestions as Question[],
  'l1-responsive': l1ResponsiveQuestions as Question[],
  'l1-api-fundamentals': l1ApiFundamentalsQuestions as Question[],
}

export const allQuestions: Question[] = Object.values(questionsByCategory).flat()

export function getQuestionsByCategory(categoryId: CategoryId): Question[] {
  return questionsByCategory[categoryId] ?? []
}

export function getQuestionById(id: string): Question | undefined {
  return allQuestions.find((q) => q.id === id)
}
