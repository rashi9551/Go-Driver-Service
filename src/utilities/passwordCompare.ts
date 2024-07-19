import bcryptjs from 'bcryptjs'

export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    try {
      const isMatch = await bcryptjs.compare(plainPassword, hashedPassword);
      return isMatch; // Returns true if passwords match, false otherwise
    } catch (error) {
      console.error('Error comparing passwords:', error);
      throw error;
    }
  };