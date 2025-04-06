import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Function to check eligibility using Server-Sent Events (SSE)
export const checkEligibilitySSE = (userData, callbacks) => {
  // Create a new EventSource connection to the server
  const eventSource = new EventSource(`${BASE_URL}/eligibility-sse`);
  
  // Send user data to start the process
  axios.post(`${BASE_URL}/eligibility`, userData)
    .catch(error => {
      // Handle network or request error
      eventSource.close();
      callbacks.onError(error.response?.data || { error: 'Network error occurred' });
    });

  // Listen for SSE events
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    // Process different event types
    if (data.type === 'progress') {
      callbacks.onProgress(data);
    } else if (data.type === 'complete') {
      callbacks.onComplete(data.result);
      eventSource.close();
    }
  };

  // Handle connection error
  eventSource.onerror = (error) => {
    callbacks.onError({ error: 'SSE connection error' });
    eventSource.close();
  };

  // Return the eventSource to allow manual closing if needed
  return eventSource;
};

// Regular HTTP request as fallback
export const checkEligibility = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/eligibility`, userData);
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