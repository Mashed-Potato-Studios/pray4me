// Required imports for React Native alerts and React hooks
import { Alert } from "react-native";
import { useEffect, useState, useCallback } from "react";

// Interface defining the options for the useAppwrite hook
// T: The type of data returned by the API call
// P: An object type containing string or number parameters
interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
  fn: (params: P) => Promise<T>;    // The async function to execute
  params?: P;                       // Optional parameters for the function
  skip?: boolean;                   // Flag to skip initial automatic execution
}

// Interface defining the return type of the useAppwrite hook
interface UseAppwriteReturn<T, P> {
  data: T | null;                   // The data returned from the API call
  loading: boolean;                 // Loading state indicator
  error: string | null;             // Error message if any
  refetch: (newParams: P) => Promise<void>;  // Function to manually trigger a new API call
}

// Custom hook for handling Appwrite API calls with built-in loading, error, and data states
export const useAppwrite = <T, P extends Record<string, string | number>>({
  fn,
  params = {} as P,
  skip = false,
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
  // State management for data, loading status, and errors
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

  // Memoized function to fetch data from the API
  const fetchData = useCallback(
    async (fetchParams: P) => {
      setLoading(true);
      setError(null);

      try {
        // Execute the provided function with parameters
        const result = await fn(fetchParams);
        setData(result);
      } catch (err: unknown) {
        // Error handling with user-friendly message
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  // Effect to automatically fetch data on mount (unless skip is true)
  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
  }, []);

  // Function to manually trigger a new API call with new parameters
  const refetch = async (newParams: P) => await fetchData(newParams);

  // Return the hook's state and refetch function
  return { data, loading, error, refetch };
};