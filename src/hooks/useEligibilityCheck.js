import { useState, useCallback } from 'react';
import { checkEligibility, checkEligibilitySSE } from '../api/eligibilityApi';

const useEligibilityCheck = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ step: 0, message: '', percentage: 0 });
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
    setProgress({ step: 0, message: 'Initializing...', percentage: 0 });
    setResult(null);
    setError(null);
    
    checkEligibilitySSE(userData, {
      onConnected: (data) => {
        console.log('SSE connection established', data);
      },
      onProgress: (progressData) => {
        // Format from backend: { step: number, message: string, percentage: number, status: string }
        setProgress({
          step: progressData.step || 0,
          message: progressData.message || '',
          percentage: progressData.percentage !== undefined ? progressData.percentage : progress.percentage,
          status: progressData.status || 'in_progress'
        });
      },
      onComplete: (resultData) => {
        setResult(resultData);
        setLoading(false);
        setProgress(prev => ({ ...prev, percentage: 100, status: 'completed' }));
      },
      onError: (errorData) => {
        setError(errorData);
        setLoading(false);
      }
    }).then(es => {
      if (es) setEventSource(es);
    });
  }, [progress.percentage]);

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