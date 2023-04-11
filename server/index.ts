import mongoose from "mongoose";
import express from "express";

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/abasjakk", {
    dbName: "abasjakk",
    retryWrites: true,
    w: "majority",
  })
  .then(() => console.log("connected"))
  .catch((e) => console.log(e));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`now listening on port ${process.env.PORT}`);
});
