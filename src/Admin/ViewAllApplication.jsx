import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./admin.css";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ViewAllApplication() {
  const { t } = useTranslation();
  const [application, setApplication] = useState([]);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get("https:///localhost:7480/api/application");
        setApplication(response.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchApplication();
  }, []);

  console.log(application);
  return (
    <div>
      <div className='hide'>
        <h1 className='text-3xl font-semibold mt-3'>{t('adminPanel.totalApplications')}</h1>
        <div className="flex justify-center " id='tabel'>
          <div className="applications flex flex-col mt-7">
            <div className="overflow-x-auto sm:-mx-6 lg:mx-8">
              <table className="inline-block min-w-full text-left text-sm font-light">
                <thead className='border-b font-medium'>
                  <tr className='bg-gray-200'>
                    <th scope='col' className='px-5 py-4'>{t('adminPanel.company')}</th>
                    <th scope='col' className='px-5 py-4'>{t('adminPanel.category')}</th>
                    <th scope='col' className='px-5 py-4'>{t('adminPanel.appliedOn')}</th>
                    <th scope='col' className='px-5 py-4'>{t('adminPanel.appliedBy')}</th>
                    <th scope='col' className='px-5 py-4'>{t('adminPanel.viewDetail')}</th>
                    <th scope='col' className='px-5 py-4'>{t('adminPanel.applicationStatus')}</th>
                  </tr>
                </thead>
                <tbody>
                  {application.map((data) => (
                    <tr className='border-b' key={data._id}>
                      <td className='whitespace-nowrap px-6 py-4'>{data.company}</td>
                      <td className='whitespace-nowrap px-6 py-4'>{data.category}</td>
                      <td className='whitespace-nowrap px-6 py-4'>{new Date(data?.createAt).toLocaleDateString()}</td>
                      <td className='whitespace-nowrap px-6 py-4'>{data.user.name}</td>
                      <td className='whitespace-nowrap px-6 py-4'>
                        <Link to={`/detailApplication?a=${data._id}`}>
                          <i className="bi bi-envelope-open text-blue-500"></i>
                        </Link>
                      </td>
                      <td className='whitespace-nowrap px-6 py-4'>{data.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className='show'>
        <h1>{t('adminPanel.viewAllApplications')}</h1>
        {application.map((data) => (
          <section className="text-gray-600 body-font" key={data._id}>
            <div className="container px-5 py-2 mx-auto flex flex-wrap">
              <div className="flex flex-wrap -m-4">
                <div className="p-4 lg:w-1/2 md:w-full">
                  <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                    <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-3">{t('adminPanel.companyName')} {data.company}</h2>
                      <p className="leading-relaxed text-base">{t('adminPanel.appliedBy')} {data.user.name}</p>
                      <p className="leading-relaxed text-base">{t('adminPanel.appliedOn')} {new Date(data?.createAt).toLocaleDateString()}</p>
                      <p className="leading-relaxed text-base">{t('adminPanel.applicationStatus')} {data.status}</p>
                      <Link to={`/detailApplication?a=${data._id}`} className="mt-3 text-indigo-500 inline-flex items-center">
                        {t('adminPanel.viewInDetail')}
                        <i className="bi bi-chevron-compact-right text-blue-500"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default ViewAllApplication;
