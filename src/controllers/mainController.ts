import { Request, Response } from "express";

const mainController = {
    getHello: async (_req:Request,res:Response) :Promise<void>=>{
        res.send('Hello, World!');
    }
}
export default mainController;