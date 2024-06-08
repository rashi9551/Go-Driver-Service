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

interface driverData{
    name:string,
    email:string,
    mobile:number,
    driver_id:string
}



export default class driverRepository{
    saveDriver=async(DriverData:Registration)=>{
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
    }
    findDriver=async (mobile:number)=>{
        try {
            const driverData=await driver.findOne({mobile:mobile}) 
            return driverData
        } catch (error) {
            return (error as Error).message;

        }
    }
    getDriverData=async (driver_id:string)=>{
        try {
            const driverData=await driver.findOne({_id:driver_id}) 
            return driverData
        } catch (error) {
            return (error as Error).message;

        }
    }
    findDriverEmail=async (email:string)=>{
        try {
            const driverData=await driver.findOne({email:email}) 
            return (driverData)
        } catch (error) {
            return (error as Error).message;

        }
    }
    updateIdentification=async(driverData:Identification)=>{
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

    }
    updateDriverImage=async(driverData : driverImage)=>{
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
    }
    vehicleUpdate=async(vehicleData:vehicleDatas)=>{
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
    }
    locationUpdate=async(data:locationData)=>{
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
    profileUpdate=async(data:driverData)=>{
        const {name,email,mobile,driver_id}=data
        const updateFields: { name?: string; email?: string; mobile?: number } = {};
        if (name) {
            updateFields.name = name;
        }

        if (email) {
            updateFields.email = email;
        }

        if (mobile) {
            updateFields.mobile = mobile;
        }
        const response=await driver.findByIdAndUpdate(
            driver_id,
            {
                $set:updateFields
            },
            {
                new:true
            }
        )
        return response
    }
    updateStatus=async (driver_id:string)=>{
        try {
            const data = await driver.findById(driver_id);
            const driverData=await driver.findByIdAndUpdate(
                driver_id,
                {
                    $set: {
                        isAvailable: !data?.isAvailable,
                    },
                },
                {
                    new: true,
                }
            )             
            return (driverData)
        } catch (error) {
            return (error as Error).message;

        }
    }
}