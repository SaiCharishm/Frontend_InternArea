import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook for translation
import compLogo from '../../Assets/netflix.png';
import './job.css';

function JobAvl() {
  const { t } = useTranslation(); // Hook to access translation function

  const [searchCategory, setSearchCategory] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [jobData, setJobData] = useState([]);
  const [filterJob, setFilterJob] = useState([]);
  const [isDivVisible, setDivVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://internshipbackend-vwja.onrender.com/api/job');
        setJobData(response.data);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };
    fetchData();
  }, []);

  const showDiv = () => {
    setDivVisible(true);
  };

  const hideDiv = () => {
    setDivVisible(false);
  };

  const handleCategoryChange = (e) => {
    const categoryValue = e.target.value;
    setSearchCategory(categoryValue);
    filterJobs(categoryValue, searchLocation);
  };

  const handleLocationChange = (e) => {
    const locationValue = e.target.value;
    setSearchLocation(locationValue);
    filterJobs(searchCategory, locationValue);
  };

  const filterJobs = (category, location) => {
    const filteredData = jobData.filter(
      (job) =>
        job.category.toLowerCase().includes(category.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilterJob(filteredData);
  };

  return (
    <>
      <div className='flex internship-filter'>
        <div className='first-int mb-14'>
          <div className='filter-section w-1/6'>
            <p className='text-center'>
              <i className='bi bi-funnel text-blue-400'></i> {t('jobAvl.filter')}
            </p>
            <div className='fill flex flex-col ml-2'>
              <label htmlFor='pro'>{t('jobAvl.profile')}</label>
              <input
                type='text'
                id='pro'
                value={searchCategory}
                onChange={handleCategoryChange}
                className='profile border-2 mr-3 w-full'
                placeholder={t('jobAvl.profilePlaceholder')}
              />
              <label htmlFor='loc'>{t('jobAvl.location')}</label>
              <input
                type='text'
                id='loc'
                value={searchLocation}
                onChange={handleLocationChange}
                className='location border-2 -ml-8 w-full'
                placeholder={t('jobAvl.locationPlaceholder')}
              />
            </div>
            <div className='preferences mt-8 flex flex-col'>
              <div className='flex mt-3 ml-3 mr-3'>
                <input type='checkbox' name='wfh' id='whf' className='mr-2 ml-3' />
                <label htmlFor='wfh'>{t('jobAvl.workFromHome')}</label>
              </div>
              <div className='flex mt-3 ml-3 mr-3'>
                <input type='checkbox' name='pt' id='whf' className='mr-2 ml-3' />
                <label htmlFor='pt'>{t('jobAvl.partTime')}</label>
              </div>
              <p>{t('jobAvl.annualSalary')}</p>
              <input type='range' name='' id='' />
              <p className='mt-2 ml-3 mr-3'>0 2K &nbsp; 4k &nbsp; 6K &nbsp; 8k &nbsp; 10K</p>
            </div>
            <p className='mt-5 text-blue-400'>{t('jobAvl.viewMoreFilters')} <i className='bi bi-chevron-down'></i></p>
            <span className='justify-end flex text-blue-400 mr-3'>{t('jobAvl.clearAll')}</span>
          </div>
          <div className='search-2'>
            <div className='search-container'>
              <label htmlFor='ex'>{t('jobAvl.experience')}</label>
              <input type='text' id='ex' placeholder={t('jobAvl.experiencePlaceholder')} />
              <div className='search-icon'>
                <i className='bi bi-search'></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='all-internships'>
        <div className='show show2 flex justify-center'>
          <p id='filter-ico' className='filterico text-center' onClick={showDiv}>
            {t('jobAvl.filter')} <i className='bi bi-funnel text-blue-400'></i>
          </p>
        </div>
        <p className='head font-bold text-lg text-center'>{filterJob.length} {t('jobAvl.totalJobs')}</p>

        {filterJob.map((data, index) => (
          <div className='shadow-lg rounded-lg bg-white m-7' key={index} id='display'>
            <div className='m-4'>
              <p className='mb-4 mt-3' id='boxer'>
                <i className='bi bi-arrow-up-right text-blue-500'></i> {t('jobAvl.activelyHiring')}
              </p>
              <div className='flex justify-end'>
                <img src={compLogo} className='w-14' alt='' />
              </div>
              <div className='all-ele'>
                <div className='text-lg text-black m-2 mt-7 font-bold'>{data.title}</div>
                <div className='info'>
                  <p className='text-sm text-slate-300 font-bold'>{data.company}</p>
                  <p className='mt-2'>{data.location}</p>
                </div>
                <div className='flex text-sm justify-between'>
                  <p className='mt-3'>
                    <i className='bi bi-play-circle-fill'></i> {t('jobAvl.startDate')} <br /> {data.StartDate}
                  </p>
                  <p className='mt-3'>
                    <i className='bi bi-calendar-check-fill'></i> {t('jobAvl.experience')} <br /> {data.Experience}
                  </p>
                  <p className='mt-3'>
                    <i className='bi bi-cash'></i> {t('jobAvl.salary')} <br /> {data.CTC}
                  </p>
                </div>
              </div>
              <span className='bg-slate-200 text-slate-400 w-20 rounded-sm text-center'>{t('jobAvl.job')}</span>
              <br />
              <span>
                <i className='bi bi-stopwatch text-green-300'></i> 23/11/2065
              </span>
              <div className='flex justify-end' id='hr'>
                <Link className='mt-10' to={`/detailjob?q=${data._id}`}>
                  <button id='viewButtons' className='bg-transparent text-blue-500'>{t('jobAvl.viewDetails')}</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isDivVisible && (
        <div className='first2-int mb-14'>
          <div className='filter-section w-1/6'>
            <button id='close-btn' onClick={hideDiv}>
              <i className='text-3xl bi bi-x'></i>
            </button>
            <p className='text-center'>
              <i className='bi bi-funnel text-blue-400'></i> {t('jobAvl.filter')}
            </p>
            <div className='fill flex flex-col ml-2'>
              <label htmlFor='pro'>{t('jobAvl.profile')}</label>
              <input
                type='text'
                id='pro'
                value={searchCategory}
                onChange={handleCategoryChange}
                className='profile border-2 mr-3 w-full'
                placeholder={t('jobAvl.profilePlaceholder')}
              />
              <label htmlFor='loc'>{t('jobAvl.location')}</label>
              <input
                type='text'
                id='loc'
                value={searchLocation}
                onChange={handleLocationChange}
                className='location border-2 mt-10 -ml-8 w-full'
                placeholder={t('jobAvl.locationPlaceholder')}
              />
            </div>
            <div className='preferences mt-8 flex flex-col'>
              <div className='flex mt-3 ml-3 mr-3'>
                <input type='checkbox' name='wfh' id='whf' className='mr-2 ml-3' />
                <label htmlFor='wfh'>{t('jobAvl.workFromHome')}</label>
              </div>
              <div className='flex mt-3 ml-3 mr-3'>
                <input type='checkbox' name='pt' id='whf' className='mr-2 ml-3' />
                <label htmlFor='pt'>{t('jobAvl.partTime')}</label>
              </div>
              <p> {t('jobAvl.annualSalary')}</p>
<input type="range" name="" id="" />
<p className='mt-2 ml-3 mr-3'>0  2K  &nbsp;  4k  &nbsp;  6K &nbsp;  8k   &nbsp; 10K</p>
</div>

<p className='mt-5 text-blue-400'>{t('jobAvl.viewMoreFilters')} <i className="bi bi-chevron-down"></i></p>
<span className='justify-end flex text-blue-400 mr-3'>{t('jobAvl.clearAll')}</span>
</div>
<div className="search-2"><div className="search-container">
  <label htmlFor="ex">{t('jobAvl.experience')}</label>
  <input type="text" id='ex' placeholder={t('jobAvl.experiencePlaceholder')} />
  <div className="search-icon">
  <i className="bi bi-search"></i>
  </div>
  </div></div>
</div>

      )}
   </>
  )
}

export default JobAvl