import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../Feature/Userslice';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook for translation

const OTPVerification = () => {
  const { t } = useTranslation(); // Hook to access translation function
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:7480/api/verify-otp', { otp });
      if (response.data.success) {
        dispatch(login(response.data.user));
      } else {
        alert(t('otpVerification.invalidOTP')); // Display translated error message
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div>
      <h2>{t('otpVerification.title')}</h2>
      <input
        type="text"
        placeholder={t('otpVerification.enterOTP')}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>{t('otpVerification.verifyOTP')}</button>
    </div>
  );
};

export default OTPVerification;
