import Driver, { DriverInterface, RideDetails } from "../entities/driver";
import { id, UpdateDriverStatusData } from "../utilities/interface";


export default class adminDriverRepository{
    pendingDrivers=async ()=>{
        try {
            const driverData=await Driver.find({account_status:"Pending"})
            return driverData
        } catch (error) {
            console.log(error);
            return (error as Error).message;

        }
    }
    verifiedDrivers=async ()=>{
        try {
            const driverData=await Driver.find({account_status:{ $nin: ["Pending", "Rejected", "Blocked"] } })
            return driverData
        } catch (error) {
            console.log(error);
            return (error as Error).message;

        }
    }
    blockedDrivers=async ()=>{
        try {
            const driverData=await Driver.find({account_status:"Blocked"})
            return driverData
        } catch (error) {
            console.log(error);
            return (error as Error).message;

        }
    }
    driverData=async (data:id)=>{
        try {
            const {id}=data
            const driverData=await Driver.findById(id)            
            return driverData
        } catch (error) {
            console.log(error);
            return (error as Error).message;

        }
    }
    verifyDriver=async (data:id)=>{
        try {
            const {id}=data
            const driverData=await Driver.findByIdAndUpdate(
                id,
                {
                    $set:{
                        account_status:"Good"
                    }
                },{
                    new:true
                }
            )
           
            return driverData
        } catch (error) {
            console.log(error);
            return (error as Error).message;

        }
    }
    rejectDriver=async (data:id)=>{
        try {
            const {id}=data
            const driverData=await Driver.findByIdAndUpdate(
                id,
                {
                    $set:{
                        account_status:"Rejected"
                    }
                },{
                    new:true
                }
            )
           
            return driverData
        } catch (error) {
            console.log(error);
            return (error as Error).message;

        }
    }
    updateDriverStatus=async (data:UpdateDriverStatusData)=>{
        try {
            let newStatus;
            const {reason,status,id}=data
            if(status=="Block")newStatus="Blocked"
            else newStatus=status
            
            const driverData=await Driver.findByIdAndUpdate(
                id,
                {
                    $set:{
                        account_status:newStatus
                    }
                },
                {
                    new:true
                }
            )
           
            return driverData
        } catch (error) {
            console.log(error);
            return (error as Error).message;

        }
    }

    dashboardData=async ()=>{
        try {
            const response = await Driver.aggregate([
                {
                  $group: {
                    _id: { $month: "$joiningDate" },
                    driverCount: { $sum: 1 },
                  },
                },
                {
                  $project: {
                    _id: 0,
                    month: "$_id",
                    driverCount: 1,
                  },
                },
                {
                  $sort: { month: 1 },
                },
              ]).exec();
              
              const [pendingDrivers, blockedDrivers, totalDrivers] = await Promise.all([
                Driver.find({ account_status: "Pending" }).count(),
                Driver.find({ account_status: "Blocked" }).count(),
                Driver.find().count()
              ]);
              
           
            return({response,pendingDrivers,blockedDrivers,totalDrivers})
        } catch (error) {
            console.log(error);
            return (error as Error).message;

        }
    }
    
}