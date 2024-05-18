import { Request,Response,NextFunction } from "express";
import registration from "../../useCases/registration";
import { ObjectId } from "mongodb";
import uploadToS3 from "../../services/awsS3";

export default {
    register:async(req:Request,res:Response)=>{        
        const {name ,email,mobile ,password ,reffered_code}=req.body
        const userData={
            name,
            email,
            mobile,
            password,
            reffered_code
        }
        try {
            const response=await registration.register(userData)
            res.json(response)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    },
    checkDriver:async(req:Request,res:Response)=>{
        const {mobile}=req.body
        try {
            const response=await registration.checkDriver(mobile)
            res.json(response)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
            
        }
        
    },
    identificationUpdate:async(req:Request,res:Response)=>{
        const {aadharID,licenseID}=req.body
        const driverId:string=req.query.driverId as string
        const files =req.files as {[fieldname:string]:Express.Multer.File[]};
        console.log(files)
        try {
            if(driverId){
                const driverData={
                    driverId:new ObjectId(driverId),
                    aadharID,
                    licenseID,
                    aadharFile:files["aadharImage"][0],
                    licenseFile:files['licenseImage'][0]
                }
                const response=await registration.identification_update(driverData)
                console.log(response,"responseyy");
                res.json(response)     
                
            }else{
                res.json({message:"something error"})
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    },
    updateDriverImage:async(req:Request,res:Response)=>{
        const driverId:string=req.query.driverId as string

        try {
            if(driverId && req.file)
                {
                    const driverData={
                        driverId:new ObjectId(driverId),
                        file:req.file
                    };
                    const response= await registration.driverImage_update(driverData)
                    res.json(response)

                }else{
                    res.json({message:"Something error"});
                }
        } catch (error) {
            res.json((error as Error).message);
        }
    },
    vehicleUpdate:async(req:Request,res:Response)=>{
        try {
            const {registerationID,model}=req.body
            const files=req.files as { [fieldname:string]:Express.Multer.File[]}
            const driverId:ObjectId=req.query.driverId as unknown as ObjectId

            const rcImageUrl=await uploadToS3(files["rcImage"][0])
            const carImageUrl=await uploadToS3(files["carImage"][0])
            const vehicleData={
                registerationID,
                model,
                driverId,
                rcImageUrl,
                carImageUrl
            }

            const response= await registration.vehicleUpdate(vehicleData)
             res.json(response)
        } catch (error) {
            res.json((error as Error).message);
            
        }
    },
    location:async(req:Request,res:Response)=>{
        const {latitude,longitude}=req.body
        const driverId:string=req.query.driverId as string
        try {
            if(driverId)
                {
                    const locationData= {
                        driverId:new ObjectId(driverId),
                        latitude,
                        longitude

                    }
                    const response=await registration.location_update(locationData)
                    res.json(response)
                }
        } catch (error) {
            res.json((error as Error).message);
        }        
    }
    
}