// src/services/auth.service.ts
import bcrypt from "bcrypt";
import { prisma } from "../prisma/client";
import { signToken } from "../utils/jwt";
import { loginSchema } from "../validation/auth";

export async function register(
  email: string, 
  password: string, 
  username: string,
  name: string, 
  role?: string,
  photo_profile?: string,
  bio?: string
) {
  if (!email.match(/@/) || password.length < 6) {
    throw new Error("Invalid email or password");
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { 
      email, 
      password: hashed,
      username,
      name,
      role,
      photo_profile,
      bio,  
    }
  });

  const token = signToken({ id: user.id });

  return { 
    id: user.id, 
    email: user.email,
    name: user.name,
    username: user.username,
    token
  };
}

export async function login(identifier: string, password: any) {
  
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: identifier },
        { username: identifier }
      ]
    }
  });

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Wrong password");

  const token = signToken({ id: user.id,});
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    token
  };
}