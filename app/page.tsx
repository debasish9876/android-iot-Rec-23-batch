"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Camera, Clock, Shield } from "lucide-react"
import { initializeApp } from "firebase/app"
import { getDatabase, ref, get, set } from "firebase/database"
import QuestionDisplay from "@/components/question-display"
import LoadingOverlay from "@/components/loading-overlay"
import ViolationAlert from "@/components/violation-alert"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr9iqUgluYgEDzyfMDWiCIrM5yE00WP0s",
  authDomain: "recruit-d4aae.firebaseapp.com",
  projectId: "recruit-d4aae",
  storageBucket: "recruit-d4aae.firebasestorage.app",
  messagingSenderId: "889361393472",
  appId: "1:889361393472:web:878ee5ee2e249056617ca5",
  measurementId: "G-MEKF5W14RG",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

// Sample MCQ questions
const questions = [
  {
    id: 1,
    question: "Which communication protocol is best suited for transmitting real-time IoT data at high frequencies?",
    options: ["SMTP", "MQTT", "FTP", "HTTP"],
    correct: 1,
  },
  {
    id: 2,
    question: "In an IoT setup, what is the primary function of an Arduino board?",
    options: ["Controlling sensors and actuators", "Providing power", "Storing data", "Displaying web pages"],
    correct: 0,
  },
  {
    id: 3,
    question: "On a NodeMCU board, which pin is designated for analog input?",
    options: ["GND", "D8", "D0", "A0"],
    correct: 3,
  },
  {
    id: 4,
    question:
      "Which wireless technology used in IoT operates in the 2.4 GHz frequency band and supports mesh networking?",
    options: ["Zigbee", "LoRa", "Wi-Fi", "Bluetooth"],
    correct: 0,
  },
  {
    id: 5,
    question: "Which of the following is a cloud platform for IoT?",
    options: ["Visual Studio", "MySQL", "GitHub", "Firebase"],
    correct: 3,
  },
  {
    id: 6,
    question: "What low-power communication protocol is designed for long-range IoT communication across wide areas?",
    options: ["LoRa", "Bluetooth", "Zigbee", "NFC"],
    correct: 0,
  },
  {
    id: 7,
    question: "What class in Android is used to perform operations in the background using threading?",
    options: ["ThreadPoolExecutor", "AsyncTask", "Handler", "Runnable"],
    correct: 1,
  },
  {
    id: 8,
    question: "Which type of sensor is used to measure ambient light levels in IoT applications?",
    options: ["MQ2", "LDR", "DHT11", "PIR Sensor"],
    correct: 1,
  },
  {
    id: 9,
    question: "Which communication protocol is most commonly used in IoT devices?",
    options: ["HTTP", "FTP", "SMTP", "MQTT"],
    correct: 3,
  },
  {
    id: 10,
    question: "What type of sensor is used to measure temperature and humidity?",
    options: ["PIR Sensor", "DHT11", "IR Sensor", "Ultrasonic Sensor"],
    correct: 1,
  },
  {
    id: 11,
    question: "What does the term 'NodeMCU' refer to in IoT?",
    options: ["A sensor", "A battery module", "A software tool", "A microcontroller board with Wi-Fi"],
    correct: 3,
  },
  {
    id: 12,
    question: "What is the function of a relay in an IoT circuit?",
    options: ["To measure current", "To transmit data", "To amplify signals", "To act as a switch"],
    correct: 3,
  },
  {
    id: 13,
    question: "What is the key difference between Service and IntentService in Android?",
    options: [
      "Service is used for activities, IntentService is not",
      "IntentService runs on the main thread",
      "Service uses threads, IntentService does not",
      "IntentService runs in a separate background thread and stops itself",
    ],
    correct: 3,
  },
  {
    id: 14,
    question: "What is the main file where your Android app's UI is defined?",
    options: ["activity_main.xml", "MainActivity.java", "AndroidManifest.xml", "styles.xml"],
    correct: 0,
  },
  {
    id: 15,
    question: "What XML tag should be used to add a progress bar in an Android application?",
    options: ["<ProgressBar>", "<TextView>", "<EditText>", "<ImageView>"],
    correct: 0,
  },
  {
    id: 16,
    question: "What is the method called to initiate a new Activity in an Android application?",
    options: ["beginActivity()", "launchActivity()", "startActivity()", "openActivity()"],
    correct: 2,
  },
  {
    id: 17,
    question: "Which Android component is responsible for background operations without a user interface?",
    options: ["Service", "BroadcastReceiver", "ContentProvider", "Activity"],
    correct: 0,
  },
  {
    id: 18,
    question: "Which layout arranges elements in a single vertical or horizontal row?",
    options: ["ConstraintLayout", "RelativeLayout", "LinearLayout", "FrameLayout"],
    correct: 2,
  },
  {
    id: 19,
    question: "Which file in an Android project outlines all the dependencies required by the application?",
    options: ["layout.xml", "AndroidManifest.xml", "build.gradle", "strings.xml"],
    correct: 2,
  },
  {
    id: 20,
    question: "Which component is used to display a list of scrollable items in Android?",
    options: ["WebView", "ListView", "ImageView", "TextView"],
    correct: 1,
  },
  {
    id: 21,
    question: "Which Android component is primarily responsible for managing the user interface?",
    options: ["BroadcastReceiver", "ContentProvider", "Service", "Activity"],
    correct: 3,
  },
  {
    id: 22,
    question: "In Android XML layout files, which tag is used to create a button?",
    options: ["<EditText>", "<View>", "<Button>", "<TextView>"],
    correct: 2,
  },
  {
    id: 23,
    question: "Which of the following is NOT recognized as a layout type in Android?",
    options: ["CenterLayout", "LinearLayout", "RelativeLayout", "GridLayout"],
    correct: 0,
  },
  {
    id: 24,
    question: "What does the AndroidManifest.xml file contain?",
    options: ["App permissions and components", "Gradle scripts", "Java classes", "UI designs"],
    correct: 0,
  },
  {
    id: 25,
    question: "What is the use of an Intent in Android?",
    options: ["Navigating between activities", "Defining layouts", "Declaring styles", "Displaying images"],
    correct: 0,
  },
]

