import registrationUseCases from "../useCases/registrationUseCase";
import { ObjectId } from "mongodb";
import { DriverData, driverImage, identification, locationData, vehicleDatas } from "../utilities/interface";

const registrationUseCase= new registrationUseCases()

export default class registerController{
    register=async(data:DriverData)=>{        
        const {name ,email,mobile ,password ,reffered_code}=data
        const userData={
            name,
            email,
            mobile,
            password,
            reffered_code,
            joiningDate:Date.now()
        }
        try {
            const response=await registrationUseCase.register(userData)
            return (response)
        } catch (error) {
            return({ error: (error as Error).message });
        }
    }
    checkDriver=async(data:{mobile:number})=>{
        const {mobile}=data
        try {
            const response=await registrationUseCase.checkDriver(mobile)
            return(response)
        } catch (error) {
            return({ error: (error as Error).message });
            
        }
        
    }
    identificationUpdate=async(data:identification)=>{
        const {aadharID,licenseID,driverId,aadharImageUrl,licenseImageUrl}=data
        try {
            if(driverId){
                const driverData={
                    driverId:new ObjectId(driverId),
                    aadharID,
                    licenseID,
                    aadharImageUrl:aadharImageUrl,
                    licenseImageUrl:licenseImageUrl
                }
                const response=await registrationUseCase.identification_update(driverData)
                return(response)     
                
            }else{
                return({message:"something error"})
            }
        } catch (error) {
            return({ error: (error as Error).message });
        }
    }
    updateDriverImage=async(data:{driverId:string,url:string})=>{
        const {driverId,url}=data
        try {
            if(driverId && url)
                {
                    const driverData={
                        driverId:new ObjectId(driverId),
                        driverImageUrl:url
                    };
                    const response= await registrationUseCase.driverImage_update(driverData)
                    return(response)

                }else{
                    return({message:"Something error"});
                }
        } catch (error) {
            return((error as Error).message);
        }
    }
    vehicleUpdate=async(data:vehicleDatas)=>{
        try {
            const {registerationID,model,driverId,rcImageUrl,carImageUrl}=data
            const vehicleData={
                registerationID,
                model,
                driverId,
                rcImageUrl,
                carImageUrl
            }

            const response= await registrationUseCase.vehicleUpdate(vehicleData)
             return(response)
        } catch (error) {
            return((error as Error).message);
            
        }
    }
    location=async(data:locationData)=>{
        const {latitude,longitude,driverId}=data
        try {
            if(driverId)
            {
                const locationData= {
                    driverId:new ObjectId(driverId),
                    latitude,
                    longitude

                }
                const response=await registrationUseCase.location_update(locationData)
                return(response)
            }
        } catch (error) {
            return((error as Error).message);
        }        
    }
    
}