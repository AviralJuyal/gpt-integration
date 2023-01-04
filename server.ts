import express from "express";
import messageRouter from "./routes/messages";
import path from "path";

const app = express();
const pathname=path.join(__dirname + "/public")
app.use("/messages", messageRouter);
app.get('/', (req, res) => {
  res.sendFile(path.join(pathname + "/index.html"));
});

export default app;
