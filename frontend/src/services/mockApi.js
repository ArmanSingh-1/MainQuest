/**
 * Mock API — Simulates backend services for ARKA PWA.
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendOtp = async (contact) => {
  await delay(1200);
  console.log(`OTP sent to: ${contact}`);
  return { success: true, message: 'OTP sent successfully (123456)' };
};

export const verifyOtp = async (contact, otp) => {
  await delay(1000);
  if (otp === '123456') {
    // Check if "existing" user for demo
    const isExisting = contact === '9876543210' || contact === 'test@example.com';
    return {
      success: true,
      user: {
        contact,
        isNewUser: !isExisting,
        profileCompleted: isExisting,
        city: isExisting ? 'Mumbai' : '',
        platforms: isExisting ? ['Swiggy', 'Zomato'] : [],
      }
    };
  }
  throw new Error('Invalid OTP. Please try again.');
};

export const saveProfile = async (profileData) => {
  await delay(1500);
  return { success: true, message: 'Profile updated successfully' };
};
