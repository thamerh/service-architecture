import { AxiosError } from 'axios';

export async function handleApiError(error, router) {
  if (error.response?.status === 401) {
    window.location.replace("/auth");
    // console.log(error.response?.status)
  }

  let response = { status: 500, success: false, data: {} };

  if (error.response) {
    // The request was made, but the server responded with an error status code
    const status = error.response.status;
    const data = error.response.data;
    response = { status, success: false, data };
  }

  return response;
}
