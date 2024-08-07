import axios from 'axios';

const request = async ({ route, method, body, headers = {} }) => {
  const token = localStorage.getItem('token');
  const isFormData = body instanceof FormData;

  const config = {
    method,
    url: `${process.env.REACT_APP_API_BASE_URL}${route}`,
    headers: {
      ...headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
    },
    data: body,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export default request;

export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
