export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  photo_profile: string | "https://picsum.photos/200";
  bio: string | "Welcome to fitcuy";
  role: string;
}