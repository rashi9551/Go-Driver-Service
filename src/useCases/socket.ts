import driverRepository from "../repositories/driverRepo"


const driverRepo=new driverRepository()

export default class socketUseCase{
    findDrivers=async(vehicleModel:string)=>{
        try {
            const driversId=await driverRepo.findNearDrivers(vehicleModel)
            return driversId
        } catch (error) {
            console.log(error);
        }
    }
    updateDriverStatus=async(driverId:string)=>{
        try {
            const driver=await driverRepo.updateStatus(driverId)
            if(driver)
            {
                return {message:"success"}
            }else{
                return {message:"something went wrong"}
            }
        } catch (error) {
            console.log(error);
        }
    }
}