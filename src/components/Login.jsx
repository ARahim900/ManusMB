import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import Logo from "./ui/Logo";

export default function Login() {
  const { user, isLoaded } = useUser();
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);

  // Check domain restriction after user loads
  useEffect(() => {
    if (isLoaded && user) {
      const email = user.primaryEmailAddress?.emailAddress;
      if (email && !email.endsWith('@muscatbay.com')) {
        setIsCheckingDomain(true);
        // Sign out user if domain doesn't match
        setTimeout(() => {
          alert('Access restricted to @muscatbay.com email addresses only.');
          window.location.reload();
        }, 1000);
      }
    }
  }, [isLoaded, user]);

  if (isCheckingDomain) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5f5168] mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying domain access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <SignedOut>
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Logo className="h-16 w-auto" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Muscat Bay Management System
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              Asset & Operations Management Portal
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-8">
              <p className="text-xs text-yellow-800">
                🔒 Access restricted to @muscatbay.com emails only
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <SignIn 
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-[#5f5168] hover:bg-[#4a3f52] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200',
                    card: 'shadow-none border-0',
                    headerTitle: 'text-2xl font-bold text-gray-900 mb-2',
                    headerSubtitle: 'text-gray-600 mb-6',
                    socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50 transition-colors duration-200',
                    formFieldInput: 'border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#5f5168] focus:border-transparent',
                    footerActionLink: 'text-[#5f5168] hover:text-[#4a3f52]',
                    dividerLine: 'bg-gray-200',
                    dividerText: 'text-gray-500'
                  }
                }}
                routing="hash"
                afterSignInUrl="/"
              />
            </div>
            
            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Need access? Contact your system administrator
              </p>
            </div>
          </div>
        </SignedOut>
        
        <SignedIn>
          <div className="text-center bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <Logo className="h-12 w-auto" />
            </div>
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Access Granted
            </h2>
            <p className="text-gray-600 mb-6">
              Welcome to Muscat Bay Management System
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                Signed in as: <span className="font-medium text-gray-900">{user?.primaryEmailAddress?.emailAddress}</span>
              </p>
            </div>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: 'w-12 h-12',
                  userButtonPopoverCard: 'shadow-lg border border-gray-200',
                  userButtonPopoverActionButton: 'hover:bg-gray-50'
                }
              }}
              afterSignOutUrl="/"
            />
            <p className="text-xs text-gray-500 mt-4">
              Redirecting to dashboard...
            </p>
          </div>
        </SignedIn>
      </div>
    </div>
  );
} 