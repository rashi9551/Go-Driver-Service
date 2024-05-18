import { ObjectId } from "mongodb";
import driver, { DriverInterface } from "../entities/driver";

interface Registration {
    name: string;
    email: string;
    mobile: number;
    password: string;
    referral_code: string;
}

interface Identification {
    driverId: ObjectId;
    aadharID: string;
    licenseID: string;
    aadharImageUrl: string;
    licenseImageUrl: string;
}
interface Identification {
    driverId: ObjectId;
    aadharID: string;
    licenseID: string;
    aadharImageUrl: string;
    licenseImageUrl: string;
}

interface driverImage {
    driverId: ObjectId;
    imageUrl: string;
}

interface vehicleDatas{
    registerationID:string,
    model:string,
    driverId:ObjectId,
    rcImageUrl:string,
    carImageUrl:string
}
interface locationData{
    driverId:ObjectId,
    latitude:number,
    longitude:number
}



export default{
    saveDriver:async(DriverData:Registration)=>{
        try {
            const newDriver=new driver({
                name:DriverData.name,
                email:DriverData.email,
                mobile:DriverData.mobile,
                password:DriverData.password,
                referral_code:DriverData.referral_code
            })
            const saveDriver=await newDriver.save()
            return saveDriver
        } catch (error) {
            return (error as Error).message;

        }
    },
    findDriver:async (mobile:number)=>{
        try {
            const driverData=await driver.findOne({mobile:mobile}) 
            return driverData
        } catch (error) {
            return (error as Error).message;

        }
    },
    updateIdentification:async(driverData:Identification)=>{
        const {driverId,aadharID,licenseID,aadharImageUrl,licenseImageUrl}=driverData 
        const response=await driver.findByIdAndUpdate(
            driverId,
            {
                $set:{
                    aadhar:{
                        aadharId:aadharID,
                        aadharImage:aadharImageUrl,
                    },
                    license:{
                        licenseId:licenseID,
                        licenseImage:licenseImageUrl,
                    },
                },
            },
            {
                new:true
            }
        );
        return response;

    },
    updateDriverImage:async(driverData : driverImage)=>{
        try {
            const {driverId,imageUrl}=driverData
            const response = await driver.findByIdAndUpdate(
                driverId,
                {
                    $set:{
                        driverImage:imageUrl,
                    },
                },
                {
                    new:true,
                }
            )
            return response
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    vehicleUpdate:async(vehicleData:vehicleDatas)=>{
        try {
            const {registerationID,
                model,
                driverId,
                rcImageUrl,
                carImageUrl}=vehicleData
                const response=await driver.findByIdAndUpdate(driverId,{
                    $set:{
                        vehicle_details:{
                            registerationID,
                            model,
                            rcImageUrl,
                            carImageUrl
                        }
                    }
                },
                {
                    new:true
                }
            )
            console.log(response);
            
            return response
        } catch (error) {
            throw new Error((error as Error).message);

        }
    },
    locationUpdate:async(data:locationData)=>{
        const {driverId,longitude,latitude}=data
        const response=await driver.findByIdAndUpdate(
            driverId,
            {
                $set:{
                    location:{
                        latitude,
                        longitude
                    },
                    identification:true,
                    account_status:"Pending"
                }
            },
            {
                new:true
            }
        )
        return response
    }
}