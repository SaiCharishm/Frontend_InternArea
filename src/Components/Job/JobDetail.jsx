import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook for translation
import './job.css';
import { selectUser} from '../../Feature/Userslice';

function JobDetail() {
  const { t } = useTranslation(); // Hook to access translation function

  const user = useSelector(selectUser);
  const [isDivVisible, setDivVisible] = useState(false);
  const [textarea, setTextare] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  
  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://internshipbackend-vwja.onrender.com/api/job/${id}`);
        const { company, category } = response.data;
        setCompany(company);
        setCategory(category);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchData();
  }, [id]);

  const show = () => {
    setDivVisible(true);
  };

  const hide = () => {
    setDivVisible(false);
  };

  const submitApplication = async () => {
    const text = document.getElementById("text");
    if (text.value === "") {
      alert(t('jobDetail.fillFields'));
    } else {
      const bodyJson = {
        coverLetter: textarea,
        category: category,
        company: company,
        user: user,
        Application: id
      };
  
      try {
        await axios.post("https://internshipbackend-vwja.onrender.com/api/application", bodyJson);
        alert(t('jobDetail.applicationSubmitted'));
        navigate("/Jobs");
      } catch (error) {
        console.error('Error submitting application:', error);
        alert(t('jobDetail.error'));
      }
    }
  };

  return (
    <div>
      <div className="details-app">
        <h1 className='font-bold text-3xl'>{data.title}</h1>
        <div className="m-14 shadow-sm rounded-md border">
          <p className='mb-4 mt-3' id='boxer'>
            <i className='bi bi-arrow-up-right text-blue-500'></i> {t('jobDetail.activelyHiring')}
          </p>
          <div className="main-info align-baseline mr-96 mt-7">
            <p className='text-xl font-bold mt-4'>{data.title}</p>
            <p className='text-sm text-slate-300 font-bold'>{data.title}</p>
            <p><i className="bi bi-geo-alt-fill"></i> {data.location}</p>
          </div>
          <div className="flex tedxt-sm justify-between">
            <p className='mt-3 text-slate-400'><i className="bi bi-play-circle-fill"></i> {t('jobDetail.startDate')} <br /> {data.StartDate}</p>
            <p className='mt-3 text-slate-400'><i className="bi bi-calendar-check-fill"></i> {t('jobDetail.experience')} <br /> {data.Experience}</p>
            <p className='mt-3 text-slate-400'><i className="bi bi-cash"></i> {t('jobDetail.salary')} <br /> {data.CTC}</p>
          </div>
          <div className="flex">
            <p className='bg-green-100 rounded-md ml-4 text-green-300'><i className="bi bi-clock"></i> 12/12/2012</p>
          </div>
          <hr />
          <div className="aboutCompany flex justify-start">
            <p className='mt-3 text-xl font-bold text-start'>{t('jobDetail.about')} {data.company}</p>
            <br />
          </div>
          <div className="flex">
            <p className='text-blue-500'> {t('jobDetail.instagram')} <i className='bi bi-arrow-up-right-square'></i></p>
          </div>
          <p className='mt-4'> {data.aboutCompany}</p>
          <div className="about-Job">
            <p className='mt-3 text-xl font-bold text-start'>{t('jobDetail.aboutJob')}</p>
            <p>{data.aboutJob}</p>
          </div>
          <p className='text-blue-500 justify-start'>{t('jobDetail.learn')}</p>
          <div className="whocan">
            <p className='mt-3 text-xl font-bold text-start'>{t('jobDetail.whoCanApply')}</p>
            <p>{data.Whocanapply}</p>
          </div>
          <p className='mt-3 text-xl font-bold text-start'>{t('jobDetail.perks')}</p>
          <p>{data.perks}</p>
          <p className='mt-3 text-xl font-bold text-start'>{t('jobDetail.additionalInfo')}</p>
          <p>{data.AdditionalInfo}</p>
          <p className='mt-3 text-xl font-bold text-start'>{t('jobDetail.openings')}</p>
          <p className='text-start'>{data.numberOfopning}</p>
          <div className='flex justify-center mt-6 bg-blue-500 w-40 text-center text-white font-bold'>
            <button className='flex justify-center align-middle' onClick={show}>{t('jobDetail.apply')}</button>
          </div>
        </div>
      </div>

      {isDivVisible && (
        <>
          <div className="application-page">
            <div className="bg">
              <button className='close2' onClick={hide}><i className='bi-bi-x'></i> {t('jobDetail.close')}</button>
              <p>{t('jobDetail.applicationFor')} {data.company}</p>
              <p className='mt-3 text-sm font-bold text-start mb-3'>{data.aboutCompany}</p>
            </div>
            <div className="moreSteps">
              <p className='font-semibold text-xl'>{t('jobDetail.resume')}</p>
              <small>{t('jobDetail.resumeDesc')}</small>
              <p className='mt-5 font-semibold text-xl'>{t('jobDetail.coverLetter')}</p>
              <br />
              <p>{t('jobDetail.whyHire')}</p>
              <textarea name="coverLetter" placeholder='' id="text" value={textarea} onChange={(e) => setTextare(e.target.value)}></textarea>
              <p className='mt-5 font-semibold text-xl'>{t('jobDetail.availability')}</p>
              <p>{t('jobDetail.confirmAvailability')}</p>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="Yes, I am available to join immediately"
                />
                {t('jobDetail.immediately')}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="No, I am currently on notice period"
                />
                {t('jobDetail.noticePeriod')}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="No, I will have to serve notice period"
                />
                {t('jobDetail.serveNotice')}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="Other"
                />
                {t('jobDetail.other')} <span className='text-slate-500'>
                  ({t('jobDetail.specifyAvailability')})
                </span>
              </label>
            </div>
            <p className='mt-5 font-semibold text-xl'>{t('jobDetail.customResume')} <span className='text-slate-500'>({t('jobDetail.optional')})</span></p>
            <small className='text-slate-500'>{t('jobDetail.employerView')}</small>
            <div className="submit flex justify-center">
              {user ? (
                <button className='submit-btn' onClick={submitApplication}>{t('jobDetail.submitApplication')}</button>
              ) : (
                <Link to={"/register"}>
                  <button className='submit-btn'>{t('jobDetail.submitApplication')}</button>
                </Link>
              )}
            </div>
          </div>
        </>
      )}

    </div>
  );
}

export default JobDetail;
