import { Router } from "express";
import e2eController from "../controllers/e2eController.js";

const e2eRouter = Router();
e2eRouter.delete("/e2e/reset", e2eController.deleteData);
export default e2eRouter;