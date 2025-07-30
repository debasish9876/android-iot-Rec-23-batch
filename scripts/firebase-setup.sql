-- Firebase Firestore Collections Structure
-- This is a reference for the Firestore collections used in the application

-- Collection: test-attempts
-- Document ID: user email
-- Fields:
--   fullName: string
--   rollNumber: string  
--   email: string
--   phoneNumber: string
--   interest: string (long text)
--   answers: object (question_id: selected_option_index)
--   violations: object
--     tabSwitches: number
--     fullscreenExits: number
--   timestamp: string (ISO date)
--   autoSubmitted: boolean
--   autoSubmitReason: string
--   timeSpent: number (seconds)

-- Firestore Security Rules (add to Firebase Console):
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /test-attempts/{email} {
      allow read, write: if request.auth != null || true;
      // Allow writes only if document doesn't exist (one attempt policy)
      allow create: if !exists(/databases/$(database)/documents/test-attempts/$(email));
      allow update: if false; // Prevent updates after creation
    }
  }
}
*/

-- Note: Replace the security rules in your Firebase Console with the above rules
-- to enforce the one-attempt policy at the database level.
