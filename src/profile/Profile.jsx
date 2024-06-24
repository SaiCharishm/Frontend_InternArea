import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../Feature/Userslice';

const Profile = () => {
  const [history, setHistory] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchHistory = async () => {
      if (user && user.uid) {
        try {
          const response = await axios.get(`http://localhost:7480/api/login-history/${user.uid}`);
          setHistory(response.data);
        } catch (error) {
          console.error('Error fetching login history:', error);
        }
      }
    };

    fetchHistory();
  }, [user]);

  if (!user) {
    return <div>Loading...</div>; // Show loading state if user data is not available
  }

  return (
    <div>
      <div className="flex items-center mt-9 mb-4 justify-center">
        <div className="max-w-xs">
          <div className="bg-white shadow-lg rounded-lg py-3">
            <div className="photo-wrapper p-2">
              <img src={user.photo || 'default-photo-url.jpg'} alt="User Profile" className="w-32 h-32 rounded-full mx-auto" />
            </div>
            <div className="p-2">
              <h3 className="text-center text-xl text-gray-900">{user.name}</h3>
            </div>
            <div className="text-xs my-3">
              <h3 className="text-xl font-bold">UID</h3>
              <h3 className="text-center text-lg text-gray-900">{user.uid}</h3>
            </div>
            <div>
              <h3 className="text-xl font-bold">Email</h3>
              <h3 className="text-center text-xl text-gray-900">{user.email}</h3>
            </div>
            <div className="flex justify-center mt-3">
              <Link to="/userapplication" className="relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group">
                <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">View Applications</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-6">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg py-3">
          <h2 className="text-center text-xl font-bold mb-4">Login History</h2>
          <ul>
            {history.map((entry, index) => (
              <li key={index} className="mb-2">
                {new Date(entry.timestamp).toLocaleString()} - {entry.browser || 'Unknown'} - {entry.operatingSystem || 'Unknown'} - {entry.deviceType || 'Unknown'} - {entry.ipAddress || 'Unknown'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
