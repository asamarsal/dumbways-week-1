import cors from "cors";

export const corsMiddleware = cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});