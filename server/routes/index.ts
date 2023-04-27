import express from "express";
import userRoutes from "./user";
import matchRoutes from "./match";
import roundRoutes from "./round";

const router = express.Router();

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    }
    next();
});
router.use('/user', userRoutes);
router.use('/match', matchRoutes);
router.use('/round', roundRoutes);

export default router;
