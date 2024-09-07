import { createClient } from 'redis'; 
import 'dotenv'

// Initialize Redis client
const client = createClient({
    url: process.env.REDIS_URL // Use redis-service as the hostname
  });
// client.on('error', (err) => {
//     console.error('Redis Client Error', err);
// });
// client.connect().catch(console.error);

// Set OTP and email in Redis with an expiration time
export const otpSetData = async (email: string, otp: string): Promise<void> => {
    try {
        // Set OTP with email in Redis hash
        await Promise.all([
            client.hSet(`user:${email}`, { otp }),
            client.expire(`user:${email}`, 300)  // 300 seconds (5 minutes) expiration
        ]);
        console.log("OTP set for user:", email);
    } catch (error) {
        console.log("Error setting OTP:", error);
    }
}

// Retrieve OTP and email from Redis
export const getOtpByEmail = async (email: string): Promise<string | null> => {
    try {
        // Get OTP from Redis by email
        const userData = await client.hGetAll(`user:${email}`);
        
        if (!userData.otp) {
            console.log("No OTP found for this email");
            return null; // Return null if no OTP is found
        }
        
        return userData.otp;  // Return the OTP
    } catch (error) {
        console.error('Error retrieving OTP:', error);
        return null;
    }
}
