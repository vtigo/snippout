import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import conn from "./db/conn";
import router from "./routes";

// Load environment variables
dotenv.config();

// Initialize app
const PORT = process.env.PORT || 5000;
const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", router);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Resource not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const startServer = async () => {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error("DATABASE_URL is not defined");
    }

    await conn(dbUrl);
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