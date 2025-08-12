import express from "express";
import authRoute from "./routes/auth";
import { corsMiddleware } from "./middlewares/cors";

import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(corsMiddleware);

// Group Route
app.use("/api/v1/auth/", authRoute);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} ✅`);
});