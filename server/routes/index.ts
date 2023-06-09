import express from "express";
import userRoutes from "./user";
import matchRoutes from "./match";
import roundRoutes from "./round";
import settingsRoutes from "./settings";
import loginRoutes from "./login";

const router = express.Router();

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, password");
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    if (req.method == "OPTIONS") {
      res.sendStatus(200);
      return;
    }
    next();
});

router.use((req, res, next) => {
  if (req.method == "GET") {
    next();
    return;
  }

  if (req.headers.password == process.env.PASSWORD) {
    next();
  }else {
    res.status(401).send("ERROR: Incorrect password");
  }
});

router.use('/user', userRoutes);
router.use('/match', matchRoutes);
router.use('/round', roundRoutes);
router.use('/settings', settingsRoutes);
router.use('/login', loginRoutes);

export default router;
