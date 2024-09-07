import { Request,Response,NextFunction } from "express";
import ioginUseCases from "../useCases/loginUseCase";
import loginUseCases from "../useCases/loginUseCase";
import { testerLogin } from "../utilities/interface";

const loginUseCase=new loginUseCases()
export default class loginController{
    checkLogin=async(data:{email:string})=>{
        try {
            const {email}=data
            const response=await loginUseCase.loginCheckDriver(email)
            return(response)
        } catch (error) {
            return({ error: (error as Error).message });
            
        }
    }
    verifyOtp=async(data:{otp:number,email:string})=>{
        try {
            const {otp,email}=data
            const response=await loginUseCase.verifyOtp(otp,email)
            return(response)
        } catch (error) {
            return({ error: (error as Error).message });
            
        }
    }
    checkGoogleLoginDriver=async(data:{email:string})=>{
        try { 
            const {email}=data
            const response=await loginUseCase.checkGoogleLoginDriver(email)
            return(response)
        } catch (error) {
            return({ error: (error as Error).message });
            
        }
    }
    testerLogin=async(data:testerLogin)=>{
        try { 
            const response=await loginUseCase.testerLogin(data)
            return(response)
        } catch (error) {
            return({ error: (error as Error).message });
            
        }
    }
    
}