import express from "express";
import messageRouter from "./routes/messages";
import contactForm from "./routes/contactForm";
import path from "path";

const mongoose = require("mongoose");
let MongoDbURL = process.env.MONGODB_URL;
mongoose.connect(MongoDbURL);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error : "));
db.once("open", function () {
  console.log("Database is Ready.... ");
});

const app = express();
const pathname=path.join(__dirname + "/public")
app.use(express.static(pathname))
app.use("/messages", messageRouter);
app.use('/contactForm' , contactForm)
app.get('/', (req, res) => {
  res.sendFile(path.join(pathname + "/index.html"));
});
app.get('/chat', (req, res) => {
  res.sendFile(path.join(pathname + "/gptPage.html"));
});

export default app;
