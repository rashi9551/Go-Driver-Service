import driverRepository from "../repositories/driverRepo"
import { RidePayment } from "../utilities/interface"

const driverRepo=new driverRepository()

interface driverData{
    name:string,
    email:string,
    mobile:number,
    driver_id:string
}


export default class dirverUseCase{
    rideCompleteUpdate = async(data:RidePayment)=>{
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

    getDriverData = async(driver_id:string)=>{
        try {
            const response=await driverRepo.getDriverData(driver_id)
            if(response!=undefined){
                return (response)
            }else{
                return ({message:"User not found"})
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
    profileUpdate = async(driverData:driverData)=>{
        try {
            const response=await driverRepo.profileUpdate(driverData)
            if(response!=undefined){
                return (response)
            }else{
                return ({message:"User not found"})
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
    updateStatus = async(driver_id:string)=>{
        try {
            const driverData=await driverRepo.updateStatus(driver_id)
            if(driverData!=undefined){
                return ({driverData,message:"Success"})
            }else{
                return ({message:"User not found"})
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}