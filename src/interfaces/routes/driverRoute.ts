import { Router, Request, Response } from "express";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";
import upload from "../../middleware/multer";

const driverRouter = Router();

driverRouter.post("/registerDriver", registerController.register);
driverRouter.post("/checkLoginDriver", loginController.checkLogin);
driverRouter.post("/checkDriver", registerController.checkDriver);
driverRouter.post("/location", registerController.location);
driverRouter.post(
  "/identification",
  upload.fields([
    { name: "aadharImage", maxCount: 1 },
    { name: "licenseImage", maxCount: 1 },
  ]),
  registerController.identificationUpdate
);
driverRouter.post(
  "/uploadDriverImage",
  upload.single("driverImage"),
  registerController.updateDriverImage
);
driverRouter.post(
  "/vehicleDetails",
  upload.fields([
    { name: "carImage", maxCount: 1 },
    { name: "rcImage", maxCount: 1 },
  ]),
  registerController.vehicleUpdate
);



export default driverRouter;
