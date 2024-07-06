import adminUseCases from "../useCases/adminUseCase";
import { id, UpdateDriverStatusData } from "../utilities/interface";

const adminUseCase=new adminUseCases()

export default class adminController {
    pendingDrivers=async()=>{
        try {
            const response=await adminUseCase.pendingDrivers()
            return(response)
        } catch (error) {
           console.log(error );
            return(error)
        }
        
    }
    verifiedDrivers=async()=>{
        try {
            const response=await adminUseCase.verifiedDrivers()
            return(response)
        } catch (error) {
            console.log(error);
            return(error)
        }
    }
    blockedDrivers=async()=>{
        try {
            const response=await adminUseCase.blockedDrivers()
            return(response)
        } catch (error) {
            console.log(error);
            return(error)
        }
    }
    driverData=async(data:id)=>{
        try {
            const response=await adminUseCase.driverData(data)
            return(response);
        } catch (error) {
            console.log(error);
            return(error)
        }
    }
    verifyDriver= async(data:id) =>{
        try {
            const response=await adminUseCase.verifyDriver(data)
            return(response);
        } catch (error) {
            console.log(error);
            return((error as Error).message);
        }
    }
    rejectDriver= async(data:{id:string,reason:string})=>{
        try {
            const response=await adminUseCase.rejectDriver(data)
            return(response);
        } catch (error) {
            console.log(error);
            return((error as Error).message);
        }
    }
    updateDriverStatus=async(data:UpdateDriverStatusData)=>{
        try {
            const response=await adminUseCase.updateDriverStatus(data)
            return(response);
        } catch (error) {
            return(error);
        }
    }
    dashboardData=async()=>{
        try {
            const response=await adminUseCase.dashboardData()
            return(response);
        } catch (error) {
            console.log(error);
            return(error)
        }
    }

}