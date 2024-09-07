import driverReposiory from "../repositories/driverRepo";
import auth from "../middleware/auth";
import { DriverInterface } from "../entities/driver";
import { testerLogin } from "../utilities/interface";
import { comparePassword } from "../utilities/passwordCompare";
import { sendOtp } from "../services/otpSending";
import { getOtpByEmail, otpSetData } from "../services/redis";

const driverRepo=new driverReposiory()


export default class loginUseCase{
    loginCheckDriver= async (email:string) => {
        try {
            const response = await driverRepo.findDriver(email) as DriverInterface
            console.log(response)
            if (response) {
                if (                
                    response.account_status !== "Pending" &&
                    response.account_status !== "Rejected" &&
                    response.account_status !== "Blocked"&&
                    response.identification
                    ) {
                    const token = await auth.createToken(response._id.toString(),'15m');
                    const refreshToken = await auth.createToken(response._id.toString(),'7d');
                    const otp:string= await sendOtp(email,response.name) as string
                    await otpSetData(email,otp)
                    return { message: "Success", name: response.name, refreshToken,token, _id:response._id ,otp};
                } else if (response.account_status === "Rejected") {
                    return { message: "Rejected", driverId:response._id };
                } else if (response.account_status === "Blocked") {
                    return { message: "Blocked" };
                } else if (!response.identification) {
                    return { message: "Incomplete registration", driverId:response._id };
                } else {
                    return { message: "Not verified" };
                }
            } else return { message: "No user found" };
            
        } catch (error) {
            console.log(error);
            
        }
    }
    verifyOtp= async (otp: number,email:string) => {
        try {
            const redisOtp=await getOtpByEmail(email)
            if(redisOtp==otp?.toString()){
                return { message: "Success"};

            }else{
                return {message:"Invalid Otp"}
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    checkGoogleLoginDriver= async (email: string) => {
        try {
            const response = await driverRepo.findDriverEmail(email) as DriverInterface
            if (response) {
                if (                
                    response.account_status !== "Pending" &&
                    response.account_status !== "Rejected" &&
                    response.account_status !== "Blocked"&&
                    response.identification
                    ) {
                    const token = await auth.createToken(response._id.toString(),'15m');
                    const refreshToken = await auth.createToken(response._id.toString(),'7d');
                    return { message: "Success", name: response.name, refreshToken,token, _id:response._id };
                } else if (response.account_status === "Rejected") {
                    return { message: "Rejected", driverId:response._id };
                } else if (response.account_status === "Blocked") {
                    return { message: "Blocked" };
                } else if (!response.identification) {
                    return { message: "Incomplete registration", driverId:response._id };
                } else {
                    return { message: "Not verified" };
                }
            } else return { message: "No user found" };
            
        } catch (error) {
            console.log(error);
            
        }
    }
    testerLogin= async (data: testerLogin) => {
        try {
            const {email,password}=data
            const response = await driverRepo.findDriverEmail(email) as DriverInterface
            const isMatch=await comparePassword(password,response.password)
            if (isMatch) {
                if (                
                    response.account_status !== "Pending" &&
                    response.account_status !== "Rejected" &&
                    response.account_status !== "Blocked"&&
                    response.identification
                    ) {
                    const token = await auth.createToken(response._id.toString(),'15m');
                    const refreshToken = await auth.createToken(response._id.toString(),'7d');
                    return { message: "Success", name: response.name, refreshToken,token, _id:response._id };
                } else if (response.account_status === "Rejected") {
                    return { message: "Rejected", driverId:response._id };
                } else if (response.account_status === "Blocked") {
                    return { message: "Blocked" };
                } else if (!response.identification) {
                    return { message: "Incomplete registration", driverId:response._id };
                } else {
                    return { message: "Not verified" };
                }
            } else return { message: "incorrect password"};
            
        } catch (error) {
            console.log(error);
            
        }
    }

}