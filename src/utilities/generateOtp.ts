const generateOTP = (): string => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
};

export default generateOTP