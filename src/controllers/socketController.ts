import socketUseCase from "../useCases/socket"

const socketUseCases=new socketUseCase()
interface data{
    vehicleModel:string
}

export default class socketController{
    findNearbyDrivers=async(data:data)=>{
       try {
        const drivers=await socketUseCases.findDrivers(data.vehicleModel)
        return drivers
       } catch (error) {
        console.log(error);
        return({ error: (error as Error).message });

       }
        
    }
    updateDriverStatus=async(driverId:string)=>{
       try {
        const drivers=await socketUseCases.updateDriverStatus(driverId)
        return drivers
       } catch (error) {
        console.log(error);
        return({ error: (error as Error).message });

       }
        
    }
    
}