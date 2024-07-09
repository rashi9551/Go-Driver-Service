import { DriverInterface } from "../entities/driver";
import adminUseCases from "../useCases/adminUseCase";
import { id, UpdateDriverStatusData } from "../utilities/interface";

const adminUseCase=new adminUseCases()

export default class adminController {
    pendingDrivers=async():Promise<DriverInterface|String>=>{
        try {
            const response:DriverInterface=await adminUseCase.pendingDrivers() as DriverInterface
            return(response)
        } catch (error) {
           console.log(error );
           throw new Error((error as Error).message)
        }
        
    }
    verifiedDrivers=async():Promise<DriverInterface|String |{}>=>{
        try {
            const response :DriverInterface=await adminUseCase.verifiedDrivers() as DriverInterface
            return(response)
        } catch (error) {
            console.log(error);
            throw new Error((error as Error).message)
        }
    }
    blockedDrivers=async():Promise<DriverInterface|String>=>{
        try {
            const response:DriverInterface=await adminUseCase.blockedDrivers() as DriverInterface
            return(response)
        } catch (error) {
            console.log(error);
            throw new Error((error as Error).message)
        }
    }
    driverData=async(data:id):Promise<DriverInterface|String>=>{
        try {
            const response:DriverInterface=await adminUseCase.driverData(data)as DriverInterface
            return(response);
        } catch (error) {
            console.log(error);
            throw new Error((error as Error).message)
        }
    }
    verifyDriver= async(data:id):Promise<DriverInterface|String |{}> =>{
        try {
            const response:DriverInterface | {}=await adminUseCase.verifyDriver(data) as DriverInterface|{}
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