import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Updated function to check eligibility using Server-Sent Events (SSE)
export const checkEligibilitySSE = (userData, callbacks) => {
  // First make a POST request to start the process and get a request_id
  return axios.post(`${BASE_URL}/`, userData)
    .then(response => {
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
            details: data.details || { source: 'progress', step: data.step }
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
        // Try to parse error event data if available
        if (event.data) {
          try {
            const data = JSON.parse(event.data);
            callbacks.onError?.(data);
          } catch (e) {
            callbacks.onError?.({ 
              error: 'Error event received', 
              status_code: 500,
              details: { source: 'sse_error_event' }
            });
          }
        } else {
          // The general error handler for the EventSource
          callbacks.onError?.({ 
            error: 'SSE connection error', 
            status_code: 503,
            details: { source: 'connection' }
          });
        }
        eventSource.close();
      });
            
      return eventSource;
    })
    .catch(error => {
      // Handle network or request error
      callbacks.onError?.(
        error.response?.data || { 
          error: 'Erro de conexão com o servidor', 
          status_code: error.response?.status || 500,
          details: { source: 'network' }
        }
      );
      return null;
    });
};

// Regular HTTP request as fallback
export const checkEligibility = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      throw { error: 'No response from server', status_code: 503 };
    } else {
      // Something happened in setting up the request
      throw { error: 'Request setup error', status_code: 500 };
    }
  }
};