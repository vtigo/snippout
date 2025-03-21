import express, { Express, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from server");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})
