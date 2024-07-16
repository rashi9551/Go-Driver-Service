import { ObjectId } from "mongodb";
import Driver, { DriverInterface, RideDetails } from "../entities/driver";
import { Message, RidePayment, feedback, redeem, referral, report } from "../utilities/interface";
import { driverData,Registration,Identification,DriverImage,vehicleDatas,locationData } from "../utilities/interface";




export default class driverRepository{
    saveDriver=async(DriverData:Registration) :Promise<DriverInterface | string>=>{
        try {
            const newDriver=new Driver({
                name:DriverData.name,
                email:DriverData.email,
                mobile:DriverData.mobile,
                password:DriverData.password,
                referral_code:DriverData.referral_code,
                joiningDate:Date.now(),
                identification:false
            })
            const saveDriver : DriverInterface=await newDriver.save() as DriverInterface
            return saveDriver
        } catch (error) {
            return (error as Error).message;

        }
    }
    findDriver=async (mobile:number):Promise<DriverInterface |string>=>{
        try {
            const driverData :DriverInterface=await Driver.findOne({mobile:mobile}) as DriverInterface
            return driverData
        } catch (error) {
            return (error as Error).message;
        }
    }
    getDriverData=async (driver_id:string):Promise<DriverInterface |string>=>{
        try {
            const driverData:DriverInterface=await Driver.findOne({_id:driver_id}).sort({date:1}) as DriverInterface
            return driverData
        } catch (error) {
            return (error as Error).message;

        }
    }
    findDriverEmail=async (email:string):Promise<DriverInterface |string>=>{
        try {
            const driverData:DriverInterface=await Driver.findOne({email:email}) as DriverInterface
            return (driverData)
        } catch (error) {
            return (error as Error).message;

        }
    }
    updateIdentification=async(driverData:Identification)=>{
        try {
            const {driverId,aadharID,licenseID,aadharImageUrl,licenseImageUrl}=driverData 
            const response=await Driver.findByIdAndUpdate(
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
            
        } catch (error) {
            console.log(error);
            throw new Error((error as Error).message);
        }

    }
    updateDriverImage=async(driverData : DriverImage)=>{
        try {
            const {driverId,imageUrl}=driverData
            const response = await Driver.findByIdAndUpdate(
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
                const response=await Driver.findByIdAndUpdate(driverId,{
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
            
            return response
        } catch (error) {
            throw new Error((error as Error).message);

        }
    }
    locationUpdate=async(data:locationData)=>{
        try {
            const {driverId,longitude,latitude}=data
            const response=await Driver.findByIdAndUpdate(
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
            
        } catch (error) {
            console.log(error);
            throw new Error((error as Error).message);

        }
    }
    profileUpdate=async(data:driverData):Promise<DriverInterface |string>=>{
        try {
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
            const response :DriverInterface=await Driver.findByIdAndUpdate(
                driver_id,
                {
                    $set:updateFields
                },
                {
                    new:true
                }
            ) as DriverInterface
            return response
            
        } catch (error) {
            console.log(error);
            throw new Error((error as Error).message);
        }
    }
    updateStatus=async (driver_id:string):Promise<DriverInterface |string>=>{
        try {
            const data = await Driver.findById(driver_id);
            const driverData:DriverInterface=await Driver.findByIdAndUpdate(
                driver_id,
                {
                    $set: {
                        isAvailable: !data?.isAvailable,
                    },
                },
                {
                    new: true,
                }
            ) as DriverInterface      
            return (driverData)
        } catch (error) {
            console.log(error);
            return (error as Error).message;
        }
    }
    rideCancelled=async (driver_id:string)=>{
        try {
            const data = await Driver.findById(driver_id);
            if (data && !data.isAvailable) {
                const driverData = await Driver.findByIdAndUpdate(
                    driver_id,
                    {
                        $set: {
                            isAvailable: true,
                        },
                        $inc: {
                            "RideDetails.cancelledRides": 1,
                        },
                    },
                    {
                        new: true,
                    }
                );
                return (driverData)
            }            
        } catch (error) {
            return (error as Error).message;

        }
    }
    findNearDrivers=async(vehicleModel:string)=>{
        try {
            const driverIds=await Driver.find({"vehicle_details.model": vehicleModel , account_status:{$in:["Good","Warning"]},isAvailable:true})
                .select("_id")
                .exec();
                return driverIds
        } catch (error) {
            console.log(error);
            
        }
    }

    feedback= async (data:feedback)=> {

        const { rating, feedback ,ride_id,driver_id } = data;
        
        try {
            const newFeedback = {
                feedback: feedback,
                rating: rating,
                ride_id:ride_id,
                date: Date.now(),
            };
            console.log(newFeedback,"=-=-=-=- feed");
            
            await Driver.findByIdAndUpdate(driver_id, {
                $inc: {
                    totalRatings: 1,
                },
                $push: {
                    feedbacks: newFeedback,
                },
            });
            return({ message: "Success" });
        } catch (error) {
            return((error as Error).message);
        }
    }
    report= async (data:report)=> {

        const {  reason ,ride_id,driver_id } = data;
        
        try {
            const newReport = {
                reason: reason,
                ride_id:ride_id,
                date: Date.now(),
            };
            console.log(newReport,"=-=-=-=- feed");
            
            await Driver.findByIdAndUpdate(driver_id, {
                $inc: {
                    totalReports: 1,
                },
                $push: {
                    reports: newReport,
                },
            });
            return({ message: "Success" });
        } catch (error) {
            console.log(error);
            return((error as Error).message);
        }
    }
    redeemWalletRazorpay = async (data: redeem): Promise<DriverInterface | string> => {
        const { balance, upiId, driver_id } = data;
    
        try {
            const driverData: DriverInterface | null = await Driver.findById(driver_id);
            
            if (driverData) {
                try {
                    const driverNewBalance = driverData.wallet.balance - (Number(balance) );
                    const driverTransaction = {
                        date: new Date(),
                        details: 'redeemed by driver',
                        amount: Number(balance) ,
                        status: 'Debit',
                    };
    
                    const updatedDriver: DriverInterface | null = await Driver.findByIdAndUpdate(driver_id, {
                        $set: {
                            'wallet.balance': driverNewBalance,
                        },
                        $push: {
                            'wallet.transactions': driverTransaction,
                        }, 
                    }, { new: true });
    
                    if (updatedDriver) {
                        return updatedDriver;
                    } else {
                        throw new Error('Driver not found or update failed.');
                    }
                } catch (error) {
                    console.error('Error updating driver:', error);
                    return (error as Error).message; 
                }
            } else {
                throw new Error('Driver not found.');
            }
        } catch (error) {
            console.error('Error finding driver:', error);
            return (error as Error).message; 
        }
    };
   

    rideCompleteUpdate=async(data:RidePayment):Promise<DriverInterface | String |undefined>=>{
        try {
            const {paymentMode,driverId,amount,rideId}=data
            const driverData:DriverInterface = await Driver.findById(driverId)as DriverInterface     
            if(paymentMode==='Upi'){
                try {
                    const driverNewBalance = driverData?.wallet.balance + (amount/100);
                    const driverTransaction = {
                        date: new Date(),
                        details: `Payment for the ride ${rideId}`,
                        amount: amount / 100,
                        status: "Credit",
                    };                    
                    const driver :DriverInterface=await Driver.findByIdAndUpdate(driverId, {
                        $set: {
                            "wallet.balance": driverNewBalance,
                        },
                        $push: {
                            "wallet.transactions": driverTransaction,
                        },
                        $inc: {
                            "RideDetails.completedRides": 1,
                            "RideDetails.totalEarnings":  amount / 100,
                        },
                        isAvailable: true,
                    }) as DriverInterface
                    return driver
                } catch (error) {
                    console.log(error);
                    return((error as Error).message);
                }
            }else if(paymentMode==='Cash in hand'){
                try {
                    const driver=await Driver.findByIdAndUpdate(driverId, {
                        $inc: {
                            "RideDetails.completedRides": 1,
                            "RideDetails.totalEarnings": amount,
                        },
                        isAvailable: true,
                    },{
                        new:true
                    }
                )as DriverInterface
                    console.log(driver,"ithu dr768989068690-");
                    return driver
                } catch (error) {
                    console.log(error);
                    return((error as Error).message);
                }
            }else if(paymentMode==='Wallet'){
                try {
                    const driverNewBalance = driverData.wallet.balance + amount;
                    const driverTransaction = {
                        date: new Date(),
                        details: `Payment for the ride ${rideId}`,
                        amount: amount,
                        status: "Credit",
                    };

                    const driver=await Driver.findByIdAndUpdate(driverId, {
                        $set: {
                            "wallet.balance": driverNewBalance,
                        },
                        $push: {
                            "wallet.transactions": driverTransaction,
                        },
                        $inc: {
                            "RideDetails.completedRides": 1,
                            "RideDetails.totalEarnings": amount,
                        },
                        isAvailable: true,
                    }) as DriverInterface
                    return driver
                } catch (error) {
                    console.log(error);
                    return((error as Error).message);
                }
            }  
        } catch (error) {
            console.log(error);
            return((error as Error).message);
        }
    }
}