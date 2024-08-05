import { Router } from "express";
import { protectController } from "./protectedController";
import { getUsersController } from "./userController";

const router = Router();

router.route("/users").get(protectController, getUsersController);
