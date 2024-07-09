import { refferalCode } from "../utilities/referralCode";
import bcrypt from "../services/bcrypt";
import driverRepository from "../repositories/driverRepo";
import { DriverInterface } from "../entities/driver";
import { DriverData,Identification,identification,driverImage,vehicleDatas,locationData, driverData } from "../utilities/interface";

const driverRepo=new driverRepository()



export default class registrationUseCase{
    register=async(DriverData:DriverData)=>{
        try {
    
            const {name ,email,mobile ,password ,reffered_code}=DriverData
            const referral_code=refferalCode()
            const hashedPassword=await bcrypt.securePassword(password)
            const newDriver={
                name,
                email,
                mobile,
                password:hashedPassword,
                referral_code
                
            }
            const response=await driverRepo.saveDriver(newDriver)
            if(typeof response !== "string" && response.email){
                return {message: "Success",driverId:response._id};
            }
        } catch (error) {
            
        }
    }
    checkDriver = async(mobile:number)=>{
        try {
            const response = await driverRepo.findDriver(mobile) as DriverInterface
            if (response) {
            // Get the first driver from the array
                if (response.identification) {
                    return { message: "Driver login" };
                } else {
                    return { message: "Driver must fill documents", driverId: response._id };
                }
            
        }
            return "Driver not registered";
        } catch (error) {
            return { message: (error as Error).message };
        }
    }
    identification_update = async(driverData:identification)=>{
        const {driverId,aadharID,licenseID,aadharImageUrl,licenseImageUrl}=driverData
        try {            
            const newDriverData:Identification={
                driverId:driverId,
                aadharID,
                licenseID,
                aadharImageUrl,
                licenseImageUrl
            };
            const response=await driverRepo.updateIdentification(newDriverData)
            if(response?.email){
                return ({message:"Success"})
            }else{
                return ({message:"Couldn't update now. Try again later!"})
            }
        } catch (error) {
            return { message: (error as Error).message };

        }
    }
    driverImage_update = async(driverData:driverImage)=>{
        try {
            const {driverId,driverImageUrl}=driverData
            
            const newDriverData={
                driverId,
                imageUrl:driverImageUrl
            }
            const response = await driverRepo.updateDriverImage(newDriverData)
            if(response?.email){
                return ({message:"Success"})
            }else{
                return({message:"User not found"})
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
    vehicleUpdate = async(vehicleData :vehicleDatas )=>{
        try {
            const response=await driverRepo.vehicleUpdate(vehicleData)

            if(response)
                {
                    return ({message:"Success"});
                }else{
                    return ({message:"Something Error"})
                }
        } catch (error) {
            throw new Error((error as Error).message)

        }

    }
    location_update = async(data:locationData)=>{
        try {
            
            const response=await driverRepo.locationUpdate(data)
            if(response?.email){
                return ({message:"Success"})
            }else{
                return ({message:"User not found"})
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
    

}