import { useState, useCallback } from 'react';
import { checkEligibility, checkEligibilitySSE } from '../api/eligibilityApi';

const useEligibilityCheck = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [eventSource, setEventSource] = useState(null);

  // Cancel any ongoing request
  const cancelRequest = useCallback(() => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
    }
    setLoading(false);
  }, [eventSource]);

  // Check eligibility using SSE
  const checkUserEligibilitySSE = useCallback((userData) => {
    setLoading(true);
    setProgress(0);
    setResult(null);
    setError(null);
    
    const sse = checkEligibilitySSE(userData, {
      onProgress: (progressData) => {
        setProgress(progressData.percentComplete || 0);
      },
      onComplete: (resultData) => {
        setResult(resultData);
        setLoading(false);
        setProgress(100);
      },
      onError: (errorData) => {
        setError(errorData);
        setLoading(false);
      }
    });
    
    setEventSource(sse);
  }, []);

  // Fallback to regular HTTP request
  const checkUserEligibility = useCallback(async (userData) => {
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const data = await checkEligibility(userData);
      setResult(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    progress,
    result,
    error,
    checkUserEligibilitySSE,
    checkUserEligibility,
    cancelRequest
  };
};

export default useEligibilityCheck;