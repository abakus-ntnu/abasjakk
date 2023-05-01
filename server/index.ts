import mongoose from "mongoose";
import express from "express";
import router from "./routes";

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://mongo:27017/abasjakk", {
    dbName: "abasjakk",
    retryWrites: true,
    w: "majority",
  })
  .then(() => console.log("connected to database"))
  .catch((e) => console.log(e));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`now listening on port ${process.env.PORT}`);
});