export default function TestPortal() {
  const [currentStep, setCurrentStep] = useState<"welcome" | "test" | "completed">("welcome")
  const [formData, setFormData] = useState({
    fullName: "",
    rollNumber: "",
    email: "",
    phoneNumber: "",
    interest: "",
  })
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [timeLeft, setTimeLeft] = useState(45 * 60) // 45 minutes in seconds
  const [violations, setViolations] = useState({
    tabSwitches: 0,
    fullscreenExits: 0,
  })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showTabSwitchAlert, setShowTabSwitchAlert] = useState(false)
  const [isLoadingTest, setIsLoadingTest] = useState(false)
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [violationAlert, setViolationAlert] = useState<{
    show: boolean
    type: string
    count: number
  }>({ show: false, type: "", count: 0 })

  // Email validation regex
  const emailRegex = /^[0-9]{2}[a-z]{3,}[0-9]{3}\.[a-z]+@giet\.edu$/


  // Validate form
  const validateForm = () => {
    const newErrors: string[] = []

    if (!formData.fullName.trim()) newErrors.push("Full name is required")
    if (!formData.rollNumber.trim()) newErrors.push("Roll number is required")
    if (!formData.email.trim()) newErrors.push("Email is required")
    else if (!emailRegex.test(formData.email)) {
      newErrors.push("Email must be in format: 23XXX123.name@giet.edu")
    }
    if (!formData.phoneNumber.trim()) newErrors.push("Phone number is required")
    if (!formData.interest.trim()) newErrors.push("Interest field is required")

    setErrors(newErrors)
    return newErrors.length === 0
  }

  // Check if email already exists
  const checkEmailExists = async (email: string) => {
    try {
      const userRef = ref(database, `test-attempts/${email.replace(/\./g, "_")}`)
      const snapshot = await get(userRef)
      return snapshot.exists()
    } catch (error) {
      console.error("Error checking email:", error)
      return false
    }
  }

  // Start test
  const startTest = async () => {
    if (!validateForm()) return

    setIsCheckingEmail(true)

    // Check if email already attempted
    const emailExists = await checkEmailExists(formData.email)
    if (emailExists) {
      setErrors(["You've already attempted this test. Only one attempt is allowed."])
      setIsCheckingEmail(false)
      return
    }

    setIsLoadingTest(true)

    // Request fullscreen
    try {
      await document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } catch (error) {
      console.error("Fullscreen request failed:", error)
    }

    // Request webcam access
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      setWebcamStream(stream)
    } catch (error) {
      console.error("Webcam access failed:", error)
    }

    // Simulate loading time
    setTimeout(() => {
      setIsLoadingTest(false)
      setCurrentStep("test")
    }, 1500)
  }

  // Handle fullscreen change
  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = !!document.fullscreenElement
    setIsFullscreen(isCurrentlyFullscreen)

    if (!isCurrentlyFullscreen && currentStep === "test") {
      setViolations((prev) => {
        const newViolations = { ...prev, fullscreenExits: prev.fullscreenExits + 1 }

        setViolationAlert({
          show: true,
          type: "Fullscreen Exit",
          count: newViolations.fullscreenExits,
        })

        if (newViolations.fullscreenExits >= 3) {
          submitTest(true, "Fullscreen violation")
        }
        return newViolations
      })
    }
  }

  // Handle tab switching
  const handleBlur = () => {
    if (currentStep === "test") {
      setViolations((prev) => {
        const newViolations = { ...prev, tabSwitches: prev.tabSwitches + 1 }

        setViolationAlert({
          show: true,
          type: "Tab Switching",
          count: newViolations.tabSwitches,
        })

        if (newViolations.tabSwitches >= 3) {
          submitTest(true, "Tab switching violation")
        }
        return newViolations
      })
    }
  }

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [currentStep])

  useEffect(() => {
    window.addEventListener("blur", handleBlur)
    return () => window.removeEventListener("blur", handleBlur)
  }, [currentStep])

  // Timer countdown
  useEffect(() => {
    if (currentStep === "test" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && currentStep === "test") {
      submitTest(true, "Time expired")
    }
  }, [currentStep, timeLeft])

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Submit test
  const submitTest = async (autoSubmit = false, reason = "") => {
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      // Calculate score
      let finalScore = 0
      questions.forEach((question) => {
        if (answers[question.id] === question.correct) {
          finalScore += 1
        }
      })

      // Store test data in Firebase Realtime Database
      const userRef = ref(database, `test-attempts/${formData.email.replace(/\./g, "_")}`)
      await set(userRef, {
        ...formData,
        answers,
        score: finalScore,
        totalQuestions: questions.length,
        percentage: Math.round((finalScore / questions.length) * 100),
        violations,
        timestamp: new Date().toISOString(),
        autoSubmitted: autoSubmit,
        autoSubmitReason: reason,
        timeSpent: 45 * 60 - timeLeft,
      })

      setScore(finalScore)

      // Stop webcam
      if (webcamStream) {
        webcamStream.getTracks().forEach((track) => track.stop())
      }

      // Exit fullscreen
      if (document.fullscreenElement) {
        document.exitFullscreen()
      }

      setCurrentStep("completed")
    } catch (error) {
      console.error("Error submitting test:", error)
      setErrors(["Failed to submit test. Please try again."])
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const selectAnswer = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }))
  }

  if (currentStep === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img src="/logo.png" alt="Android and IoT Club" className="w-24 h-24" />
            </div>
            <CardTitle className="text-3xl font-bold text-indigo-700">
              Welcome to Android and IoT Club Round 1
            </CardTitle>
            <CardDescription className="text-lg">Please fill in your details to start the test</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {errors.length > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <ul className="list-disc list-inside">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, rollNumber: e.target.value }))}
                  placeholder="Enter your roll number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">GIET Email ID</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="23XXX123.name@giet.edu"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interest">Why are you interested in joining the Android and IoT Club?</Label>
              <Textarea
                id="interest"
                value={formData.interest}
                onChange={(e) => setFormData((prev) => ({ ...prev, interest: e.target.value }))}
                placeholder="Share your interest and motivation..."
                rows={4}
              />
            </div>

            <Button
              onClick={startTest}
              className="w-full text-lg py-6"
              disabled={isSubmitting || isCheckingEmail || isLoadingTest}
            >
              {isCheckingEmail ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Checking eligibility...</span>
                </div>
              ) : isLoadingTest ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Preparing test...</span>
                </div>
              ) : isSubmitting ? (
                "Starting Test..."
              ) : (
                "Submit & Start Test"
              )}
            </Button>
          </CardContent>
        </Card>
        <LoadingOverlay isVisible={isLoadingTest} message="Preparing Test Environment" />
      </div>
    )
  }
  if (currentStep === "test") {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        {/* Header with timer and warnings */}
        <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-red-500" />
                <span className="text-xl font-bold text-red-500">{formatTime(timeLeft)}</span>
              </div>
              {!isFullscreen && (
                <Alert variant="destructive" className="py-2">
                  <Shield className="h-4 w-4" />
                  <AlertDescription>Please return to fullscreen mode</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm">Tab Switches: {violations.tabSwitches}/3</div>
              <div className="text-sm">Fullscreen Exits: {violations.fullscreenExits}/3</div>
              {webcamStream && (
                <div className="flex items-center space-x-2">
                  <Camera className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">Monitoring</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Violation Alert */}
        <ViolationAlert
          isVisible={violationAlert.show}
          violationType={violationAlert.type}
          violationCount={violationAlert.count}
          onClose={() => setViolationAlert({ show: false, type: "", count: 0 })}
        />

        {/* Webcam feed */}
        {webcamStream && (
          <div className="fixed bottom-4 right-4 z-50">
            <video
              ref={(video) => {
                if (video && webcamStream && !video.srcObject) {
                  video.srcObject = webcamStream
                  video.play().catch((error) => {
                    console.log("Video play interrupted:", error)
                  })
                }
              }}
              className="w-32 h-24 rounded-lg border-2 border-gray-300"
              muted
              autoPlay
              playsInline
            />
          </div>
        )}

        {/* Question Display */}
        <div className="pt-24 pb-8">
          <QuestionDisplay
            questions={questions}
            currentQuestion={currentQuestion}
            answers={answers}
            onAnswerSelect={selectAnswer}
            onNext={nextQuestion}
            onPrevious={previousQuestion}
            onSubmit={() => submitTest(false)}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    )
  }

  if (currentStep === "completed") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <img src="/logo.png" alt="Android and IoT Club" className="w-16 h-16" />
            </div>
            <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <CardTitle className="text-3xl font-bold text-green-700">Thank you for taking the test!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Your Score</h3>
              <div className="text-3xl font-bold text-blue-600">
                {score}/{questions.length}
              </div>
              <div className="text-lg text-blue-700">{Math.round((score / questions.length) * 100)}%</div>
            </div>
            <p className="text-lg text-gray-600">Shortlisted students will be called for the interview on Saturday.</p>
            <p className="text-lg text-gray-600">Stay tuned for updates via your email.</p>
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                Your responses have been recorded successfully. The Android and IoT Club team will review all
                submissions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
