import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

export const useDomainValidation = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      const email = user.primaryEmailAddress?.emailAddress;
      
      if (email && !email.endsWith('@muscatbay.com')) {
        // Force sign out
        window.location.href = '/sign-out';
        alert('Access denied. Only @muscatbay.com email addresses are allowed.');
      }
    }
  }, [isLoaded, user]);

  return {
    isValidDomain: user?.primaryEmailAddress?.emailAddress?.endsWith('@muscatbay.com') ?? false,
    userEmail: user?.primaryEmailAddress?.emailAddress
  };
}; 