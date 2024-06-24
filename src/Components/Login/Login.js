import React from 'react';
import { auth, provider } from '../../firebase/firebase'; // Adjust this path based on your directory structure
import { signInWithPopup } from 'firebase/auth';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook for translation

const Login = () => {
  const { t } = useTranslation(); // Hook to access translation function

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Successful sign-in
        console.log(t('login.userSignedIn', { userName: result.user.displayName }));
        // Optionally, you can redirect to another page or update state to reflect the signed-in status
      })
      .catch((error) => {
        // Handle Errors here.
        console.error(t('login.signInError', { error: error.message }));
        // Optionally, display an error message to the user
      });
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>{t('login.signInWithGoogle')}</button>
    </div>
  );
};

export default Login;
