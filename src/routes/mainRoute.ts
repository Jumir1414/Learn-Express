import mainController from "../controllers/mainController";
import { Router } from "express";

const router = Router();

router.get('/',mainController.getHello );

export default router;