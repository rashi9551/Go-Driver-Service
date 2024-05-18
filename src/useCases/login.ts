import driverRepo from "../repositories/driverRepo";
import auth from "../middleware/auth";
import { DriverInterface } from "../entities/driver";



export default{
    loginCheckDriver: async (mobile: number) => {
        const response = await driverRepo.findDriver(mobile) as DriverInterface
        if (response) {
            console.log(response)
            if (                
                response.account_status !== "Pending" &&
                response.account_status !== "Rejected" &&
                response.account_status !== "Blocked"
                ) {
                const token = await auth.createToken(response._id.toString());
                return { message: "Success", name: response.name, token, _id:response._id };
            } else if (response.account_status === "Rejected") {
                return { message: "Rejected", driverId:response._id };
            } else if (response.account_status === "Blocked") {
                return { message: "Blocked" };
            } else if (!response.identification) {
                return { message: "Incomplete registration", driverId:response._id };
            } else {
                return { message: "Not verified" };
            }
        } else return { message: "No user found" };
    }

}