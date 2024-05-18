import { Request,Response,NextFunction } from "express";
import login from "../../useCases/login";

export default{
    checkLogin:async(req:Request,res:Response)=>{
        try {
            
            const {mobile}=req.body
            const response=await login.loginCheckDriver(mobile)
            res.json(response)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
            
        }
    }
}