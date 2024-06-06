import registration from "../useCases/registration";
import { ObjectId } from "mongodb";

export default class registerController{
    register=async(data:any)=>{        
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
            const response=await registration.register(userData)
            return (response)
        } catch (error) {
            return({ error: (error as Error).message });
        }
    }
    checkDriver=async(data:any)=>{
        const {mobile}=data
        try {
            const response=await registration.checkDriver(mobile)
            return(response)
        } catch (error) {
            return({ error: (error as Error).message });
            
        }
        
    }
    identificationUpdate=async(data:any)=>{
        const {aadharID,licenseID,driverId,aadharImageUrl,licenseImageUrl}=data
        console.log(licenseImageUrl)
        try {
            if(driverId){
                const driverData={
                    driverId:new ObjectId(driverId),
                    aadharID,
                    licenseID,
                    aadharImageUrl:aadharImageUrl,
                    licenseImageUrl:licenseImageUrl
                }
                const response=await registration.identification_update(driverData)
                console.log(response,"responseyy");
                return(response)     
                
            }else{
                return({message:"something error"})
            }
        } catch (error) {
            return({ error: (error as Error).message });
        }
    }
    updateDriverImage=async(data:any)=>{
        const {driverId,url}=data
        console.log(url,"ithu files");
        try {
            if(driverId && url)
                {
                    const driverData={
                        driverId:new ObjectId(driverId),
                        driverImageUrl:url
                    };
                    const response= await registration.driverImage_update(driverData)
                    return(response)

                }else{
                    return({message:"Something error"});
                }
        } catch (error) {
            return((error as Error).message);
        }
    }
    vehicleUpdate=async(data:any)=>{
        try {
            const {registerationID,model,driverId,rcImageUrl,carImageUrl}=data
            const vehicleData={
                registerationID,
                model,
                driverId,
                rcImageUrl,
                carImageUrl
            }

            const response= await registration.vehicleUpdate(vehicleData)
             return(response)
        } catch (error) {
            return((error as Error).message);
            
        }
    }
    location=async(data:any)=>{
        const {latitude,longitude,driverId}=data
        try {
            if(driverId)
                {
                    const locationData= {
                        driverId:new ObjectId(driverId),
                        latitude,
                        longitude

                    }
                    const response=await registration.location_update(locationData)
                    return(response)
                }
        } catch (error) {
            return((error as Error).message);
        }        
    }
    
}