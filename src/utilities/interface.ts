import mongodb from "mongodb";


export interface Message {
    message: string ;
  }

export interface RidePayment {
    paymentMode: string;
    userId: string;
    rideId: string;
    amount: number;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    driver_id:string;
    driverId:string
  }

  export interface driverData{
    name:string,
    email:string,
    mobile:number,
    driver_id:string
}
  export interface feedback{
    ride_id:string,
    rating:string,
    feedback:string,
    driver_id:string,
    date:string
}
  export interface report{
    ride_id:string,
    reason:string,
    driver_id:string,
    date:string
}


export interface DriverData{
  name:string,
  email:string,
  mobile:number,
  password:string,
  reffered_code:string,
}



export interface identification {
  driverId: mongodb.ObjectId;
  aadharID: string;
  licenseID: string;
  licenseImageUrl: string;
  aadharImageUrl: string;
}

export interface Identification {
  driverId: mongodb.ObjectId;
  aadharID: string;
  licenseID: string;
  aadharImageUrl: string;
  licenseImageUrl: string;
}

export interface Registration {
  name: string;
  email: string;
  mobile: number;
  password: string;
  referral_code: string;
}
export interface driverImage{
  driverId:mongodb.ObjectId,
  driverImageUrl:string,
}
export interface DriverImage{
  driverId:mongodb.ObjectId,
  imageUrl: string;
}
export interface vehicleDatas{
  registerationID:string,
  model:string,
  driverId:mongodb.ObjectId,
  rcImageUrl:string,
  carImageUrl:string
}

export interface locationData{
  driverId:mongodb.ObjectId,
  latitude:number,
  longitude:number
}
export interface id{
  id:string,
  reason:string
}
export interface redeem{
  balance:string,
  driver_id:string,
  upiId:string,
}

export interface UpdateDriverStatusData {
  reason: string;
  status: string;
  id: string;
}

export interface AuthResponse {
  message: string;
  name: string;
  refreshToken: string;
  token: string;
  _id: string;
}

