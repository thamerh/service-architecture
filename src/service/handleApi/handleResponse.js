import { AxiosResponse } from 'axios';

export async function handleApiResponse(response) {
  // The request was made, but the server responded with an error status code
  if (response !== undefined) {
    const status = response?.status;
    const data = response.data;

    if (status === 200) {
      return { status, success: true, data };
    }
    // Wrap the original response in your custom structure
    return { status, success: true, data: data.data || data };
  }

  // Return an error response if the original response is undefined
  return { status: 500, success: false, data: 'Internal Server Error' };
}
