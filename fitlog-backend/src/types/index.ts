export interface User {
  id: number;
  username: string;
  full_name: string;
  email: string;
  photo_profile: string | null;
  bio: string | null;
  role: string;
}