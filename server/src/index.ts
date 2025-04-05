import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import router from "./routes";
import connectDB from "./config/db";
import { errorHandler } from "./middleware/error.middleware";
import cookieParser from "cookie-parser"
import { optionalAuthenticate } from "./middleware/auth.middleware";

dotenv.config();

// Initialize app
const PORT = process.env.PORT || 5000;
const app: Express = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(optionalAuthenticate)

// Routes
app.use("/api", router);

// Error handling
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Resource not found" });
});
app.use(errorHandler)

const startServer = async () => {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error("DATABASE_URL is not defined");
    }

    await connectDB(dbUrl);
    console.log("Connected to database");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();