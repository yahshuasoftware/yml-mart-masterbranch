import React, { useState } from "react";
import SignInScreen from "./signUpScreens/SignInScreen";
import OtpVerificationScreen from "./signUpScreens/OtpVerificationScreen";
import UserInfoScreen from "./signUpScreens/UserInfoScreen";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");

  const handleContinue = (enteredMobileNumber) => {
    setMobileNumber(enteredMobileNumber);
    setStep(2); // Move to OTP verification screen
  };

  const handleOtpVerified = () => {
    setStep(3); // Move to user information screen
  };

  const handleCompleteProfile = (userInfo) => {
    // Handle final user information and log in the user
    console.log("User info:", userInfo);
    // After success, redirect to the app dashboard or login
  };

  const handleChangeNumber = () => {
    setStep(1); // Go back to sign-in screen
  };

  return (
    <div>
      {step === 1 && <SignInScreen onContinue={handleContinue} />}
      {step === 2 && (
        <OtpVerificationScreen
          mobileNumber={mobileNumber}
          onChangeNumber={handleChangeNumber}
          onOtpVerified={handleOtpVerified}
        />
      )}
      {step === 3 && <UserInfoScreen onCompleteProfile={handleCompleteProfile} />}
    </div>
  );
};

export default SignUp;
