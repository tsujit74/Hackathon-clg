import { Router } from "express";
import { allUser, login, register } from "../controllers/user.controller.js";


const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/alluser").get(allUser);

export default router;