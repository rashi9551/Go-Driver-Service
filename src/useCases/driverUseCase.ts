import { DriverInterface } from "../entities/driver"
import driverRepository from "../repositories/driverRepo"
import { Message, RidePayment, feedback, redeem, referral, report } from "../utilities/interface"
import { driverData } from "../utilities/interface"
import Razorpay  from "razorpay"
import Stripe from "stripe";
import 'dotenv/config';

const driverRepo=new driverRepository()

const razorpayInstance:any = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_SECRET || "",
  });
  


export default class dirverUseCase{
    rideCompleteUpdate = async(data:RidePayment):Promise<Message>=>{
        try {
            const response=await driverRepo.rideCompleteUpdate(data)
            console.log(response,"ithu driver payment reponse");
            if(response){
                return({message:"Success"})
            }else{
                return({message:"something went wrong in driver database saving"})

            }
            
        } catch (error) {
            console.log(error);
            throw new Error((error as Error).message)
        }
    }

    getDriverData = async(driver_id:string):Promise<DriverInterface | Message>=>{
        try {
            const response : DriverInterface=await driverRepo.getDriverData(driver_id) as DriverInterface
            if(response!=undefined){
                return (response)
            }else{
                return ({message:"User not found"})
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
    profileUpdate = async(driverData:driverData):Promise<DriverInterface | Message>=>{
        try {
            const response:DriverInterface=await driverRepo.profileUpdate(driverData) as DriverInterface
            if(response!=undefined){
                return (response)
            }else{
                return ({message:"User not found"})
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
    updateStatus = async(driver_id:string):Promise<DriverInterface | Message>=>{
        try {
            const driverData:DriverInterface=await driverRepo.updateStatus(driver_id) as DriverInterface
            if(driverData!=undefined){
                return (driverData)
            }else{
                return ({message:"User not found"})
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
    feedback = async(data:feedback)=>{
        try {
            const driverData=await driverRepo.feedback(data) 
            if(driverData!=undefined){
                return ({driverData,message:"Success"})
            }else{
                return ({message:"User not found"})
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
    report = async(data:report)=>{
        try {
            const driverData=await driverRepo.report(data) 
            if(driverData!=undefined){
                return ({driverData,message:"Success"})
            }else{
                return ({message:"User not found"})
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
    redeemWalletRazorpay = async(data:redeem)=>{
        try {
            const {balance,upiId}=data
            const amount=Number(balance)
              
            // const stripe = new Stripe(process?.env.STRIPE_SECRET_KEY as string, {
            //     apiVersion: "2024-06-20",
            // });
            // const testStripeAccountID = 'acct_12345';

            // const payout = await stripe.payouts.create(
            //     {
            //       amount: amount * 100, 
            //       currency: 'inr',
            //     },
            //     {
            //       stripeAccount: testStripeAccountID
            //     }
            //   );

            const driverData:DriverInterface=await driverRepo.redeemWalletRazorpay(data) as DriverInterface
            if(driverData._id){
                return ({message:"Success"})
            }else{
                return ({message:"something went wrong"})
            } 
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
   
}