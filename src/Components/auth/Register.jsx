import axios from 'axios';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, provider } from '../../firebase/firebase';
import './register.css';
import { useTranslation } from 'react-i18next'; 

function Register() {
  const { t } = useTranslation(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!email || !password || !fname || !lname) {
      toast.error(t('register.fillAllFields'));
      return; 
    }

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return axios.post('http://localhost:7480/api/register', {
          name: `${fname} ${lname}`,
          email: email,
          uid: user.uid,
        });
      })
      .then((response) => {
        setLoading(false);
        if (response.data.message === 'User registered successfully') {
          toast.success(t('register.signupSuccess'));
          navigate('/'); // Redirect to home page after signup
        } else {
          toast.error(t('register.signupError'));
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error registering user:', error);
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        return axios.post('http://localhost:7480/api/register', {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      })
      .then((response) => {
        setLoading(false);
        if (response.data.message === 'User registered successfully') {
          toast.success(t('register.signupSuccess'));
          navigate('/'); // Redirect to home page after signup
        } else {
          toast.error(t('register.signupError'));
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error signing in with Google:', error.message);
        toast.error(error.message);
      });
  };

  return (
    <div>
      <div className="form">
        <h1>{t('register.signupTitle')}</h1>
        <p className="para3">{t('register.companyCount')}</p>
        <div className="regi">
          <div className="py-6">
            <div className="flex bg-white rounded-lg justify-center shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
              <div className="w-full p-8 lg:w-1/2">
                <div className="mt-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    {t('register.emailLabel')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    id="email"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                    {t('register.passwordLabel')}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    id="password"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <label htmlFor="Fname" className="block text-gray-700 text-sm font-bold mb-2">
                      {t('register.firstNameLabel')}
                    </label>
                    <input
                      type="text"
                      className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      id="Fname"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </div>
                  <div className="ml-5">
                    <label htmlFor="Lname" className="block text-gray-700 text-sm font-bold mb-2">
                      {t('register.lastNameLabel')}
                    </label>
                    <input
                      type="text"
                      className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      id="Lname"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                    />
                  </div>
                </div>
                <small>
                  {t('register.agreeTerms')} <span className="text-blue-400">{t('register.termsLink')}</span>.
                </small>
                <button
                  className="bg-blue-500 h-9 text-white font-bold py-2 mt-4 px-4 w-full rounded hover:bg-blue-600"
                  onClick={handleSignup}
                  disabled={loading}
                >
                  {loading ? t('register.signingUp') : t('register.signUp')}
                </button>
                <p className="mt-2 text-center text-sm">
                  {t('register.alreadyRegistered')} <span className="text-blue-400 cursor-pointer">{t('register.login')}</span>
                </p>
                {/* Google Sign-In Button */}
                <button
                  className="bg-red-500 h-9 text-white font-bold py-2 mt-4 px-4 w-full rounded hover:bg-red-600"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  {loading ? t('register.signingUp') : t('register.signUpWithGoogle')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
