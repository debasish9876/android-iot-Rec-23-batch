interface LoadingOverlayProps {
  isVisible: boolean
  message: string
}

export default function LoadingOverlay({ isVisible, message }: LoadingOverlayProps) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4 max-w-sm mx-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-gray-800">{message}</p>
        <p className="text-sm text-gray-600 text-center">Please wait while we prepare your test environment...</p>
      </div>
    </div>
  )
}
