import moment from "moment"
import adminRepository from "../repositories/adminDriverRepo"
import { feedback, id, Message, UpdateDriverStatusData } from "../utilities/interface"
import { DriverInterface } from "../entities/driver"
import { sendMail } from "../services/nodeMailer"

const adminRepo=new adminRepository()

export default class adminUseCases{
    pendingDrivers = async():Promise<DriverInterface|String>=>{
        try {
            const driverData : DriverInterface=await adminRepo.pendingDrivers() as DriverInterface
            return(driverData)
        } catch (error) {
            console.log(error);
            throw new Error((error as Error).message)
        }
    }
    verifiedDrivers = async():Promise<DriverInterface|String |{}>=>{
        try {
            const driverData:DriverInterface=await adminRepo.verifiedDrivers() as DriverInterface
            return(driverData)
        } catch (error) {
            console.log(error);
            throw new Error((error as Error).message)
        }
    }
    blockedDrivers = async():Promise<DriverInterface|String |{}>=>{
        try {
            const driverData:DriverInterface=await adminRepo.blockedDrivers() as DriverInterface
            return(driverData)
        } catch (error) {
            console.log(error);
            throw new Error((error as Error).message)
        }
    }
    driverData = async(data:id):Promise<DriverInterface|String>=>{
        try {
            const response=await adminRepo.driverData(data) as DriverInterface
            if(response){
                const formattedRideDate = {...response?.toObject()}
                    const formattedFeedbacks = formattedRideDate?.feedbacks.map((feedbacks:feedback)=> ({
                        ...feedbacks,
                        formattedDate:moment(feedbacks.date).format("DD-MM-YYYY")
                    }))
                    const newData ={...formattedRideDate,formattedFeedbacks}
                    console.log(newData);
                    return(newData)
            }
            return ""
        } catch (error) {
            console.log(error);
            throw new Error((error as Error).message)
        }
    }
    verifyDriver = async(data:id):Promise<DriverInterface|String |{}> =>{
        try {
            const response=await adminRepo.verifyDriver(data) as DriverInterface
            if(response?.email){
                const subject = "Account Verified Successfully";
                const text = `Hello ${response.name}, 
                Thank you for registering with Go! We're excited to have you on board. Your account has been successfully verified.
                
                Thank you for choosing Go. We look forward to serving you and making your journeys safe and convenient.
                
                Best regards,
                Go India`;

                try {
                    await sendMail(response.email,subject,text)
                    return({message:"Success"})
                } catch (error) {
                    console.log(error);
                    return((error as Error).message);
                }
            }else{
                return("Somthing error");
            }
        } catch (error) {
            console.log(error);
            throw new Error((error as Error).message)
        }
    }
    rejectDriver = async(data:id):Promise<Message |string> =>{
        try {
            const response=await adminRepo.rejectDriver(data) as DriverInterface
            const {id,reason}=data
            if(response?.email){
                const subject = "Account Registration  Rejected";
                const text = `Hello ${response.name}, 
                We regret to inform you that your registration with Go has been rejected. We appreciate your interest, 
                but unfortunately, we are unable to accept your application at this time.
                
                Reason : ${reason}

                You have the option to resubmit your registration and provide any missing or updated information.

                If you have any questions or need further information, please feel free to contact our support team.
                
                Sincerely,
                Go India`;

                try {
                    await sendMail(response.email,subject,text)
                    return({message:"Success"})
                } catch (error) {
                    console.log(error);
                    return((error as Error).message);
                }
            }else{
                return("Somthing error");
            }
        } catch (error) {
            console.log(error);
            throw new Error((error as Error).message)
        }
    }
    updateDriverStatus = async(data:UpdateDriverStatusData):Promise<Message |string>=>{
        try {
            const response=await adminRepo.updateDriverStatus(data) as DriverInterface
            let newStatus
            const {id,status,reason}=data
            if(status=="Block")newStatus="Blocked"
            if(response?.email){
                const subject = "Account Status Updated";
                const text = `Hello ${response.name}, 

                We inform you that your Safely account status has been updated.

                Status : ${newStatus}
                Reason : ${reason}

                If you have any questions or need further information, please feel free to contact our support team.
                
                Sincerely,
                Safely India`;

                try {
                    await sendMail(response.email, subject, text);
                    return({ message: "Success" });
                } catch (error) {
                    console.log(error);
                    return((error as Error).message);
                }
            } else {
                return("Somthing error");
            }
        } catch (error) {
            console.log(error);
            throw new Error((error as Error).message)
        }
    }

    dashboardData = async()=>{
        try {
            const driverData=await adminRepo.dashboardData()
            return(driverData)
        } catch (error) {
            console.log(error);
            throw new Error((error as Error).message)
        }
    }
}