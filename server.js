import express from "express";
const app = express();
import path from "path";
import Routing from "./routes/root.js";
import { logger } from "./middleware/Logger.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOption from "./Config/corsOption.js";
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(logger);
app.use(cors(corsOption));
app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", Routing);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
