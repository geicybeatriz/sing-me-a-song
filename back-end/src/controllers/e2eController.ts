import { Request, Response } from "express";
import e2eService from "../services/e2eService.js";

async function deleteData(req:Request, res:Response){
    await e2eService.deleteData();
    res.sendStatus(200);
}

const e2eController = {
    deleteData
}

export default e2eController;