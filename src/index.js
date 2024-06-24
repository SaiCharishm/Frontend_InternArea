import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import LanguageSwitcher from './Components/Navbar/LanguageSwitcher';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
      <LanguageSwitcher />
        <BrowserRouter>
            <App />
        </BrowserRouter>
   
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

