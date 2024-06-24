// App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './Feature/Userslice';
import { auth } from './firebase/firebase';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './Components/Navbar/LanguageSwitcher';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Navbar/Sidebar'; 
import Footer from './Components/Footerr/Footer';
import Home from './Components/Home/Home';
import Register from './Components/auth/Register';
import Intern from './Components/Internships/intern';
import JobAvl from './Components/Job/JobAvl';
import JobDetail from './Components/Job/JobDetail';
import InternDeatil from './Components/Internships/InternDeatil';
import Profile from './profile/Profile';
import AdminLogin from './Admin/AdminLogin';
import Adminpanel from './Admin/Adminpanel';
import ViewAllApplication from './Admin/ViewAllApplication';
import Postinternships from './Admin/Postinternships';
import DeatilApplication from './Applications/DeatilApplication';
import UserApplicatiom from './profile/UserApplicatiom';
import UserapplicationDetail from './Applications/DeatilApplicationUser';
import Login from './Components/Login/Login';
import OTPVerification from './Components/Login/OTPVerification';
import LoginHistory from './Components/Login/LoginHistory';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [otpRequired, setOtpRequired] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            name: authUser.displayName,
            email: authUser.email,
            phoneNumber: authUser.phoneNumber,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <LanguageSwitcher />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/internship" element={<Intern />} />
        <Route path="/Jobs" element={<JobAvl />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detailjob" element={<JobDetail />} />
        <Route path="/detailInternship" element={<InternDeatil />} />
        <Route path="/detailApplication" element={<DeatilApplication />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminpanel" element={<Adminpanel />} />
        <Route path="/postInternship" element={<Postinternships />} />
        <Route path="/applications" element={<ViewAllApplication />} />
        <Route path="/UserapplicationDetail" element={<UserapplicationDetail />} />
        <Route path="/userapplication" element={<UserApplicatiom />} />
        <Route path="/login" element={!otpRequired ? <Login setOtpRequired={setOtpRequired} /> : <OTPVerification />} />
        <Route path="/login-history" component={LoginHistory} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
