import { Request,Response,NextFunction } from "express";
import ioginUseCases from "../useCases/login";
import loginUseCases from "../useCases/login";

const loginUseCase=new loginUseCases()
export default class loginController{
    checkLogin=async(data:any)=>{
        try {
            
            const {mobile}=data
            const response=await loginUseCase.loginCheckDriver(mobile)
            return(response)
        } catch (error) {
            return({ error: (error as Error).message });
            
        }
    }
    checkGoogleLoginDriver=async(data:any)=>{
        try { 
            const {email}=data
            const response=await loginUseCase.checkGoogleLoginDriver(email)
            return(response)
        } catch (error) {
            return({ error: (error as Error).message });
            
        }
    }
    
}