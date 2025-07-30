"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"
import LoadingSpinner from "./loading-spinner"

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
}

interface QuestionDisplayProps {
  questions: Question[]
  currentQuestion: number
  answers: { [key: number]: number }
  onAnswerSelect: (questionId: number, answerIndex: number) => void
  onNext: () => void
  onPrevious: () => void
  onSubmit: () => void
  isSubmitting: boolean
}

export default function QuestionDisplay({
  questions,
  currentQuestion,
  answers,
  onAnswerSelect,
  onNext,
  onPrevious,
  onSubmit,
  isSubmitting,
}: QuestionDisplayProps) {
  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const isLastQuestion = currentQuestion === questions.length - 1
  const isFirstQuestion = currentQuestion === 0

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="Android and IoT Club" className="w-12 h-12" />
            <div>
              <CardTitle className="text-xl">Android and IoT Club - Round 1</CardTitle>
              <p className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
          </div>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold leading-relaxed">
            {currentQuestion + 1}. {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, optionIndex) => (
              <label
                key={optionIndex}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-gray-50 ${
                  answers[question.id] === optionIndex ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={optionIndex}
                  checked={answers[question.id] === optionIndex}
                  onChange={() => onAnswerSelect(question.id, optionIndex)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-lg">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <Button
            onClick={onPrevious}
            disabled={isFirstQuestion}
            variant="outline"
            className="flex items-center space-x-2 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <div className="text-sm text-gray-500">
            {Object.keys(answers).length} of {questions.length} answered
          </div>

          {isLastQuestion ? (
            <Button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner className="w-4 h-4" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit Test</span>
              )}
            </Button>
          ) : (
            <Button onClick={onNext} className="flex items-center space-x-2">
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
