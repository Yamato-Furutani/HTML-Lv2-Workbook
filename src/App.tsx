import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { QuizSetupPage } from './pages/QuizSetupPage'
import { QuizPage } from './pages/QuizPage'
import { ResultPage } from './pages/ResultPage'
import { ReviewPage } from './pages/ReviewPage'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/setup/:categoryId" element={<QuizSetupPage />} />
        <Route path="/quiz/run" element={<QuizPage />} />
        <Route path="/quiz/result" element={<ResultPage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </div>
  )
}

export default App
