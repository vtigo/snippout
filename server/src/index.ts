import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import conn from "./db/conn";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
conn(process.env.DATABASE_URL as string);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})
