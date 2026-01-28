import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "dotenv/config";
import userRouter from "./routes/user.routes.js";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routers
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
