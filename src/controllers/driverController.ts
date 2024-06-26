import moment from "moment";
import registrationUseCases from "../useCases/registration";
import { ObjectId } from "mongodb";
import { DriverInterface } from "../entities/driver";

const registrationUseCase=new registrationUseCases()

export default class driverControl{
    getData=async(data:any)=>{
        try {
            const {driver_id}=data
            const driverData=await registrationUseCase.getDriverData(driver_id) as DriverInterface
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
            const driverDatas=await registrationUseCase.profileUpdate(data) as DriverInterface
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
            const response=await registrationUseCase.updateStatus(data.driver_id)
            console.log(response);      
            return(response);
            
        } catch (error) {
            console.log(error);
            
        }
       
        
    }

}