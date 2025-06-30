import { useUser } from "@clerk/clerk-react";
import { useDomainValidation } from "../hooks/useDomainValidation";
import LoadingSpinner from "./ui/LoadingSpinner";

export default function ProtectedRoute({ children }) {
  const { isLoaded } = useUser();
  const { isValidDomain } = useDomainValidation();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isValidDomain) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center bg-white rounded-lg shadow-lg p-8 max-w-md mx-4">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Only @muscatbay.com email addresses are allowed.</p>
          <p className="text-sm text-gray-500">Please contact your administrator if you believe this is an error.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 