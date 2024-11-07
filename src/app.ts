import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    success: true,
    code: 200,
    message: "Welcome to Darshan Tube Backend",
    github: "https://github.com/subho-1011",
    NODE_ENV: process.env.NODE_ENV,
  });
});

app.get("/hello/:name", (req, res) => {
  res.json({
    send: `Hello, ${req.params.name}`,
  });
});

app.get("/user/login", (req, res) => {
  res
    .cookie("access", req.query.name, {
      httpOnly: true,
      secure: true,
    })
    .json({
      user: `${req.query.name}`,
      password: `${req.query.pass}`,
    });
});

app.get("/user", (req, res) => {
  const accessToken = req.cookies?.access;
  res.send({
    token: accessToken,
  });
});

export default app;
