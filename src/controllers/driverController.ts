import moment from "moment";
import { DriverInterface } from "../entities/driver";
import { RidePayment, driverData, feedback, redeem, report } from "../utilities/interface";
import dirverUseCase from "../useCases/driverUseCase";

const dirverUseCases=new dirverUseCase()

export default class driverControl{
    getData=async(data:{driver_id:string})=>{
        try {
            const {driver_id}=data
            const driverData=await dirverUseCases.getDriverData(driver_id) as DriverInterface
            if (driverData?.name) {
                
                const formattedDate = moment(Number(driverData.joiningDate)).format("dddd, DD-MM-YYYY");
                const formattedDriverData = { ...driverData?.toObject(), formattedDate };
                const formattedFeedbacks = formattedDriverData?.feedbacks.map((feedbacks:any) => ({
                    ...feedbacks,
                    formattedDate: moment(feedbacks.date).format("DD-MM-YYYY"),
                }));
                const newData = { ...formattedDriverData, formattedFeedbacks };
                return(newData);
            } else {
                return({ message: "Soemthing Internal Error"});
            }
        } catch (error) {
            console.log(error);
            
        }
        
    }

    profileUpdate=async(data:driverData)=>{
        try {
            const driverDatas=await dirverUseCases.profileUpdate(data) as DriverInterface
            if (driverDatas?.name) {
                const formattedDate = moment(Number(driverDatas.joiningDate)).format("dddd, DD-MM-YYYY");
                const formattedDriverData = { ...driverDatas?.toObject(), formattedDate };
                const formattedFeedbacks = formattedDriverData?.feedbacks.map((feedbacks:any) => ({
                    ...feedbacks,
                    formattedDate: moment(feedbacks.date).format("DD-MM-YYYY"),
                }));
                const driverData = { ...formattedDriverData, formattedFeedbacks };
                const message="Success"
                return({driverData,message});
            } else {
                return({ message: "Soemthing Internal Error" });
            }
            
        } catch (error) {
            console.log(error);
            
        }
        
    }
    updateStatus=async(data:{driver_id:string}):Promise<DriverInterface|String>=>{
        try {
            const response :DriverInterface=await dirverUseCases.updateStatus(data.driver_id) as DriverInterface
            console.log(response);      
            return(response);
        } catch (error) {
            console.log(error);
            throw new Error((error as Error).message)

        }
       
        
    }
    rideCompleteUpdate=async(data:RidePayment)=>{
        try {
            const response=await dirverUseCases.rideCompleteUpdate(data)
            console.log(response);      
            return(response);
        } catch (error) {
            console.log(error);
        }    
    }

    feedback=async(data:feedback)=>{
        try {
            const response=await dirverUseCases.feedback(data)
            console.log(response);      
            return(response);           
        } catch (error) {
            console.log(error);
            
        }
    }
    report=async(data:report)=>{
        try {
            console.log(data,"=-=-=-=-=-=-");
            
            const response=await dirverUseCases.report(data)
            console.log(response);      
            return(response);           
        } catch (error) {
            console.log(error);
            
        }
    }

    redeemWalletRazorpay=async(data:redeem)=>{
        try {
            const response=await dirverUseCases.redeemWalletRazorpay(data)
            console.log(response);      
            return(response);           
        } catch (error) {
            console.log(error);
            
        }
    }

}