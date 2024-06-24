import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoginHistory, updateLoginHistory } from '../../Feature/Userslice'; // Adjust the path as per your project structure
import { useTranslation } from 'react-i18next'; // Import useTranslation hook for translation

const LoginHistory = () => {
  const { t } = useTranslation(); // Hook to access translation function
  const dispatch = useDispatch();
  const loginHistory = useSelector(selectLoginHistory);

  // Fetch login history on component mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:7480/api/login-history');
        dispatch(updateLoginHistory(response.data)); // Update Redux state with fetched data
      } catch (error) {
        console.error('Error fetching login history:', error);
      }
    };

    fetchHistory();
  }, [dispatch]);

  return (
    <div>
      <h2>{t('loginHistory.title')}</h2>
      <ul>
        {loginHistory.map((entry) => (
          <li key={entry.timestamp}>
            {new Date(entry.timestamp).toLocaleString()} - {entry.browser} - {entry.os} - {entry.deviceType} - {entry.ipAddress}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoginHistory;
