import { jwtDecode } from 'jwt-decode';

//const API_URL = 'http://localhost:9000';

const ACCESS_TOKEN_KEY = 'accessToken';

export const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function login(username, password) {
  console.log('Attempting login with:', { username, password });

  try {
    const response = await fetch('http://localhost:9000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      console.error('Login failed with status:', response.status);
      throw new Error('Login failed');
    }

    const data = await response.json();
    console.log('Received data:', data);

    return data.token; // Returning the token instead of user
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
}

  export function getUser() {
    const token = getAccessToken();
    if (!token) {
      return null;
    }
    return getUserFromToken(token);
  }

  export function logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  function getUserFromToken(token) {
    const claims = jwtDecode(token);
    return {
      id: claims.sub,
      username: claims.username,
    };
  }
  