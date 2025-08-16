import express from "express";
import http from "http";
import authRoute from "./routes/auth";
import workoutRoute from "./routes/workout";
import sportRoute from "./routes/sport";
import mentorshipRoute from "./routes/mentorship";
import { corsMiddleware } from "./middlewares/cors";

import path from "path";

const app = express();
const httpServer = http.createServer(app); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(corsMiddleware);

// Group Route
app.use("/api/v1/auth/", authRoute);
app.use("/api/v1/workout/", workoutRoute);
app.use("/api/v1/sport/", sportRoute);
app.use("/api/v1/mentorship", mentorshipRoute);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} ✅`);
});