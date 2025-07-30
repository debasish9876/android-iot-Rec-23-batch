"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ViolationAlertProps {
  isVisible: boolean
  violationType: string
  violationCount: number
  onClose: () => void
}

export default function ViolationAlert({ isVisible, violationType, violationCount, onClose }: ViolationAlertProps) {
  if (!isVisible) return null

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
      <Alert variant="destructive" className="bg-red-500 text-white border-red-600 min-w-96">
        <AlertTriangle className="h-5 w-5" />
        <AlertDescription className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-lg">⚠️ Security Violation Detected!</div>
            <div className="text-sm mt-1">
              {violationType} - Warning {violationCount}/3
            </div>
            {violationCount >= 2 && (
              <div className="text-sm mt-1 font-semibold">Next violation will auto-submit your test!</div>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-red-600 ml-4">
            <X className="h-4 w-4" />
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  )
}
