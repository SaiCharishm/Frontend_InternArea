// Footer.jsx

import React from 'react';
import i18n from '../../i18n'; // Adjust path as needed

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white">
        <div className="container px-6 py-12 mx-auto">
          <div className="grid grid-cols-2 gap-6 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            <div>
              <h3 className="text-sm font-bold">{i18n.t('footer.internshipByPlaces')}</h3>
              <div className="flex flex-col items-start mt-4 space-y-4">
                <p className="transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">New York</p>
                <p className="transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">Los Angeles</p>
                {/* Add more locations */}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold">{i18n.t('footer.internshipByStream')}</h3>
              <div className="flex flex-col items-start mt-4 space-y-4">
                <p className="transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">About us</p>
                <p className="transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">Careers</p>
                {/* Add more streams */}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold">{i18n.t('footer.jobPlaces')}</h3>
              <div className="flex flex-col items-start mt-4 space-y-4">
                <a href="/" className="transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">Blog</a>
                <a href="/" className="transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">Newsletter</a>
                {/* Add more job places */}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold">{i18n.t('footer.jobsByStreams')}</h3>
              <div className="flex flex-col items-start mt-4 space-y-4">
                <a href="/" className="transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">Startups</a>
                <a href="/" className="transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">Enterprise</a>
                {/* Add more streams */}
              </div>
            </div>

            {/* More sections as needed */}

          </div>

          <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700"/>

          <div className="flex flex-col items-center justify-between sm:flex-row">
            <p className='border-white' >
              <i className="bi bi-google-play text-black"></i> {i18n.t('footer.getAndroidApp')}
            </p>
            <div className="social-icons">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
            </div>
            <p className="mt-4 text-sm sm:mt-0 dark">{i18n.t('footer.copyright')} {new Date().getFullYear()}. {i18n.t('footer.allRightsReserved')}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
