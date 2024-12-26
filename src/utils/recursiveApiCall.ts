const recursiveApiCall = async <T>(
    apiCall: () => Promise<T>,
    retries: number = 3,
    delay: number = 1000,
    errorStack: Error[] = []
  ): Promise<T> => {
    try {
      return await apiCall();
    } catch (error) {
      if (retries > 0) {
        errorStack.push(error as Error);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return recursiveApiCall(apiCall, retries - 1, delay, errorStack);
      } else {
        const errorMessages = errorStack
          .map((e) => e.message || String(e))
          .join("; ");
        throw new Error(
          `API call failed after ${retries + 1} attempts: ${errorMessages}`
        );
      }
    }
  };
  
  export { recursiveApiCall };