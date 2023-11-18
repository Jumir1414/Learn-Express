import authController from "../controllers/authenticationController";
import { Router } from "express";

const router = Router();

router.post('/register',authController.register );

export default router;