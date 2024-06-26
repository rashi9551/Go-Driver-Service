import moment from "moment";
import driver from "../entities/driver";
import { Request,Response } from "express";
import { sendMail } from "../services/nodeMailer";
export default class adminController {
    pendingDrivers=async()=>{
        try {
            const response=await driver.find({account_status:"Pending"})
            return(response)
        } catch (error) {
           console.log(error );
            return(error)
        }
        
    }
    verifiedDrivers=async()=>{
        try {
            const response=await driver.find({account_status:{ $nin: ["Pending", "Rejected", "Blocked"] } })
            return(response)
        } catch (error) {
            console.log(error);
            return(error)
        }
    }
    blockedDrivers=async()=>{
        try {
            const response=await driver.find({account_status:"Blocked"})
            return(response)
        } catch (error) {
            console.log(error);
            return(error)
        }
    }
    driverData=async(data:any)=>{
        try {
            const {id}=data
            const response=await  driver.findById(id)
            if(response){
                const formattedRideDate = {...response?.toObject()}
                    const formattedFeedbacks = formattedRideDate?.feedbacks.map((feedbacks)=> ({
                        ...feedbacks,
                        formattedDate:moment(feedbacks.date).format("DD-MM-YYYY")
                    }))
                    const newData ={...formattedRideDate,formattedFeedbacks}
                    console.log(newData);
                    return(newData);
                }
        } catch (error) {
            console.log(error);
            return(error)
        }
    }
    verifyDriver= async(data:any) =>{
        try {
            const {id}=data
            const response=await  driver.findByIdAndUpdate(
                id,
                {
                    $set:{
                        account_status:"Good"
                    }
                },{
                    new:true
                }
            )

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
            return((error as Error).message);
        }
    }
    rejectDriver= async(data:any)=>{
        try {
            const {id,reason}=data
            const response=await  driver.findByIdAndUpdate(
                id,
                {
                    $set:{
                        account_status:"Rejected"
                    }
                },{
                    new:true
                }
            )

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
            return((error as Error).message);
        }
    }
    updateDriverStatus=async(data:any)=>{
        try {
            let newStatus;
            const {reason,status,id}=data
            if(status=="Block")newStatus="Blocked"
            else newStatus=status
            
            const response=await driver.findByIdAndUpdate(
                id,
                {
                    $set:{
                        account_status:newStatus
                    }
                },
                {
                    new:true
                }
            )
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
            return(error);
        }
    }

}