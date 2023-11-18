import mainController from "../controllers/mainController";
import { Router } from "express";

const router = Router();

router.post('/',mainController.getHello );

export default router;