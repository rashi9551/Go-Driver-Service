import { Request,Response,NextFunction } from "express";
import login from "../useCases/login";

export default class loginController{
    checkLogin=async(data:any)=>{
        try {
            
            const {mobile}=data
            const response=await login.loginCheckDriver(mobile)
            return(response)
        } catch (error) {
            return({ error: (error as Error).message });
            
        }
    }
    checkGoogleLoginDriver=async(data:any)=>{
        try {
            
            const {email}=data
            const response=await login.checkGoogleLoginDriver(email)
            return(response)
        } catch (error) {
            return({ error: (error as Error).message });
            
        }
    }
    
}