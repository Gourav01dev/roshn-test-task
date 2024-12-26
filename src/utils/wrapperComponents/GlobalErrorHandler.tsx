import  { useEffect } from 'react';

const GlobalErrorHandler = () => {
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      console.error('Global Error caught: ', event.message);
      // You can send this error to an external logging service or take other actions
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled Promise Rejection: ', event.reason);
      // Handle rejection error (e.g., log or display alert)
    };

    // Add global error listeners
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default GlobalErrorHandler;
