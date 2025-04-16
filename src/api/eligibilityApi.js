import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Updated function to check eligibility using Server-Sent Events (SSE)
export const checkEligibilitySSE = async (userData, callbacks) => {
  try {
    // Make a POST request to start the process and get a request_id
    const response = await axios.post(`${BASE_URL}/`, userData);
    const { request_id } = response.data;

    if (!request_id) {
      throw new Error('No request ID received from server');
    }

    // Create EventSource with the request_id parameter
    const eventSource = new EventSource(`${BASE_URL}/events?request_id=${request_id}`);

    // Handle connection established
    eventSource.addEventListener('connected', (event) => {
      const data = JSON.parse(event.data);
      callbacks.onConnected?.(data);
    });

    // Handle progress events
    eventSource.addEventListener('progress', (event) => {
      const data = JSON.parse(event.data);

      // If progress contains an error status, handle it as an error
      if (data.status === 'error') {
        callbacks.onError?.({
          error: data.message || 'Process error',
          status_code: data.status_code || 500,
          details: data.details || { source: 'progress', step: data.step },
        });
        eventSource.close();
        return;
      }

      callbacks.onProgress?.(data);
    });

    // Handle result events
    eventSource.addEventListener('result', (event) => {
      const data = JSON.parse(event.data);
      callbacks.onComplete?.(data);
      eventSource.close();
    });

    // Handle error events
    eventSource.addEventListener('error', (event) => {
      if (event.data) {
        try {
          const data = JSON.parse(event.data);
          callbacks.onError?.(data);
        } catch (e) {
          callbacks.onError?.({
            error: 'Error event received',
            status_code: 500,
            details: { source: 'sse_error_event' },
          });
        }
      } else {
        callbacks.onError?.({
          error: 'Erro de conexão com o servidor SSE',
          status_code: 503,
          details: { source: 'connection' },
        });
      }
      eventSource.close();
    });

    return eventSource;
  } catch (error) {
    // Handle network or request error
    callbacks.onError?.(
      error.response?.data || {
        error: 'Erro de conexão com o servidor',
        status_code: error.response?.status || 500,
        details: { source: 'network' },
      }
    );
    return null;
  }
};

