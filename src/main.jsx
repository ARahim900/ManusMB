import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from "@clerk/clerk-react"
import App from './App.jsx'
import './App.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_placeholder_key_replace_with_your_actual_key'
const IS_DEVELOPMENT_MODE = PUBLISHABLE_KEY === 'pk_test_placeholder_key_replace_with_your_actual_key'

// Only throw error if completely missing
if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY === 'undefined') {
  throw new Error("Missing Clerk Publishable Key - Please check your .env file")
}

// Development mode: Render app directly without Clerk
if (IS_DEVELOPMENT_MODE) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  // Production mode: Use Clerk authentication
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY} 
        afterSignOutUrl="/"
      >
        <App />
      </ClerkProvider>
    </React.StrictMode>,
  )
} 