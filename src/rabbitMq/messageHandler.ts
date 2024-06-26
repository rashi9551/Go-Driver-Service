import registerControl from "../controllers/registerController";
import loginControl from "../controllers/loginController";
import adminControl from "../controllers/adminController";
import driverControl from "../controllers/driverController";
import rabbitClient from "./client";

const driverController= new driverControl()
const adminController = new adminControl()
const loginController = new loginControl()
const registerController = new registerControl()

export default class MessageHandler {
  static async handle(
    operation: string,
    data: any,
    correlationId: string,
    replyTo: string
  ) {
    let response = data;
    console.log("The operation is", operation, data);

    switch (operation) {
      case "login-check":
        response=await loginController.checkLogin(data)
        break;

      case "google-login":
        console.log("vernnindu data",data);
        
        response=await loginController.checkGoogleLoginDriver(data)
        break;

      case "driver-register":
        response=await registerController.register(data)
        break;

      case "driver-check":
        response=await registerController.checkDriver(data)
        break;

      case "driver-location":
        response=await registerController.location(data)
        break;

      case "identification-update":
        response=await registerController.identificationUpdate(data)
        break;

        
      case "driver-image-update":
        response=await registerController.updateDriverImage(data)
        break;

      case "vehicle-image-update":
        response=await registerController.vehicleUpdate(data)
        break;

      case "driver-getData":
        response=await driverController.getData(data)
        break;

      case "profile-update":
        response=await driverController.profileUpdate(data)
        break;

      case "update-status":
        response=await driverController.updateStatus(data)
        break;

      case "admin-pending-drivers":
        response=await adminController.pendingDrivers()
        break;

      case "admin-verified-drivers":
        response=await adminController.verifiedDrivers()
        break;

      case "admin-blocked-drivers":
        response=await adminController.blockedDrivers()
        break;

      case "admin-get-driver-data":
        response=await adminController.driverData(data)
        break;

      case "admin-verify-driver":
        response=await adminController.verifyDriver(data)
        break;

      case "admin-reject-driver":
        response=await adminController.rejectDriver(data)
        break;

      case "admin-update-status-driver":
        response=await adminController.updateDriverStatus(data)
        break;

      default:
        response = "Request-key notfound";
        break;
    }

    //Produce the response back to the client
    await rabbitClient.produce(response, correlationId, replyTo);
  }
}
