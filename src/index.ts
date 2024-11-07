import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

// Load environment variables from .env file in development mode
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Basic request logging for incoming requests (can be replaced by a more advanced logger in production)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Route Handlers
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.get("/hello/:name", (req: Request, res: Response) => {
  const name = req.params.name;
  res.send(`Hello, ${name}`);
});

// Centralized error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error (consider using a more advanced logging solution for production)
  res.status(500).send("Something went wrong!"); // Generic error response
});

// Set the port for the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
