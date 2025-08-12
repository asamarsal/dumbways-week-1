import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Register
app.post("/register", async (req, res) => {
  const { email, name, username, password, role, photo_profile, bio } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        email,
        name,
        username,
        password: hashedPassword,
        role,
        photo_profile,
        bio,
        created_at: new Date(),
      },
    ])
    .select();

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "User registered", user: data[0] });
});

// Login (email / username)
app.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .or(`email.eq.${identifier},username.eq.${identifier}`)
    .limit(1);

  if (error || users.length === 0)
    return res.status(400).json({ error: "User not found" });

  const user = users[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ message: "Login successful", token, user });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
