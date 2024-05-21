import { Router, Request, Response } from "express";
import adminController from "../controllers/adminController";
import auth from "../../middleware/auth";

const adminRoute=Router()

adminRoute.get('/pendingDrivers',auth.verifyToken,adminController.pendingDrivers)
adminRoute.get('/verifiedDrivers',auth.verifyToken,adminController.verifiedDrivers)
adminRoute.get('/blockedDrivers',auth.verifyToken,adminController.blockedDrivers)
adminRoute.get('/driverData',auth.verifyToken,adminController.driverData)
adminRoute.post('/verifiedUser',auth.verifyToken,adminController.verifiedUser)
adminRoute.post('/rejectDriver',auth.verifyToken,adminController.rejectDriver)
adminRoute.post('/updateDriverStatus',auth.verifyToken,adminController.updateDriverStatus)

export default adminRoute