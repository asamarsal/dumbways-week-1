import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: number;
  role: string;
  email: string;
}

export function getUserRole(): string | null {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.role;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
  }
  return null;
}