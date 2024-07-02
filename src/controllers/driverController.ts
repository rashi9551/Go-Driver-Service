import moment from "moment";
import registrationUseCases from "../useCases/registration";
import { ObjectId } from "mongodb";
import { DriverInterface } from "../entities/driver";
import { RidePayment } from "../utilities/interface";
import dirverUseCase from "../useCases/driverUseCase";

const registrationUseCase=new registrationUseCases()
const dirverUseCases=new dirverUseCase()

export default class driverControl{
    getData=async(data:any)=>{
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
                return({ message: "Soemthing Internal Error" });
            }
            
        } catch (error) {
            console.log(error);
            
        }
        
    }

    profileUpdate=async(data:any)=>{
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
    updateStatus=async(data:any)=>{
        try {
            const response=await dirverUseCases.updateStatus(data.driver_id)
            console.log(response);      
            return(response);
            
        } catch (error) {
            console.log(error);
            
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

}