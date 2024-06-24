import React, { useEffect, useState } from 'react';
import logo from '../../Assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../../firebase/firebase'; // Ensure your Firebase configuration is correctly imported
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, login, logout } from '../../Feature/Userslice';
import axios from 'axios';
import './navbar.css';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [loginHistory, setLoginHistory] = useState([]);
  const [showLoginHistory, setShowLoginHistory] = useState(false);
  const [isDivVisibleForintern, setDivVisibleForintern] = useState(false);
  const [isDivVisibleForJob, setDivVisibleForJob] = useState(false);
  const [isDivVisibleForProfile, setDivVisibleProfile] = useState(false);
  const [language, setLanguage] = useState(i18n.language);
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);
  const [isOtpSectionVisible, setIsOtpSectionVisible] = useState(false);

  useEffect(() => {
    if (user) {
      fetchLoginHistory();
    }
  }, [user]);

  const fetchLoginHistory = async () => {
    try {
      const response = await axios.get('http://localhost:7480/api/login-history'); // Replace with your backend API endpoint
      setLoginHistory(response.data);
    } catch (error) {
      console.error('Error fetching login history:', error);
    }
  };

  const toggleLoginHistory = () => {
    setShowLoginHistory(!showLoginHistory);
  };

  const loginFunction = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(login({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        }));
        console.log('User signed in: ', user);
      })
      .catch((error) => {
        console.error('Error during sign-in: ', error);
      });
  };

  const logoutFunction = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        navigate('/');
      })
      .catch((error) => {
        console.error('Error during sign-out: ', error);
      });
  };

  const onLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    setIsVerificationVisible(true);
    setIsOtpSectionVisible(false);
    document.body.style.backgroundColor = getBackgroundColor(selectedLanguage);
  };

  const getBackgroundColor = (lang) => {
    switch (lang) {
      case 'hi':
        return 'blue';
      case 'zh':
        return 'green';
      case 'fr':
        return 'yellow';
      default:
        return 'white';
    }
  };

  const loadContentInSelectedLanguage = () => {
    i18n.changeLanguage(language);
    console.log('Loading content in the selected language');
    // Add your logic to load content in the selected language here
  };

  const sendOTP = () => {
    const payload = language === 'fr' ? { email: contact } : { mobile: contact };

    fetch('http://localhost:7480/api/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'OTP sent successfully') {
          alert(`OTP sent to ${contact}`);
          setIsOtpSectionVisible(true);
        } else {
          alert('Failed to send OTP');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  const verifyOTP = () => {
    fetch('http://localhost:7480/api/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contact, otp }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('OTP verified');
          loadContentInSelectedLanguage();
        } else {
          alert('Failed to verify OTP');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  const showtheProfile = () => {
    setDivVisibleProfile(true);
    document.getElementById('ico3').className = 'bi bi-caret-up-fill';
  };

  const hidetheProfile = () => {
    document.getElementById('ico3').className = 'bi bi-caret-down-fill';
    setDivVisibleProfile(false);
  };

  const showInternShips = () => {
    document.getElementById('ico').className = 'bi bi-caret-up-fill';
    setDivVisibleForintern(true);
  };

  const hideInternShips = () => {
    document.getElementById('ico').className = 'bi bi-caret-down-fill';
    setDivVisibleForintern(false);
  };

  const showJobs = () => {
    document.getElementById('ico2').className = 'bi bi-caret-up-fill';
    setDivVisibleForJob(true);
  };

  const hideJobs = () => {
    document.getElementById('ico2').className = 'bi bi-caret-down-fill';
    setDivVisibleForJob(false);
  };

  return (
    <div>
      <nav className='nav1'>
        <ul>
          <div className="img">
            <Link to={"/"}><img src={logo} alt="" /></Link>
          </div>
          <div className="elem">
            <Link to={"/Internship"}>
              <p id='int' onMouseEnter={showInternShips}>{t('navbar.internships')} <i onClick={hideInternShips} id='ico' className="bi bi-caret-down-fill"></i></p>
            </Link>
            <Link to={"/Jobs"}>
              <p onMouseEnter={showJobs}>{t('navbar.jobs')} <i className="bi bi-caret-down-fill" id='ico2' onClick={hideJobs}></i></p>
            </Link>
          </div>
          <div className="search">
            <i className="bi bi-search"></i>
            <input type="text" placeholder={t('common.searchPlaceholder')} />
          </div>
          {user ? (
            <>
              <div className='Profile'>
                <Link to={"/profile"}>
                  <img src={user?.photo} alt="" onMouseEnter={showtheProfile} className='rounded-full w-12' id='picpro' />
                  <i className='bi bi-caret-up-fill' id='ico3' onClick={hidetheProfile}></i>
                </Link>
              </div>
              <button className='bt-log' id='bt' onClick={logoutFunction}>{t('navbar.logout')} <i className="bi bi-box-arrow-right"></i></button>
              <button onClick={toggleLoginHistory}>{t('navbar.loginHistory')}</button>
            </>
          ) : (
            <>
              <div className="auth">
                <button className='btn1' onClick={loginFunction}>{t('navbar.loginWithGoogle')}</button>
                <button className='btn2'><Link to="/register">{t('navbar.register')}</Link></button>
              </div>
              <div className="flex mt-7 hire">{t('navbar.hireTalent')}</div>
              <div className="admin">
                <Link to={"/adminLogin"}>
                  <button>{t('navbar.admin')}</button>
                </Link>
              </div>
            </>
          )}
        </ul>
      </nav>

      {isDivVisibleForintern && (
        <div className="profile-dropdown-2">
          <div className="left-section">
            <p>{t('navbar.topLocations')}</p>
            <p>{t('navbar.profile')}</p>
            <p>{t('navbar.topCategory')}</p>
            <p>{t('navbar.exploreMoreInternships')}</p>
          </div>
          <div className="line flex bg-slate-400"></div>
          <div className="right-section">
            <p>{t('navbar.internAtIndia')}</p>
            <p>{t('navbar.internAtIndia')}</p>
            <p>{t('navbar.internAtIndia')}</p>
            <p>{t('navbar.internAtIndia')}</p>
            <p>{t('navbar.internAtIndia')}</p>
          </div>
        </div>
      )}
      {isDivVisibleForJob && (
        <div className="profile-dropdown-2">
          <div className="left-section">
            <p>{t('navbar.topLocations')}</p>
            <p>{t('navbar.profile')}</p>
            <p>{t('navbar.topCategory')}</p>
            <p>{t('navbar.exploreMoreJobs')}</p>
          </div>
          <div className="line flex bg-slate-400"></div>
          <div className="right-section">
            <p>{t('navbar.internAtIndia')}</p>
            <p>{t('navbar.internAtIndia')}</p>
            <p>{t('navbar.internAtIndia')}</p>
            <p>{t('navbar.internAtIndia')}</p>
            <p>{t('navbar.internAtIndia')}</p>
          </div>
        </div>
      )}
      {isDivVisibleForProfile && (
        <div className="profile-dropdown">
          <ul>
            <li><Link to="/profile">{t('navbar.viewProfile')}</Link></li>
            <li><Link to="/editProfile">{t('navbar.editProfile')}</Link></li>
          </ul>
        </div>
      )}
      <div>
        <label htmlFor="language">{t('navbar.selectLanguage')}:</label>
        <select id="language" value={language} onChange={onLanguageChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="hi">Hindi</option>
          <option value="pt">Portuguese</option>
          <option value="zh">Chinese</option>
          <option value="fr">French</option>
        </select>
      </div>
      <div>
        {isVerificationVisible && (
          <div>
            <p>{t('navbar.enterContact')}</p>
            <input
              type="text"
              placeholder={t('navbar.enterContactPlaceholder')}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <button onClick={sendOTP}>{t('navbar.sendOTP')}</button>
            {isOtpSectionVisible && (
              <>
                <p>{t('navbar.enterOtp')}</p>
                <input
                  type="text"
                  placeholder={t('navbar.enterOtpPlaceholder')}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button onClick={verifyOTP}>{t('navbar.verifyOTP')}</button>
              </>
            )}
          </div>
        )}
      </div>

      {showLoginHistory && (
        <div className="login-history-dropdown">
          <h3>{t('navbar.loginHistory')}</h3>
          <ul>
            {loginHistory.map((entry) => (
              <li key={entry._id}>
                <p>{new Date(entry.loginTime).toLocaleString()} - {entry.browserType} - {entry.osType}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
