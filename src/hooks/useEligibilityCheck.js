import { useState, useCallback } from "react";
import { checkEligibilitySSE } from "../api/eligibilityApi";

const useEligibilityCheck = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({
    step: 0,
    message: "",
    percentage: 0,
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [eventSource, setEventSource] = useState(null);

  const resetState = () => {
    setResult(null);
    setError(null);
    setLoading(false);
    setProgress({ step: 0, message: "", percentage: 0, status: "in_progress" });
  };

  // Cancel any ongoing request
  const cancelRequest = useCallback(() => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
    }
    setLoading(false);
  }, [eventSource]);

  // Check eligibility using SSE
  const checkUserEligibilitySSE = useCallback(
    (userData) => {
      setLoading(true);
      setProgress({ step: 0, message: "Iniciando...", percentage: 0 });
      setResult(null);
      setError(null);

      checkEligibilitySSE(userData, {
        onConnected: (data) => {
          console.log("SSE connection established", data);
        },
        onProgress: (progressData) => {
          // Format from backend: { step: number, message: string, percentage: number, status: string }
          setProgress({
            step: progressData.step || 0,
            message: progressData.message || "",
            percentage:
              progressData.percentage !== undefined
                ? progressData.percentage
                : progress.percentage,
            status: progressData.status || "in_progress",
          });
        },
        onComplete: (resultData) => {
          setResult(resultData);
          setLoading(false);
          setProgress((prev) => ({
            ...prev,
            percentage: 100,
            status: "completed",
          }));
        },
        onError: (errorData) => {
          // Store full error data including status code and details
          console.error("Eligibility check error:", errorData);
          setError(errorData);

          // Update progress to show error state if it came from a progress event
          if (
            errorData.details?.source === "progress" ||
            errorData.details?.step
          ) {
            setProgress((prev) => ({
              ...prev,
              message: errorData.error || "Ocorreu um erro durante o processo.",
              status: "error",
            }));
          }

          setLoading(false);
        },
      }).then((es) => {
        if (es) setEventSource(es);
      });
    },
    [progress.percentage]
  );

  return {
    loading,
    progress,
    result,
    error,
    checkUserEligibilitySSE,
    cancelRequest,
    resetState,
  };
};

export default useEligibilityCheck;
