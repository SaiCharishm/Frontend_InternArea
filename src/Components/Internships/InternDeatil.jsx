import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Feature/Userslice';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook for translation

function InternDeatil() {
  const { t } = useTranslation(); // Hook to access translation function
  const user = useSelector(selectUser);
  const [isDivVisible, setDivVisible] = useState(false);
  const [textare, setTextare] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");
  const show = () => {
    setDivVisible(true);
  };
  const hide = () => {
    setDivVisible(false);
  };
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://internshipbackend-vwja.onrender.com/api/internship/${id}`);
      setData(response.data);
      const { company, category } = response.data;
      setCompany(company);
      setCategory(category);
    };
    fetchData();
  }, [id]);

  const submitApplication = async () => {
    const text = document.getElementById("text");
    if (text.value === "") {
      alert(t('internDetail.fillMandatoryFields'));
    } else {
      const bodyJson = {
        coverLetter: textare,
        category: category,
        company: company,
        user: user,
        Application: id
      };

      try {
        await axios.post("https://internshipbackend-vwja.onrender.com/api/application", bodyJson);
        alert(t('internDetail.applicationSubmitted'));
        navigate("/Jobs");
      } catch (error) {
        alert(t('internDetail.errorOccurred'));
      }
    }
  };

  return (
    <div>
      <div className="details-app">
        <>
          <h1 className='font-bold text-3xl'>{data.title}</h1>
          <div className="m-14 shadow-sm rounded-md border">
            <p className='mb-4 mt-3' id='boxer'>
              <i className='bi bi-arrow-up-right text-blue-500'></i> {t('internDetail.activelyHiring')}
            </p>
            <div className="main-info align-baseline mr-96 mt-7">
              <p className='text-xl font-bold mt-4'>{data.title}</p>
              <p className='text-sm text-slate-300 font-bold'>{data.title}</p>
              <p><i className="bi bi-geo-alt-fill"></i> {data.location}</p>
            </div>
            <div className="flex tedxt-sm justify-between">
              <p className='mt-3 text-slate-400'>
                <i className="bi bi-play-circle-fill"></i> {t('internDetail.startDate')} <br /> {data.StartDate}
              </p>
              <p className='mt-3 text-slate-400'>
                <i className="bi bi-calendar-check-fill"></i> {t('internDetail.duration')} <br /> {data.Duration}
              </p>
              <p className='mt-3 text-slate-400'>
                <i className="bi bi-cash"></i> {t('internDetail.stipend')} <br /> {data.stipend}
              </p>
            </div>
            <div className="flex">
              <p className='bg-green-100 rounded-md ml-4 text-green-300'>
                <i className="bi bi-clock"></i> 12/12/2012
              </p>
            </div>
            <hr />
            <div className="aboutCompany flex justify-start">
              <p className='mt-3 text-xl font-bold text-start'>{t('internDetail.aboutCompany', { company: data.company })}</p>
              <br />
            </div>
            <div className="flex">
              <p className='text-blue-500'>
                {t('internDetail.instagramPage')} <i className='bi bi-arrow-up-right-square'></i>
              </p>
            </div>
            <p className='mt-4'>{data.aboutCompany}</p>
            <div className="about-Job">
              <p className='mt-3 text-xl font-bold text-start'>{t('internDetail.aboutJob')}</p>
              <p>{data.aboutJob}</p>
            </div>
            <p className='text-blue-500 justify-start'>{t('internDetail.learnBusinessCommunication')}</p>
            <div className="whocan">
              <p className='mt-3 text-xl font-bold text-start'>{t('internDetail.whoCanApply')}</p>
              <p>{data.Whocanapply}</p>
            </div>
            <p className='mt-3 text-xl font-bold text-start'>{t('internDetail.perks')}</p>
            <p>{data.perks}</p>
            <p className='mt-3 text-xl font-bold text-start'>{t('internDetail.additionalInfo')}</p>
            <p>{data.AdditionalInfo}</p>
            <p className='mt-3 text-xl font-bold text-start'>{t('internDetail.numberOfOpenings')}</p>
            <p className='text-start'>{data.numberOfopning}</p>
            <div className='flex justify-center mt-6 bg-blue-500 w-40 text-center text-white font-bold'>
              <button className='flex justify-center align-middle' onClick={show}>{t('internDetail.apply')}</button>
            </div>
          </div>
        </>
      </div>
      {isDivVisible && (
        <>
          <div className="application-page">
            <div className="bg">
              <button className='close2' onClick={hide}><i className='bi bi-x'></i> {t('internDetail.close')}</button>
              <p>{t('internDetail.applicationFor')} {data.company}</p>
              <p className='mt-3 text-sm font-bold text-start mb-3'>{data.aboutCompany}</p>
            </div>
            <div className="moreSteps">
              <p className='font-semibold text-xl'>{t('internDetail.yourResume')}</p>
              <small>{t('internDetail.yourResumeNote')}</small>

              <p className='mt-5 font-semibold text-xl'>{t('internDetail.coverLetter')}</p>
              <br />
              <p>{t('internDetail.whyShouldWeHire')}</p>
              <textarea name="coverLetter" placeholder='' id="text" value={textare} onChange={(e) => setTextare(e.target.value)}></textarea>
              <p className='mt-5 font-semibold text-xl'>{t('internDetail.yourAvailability')}</p>
              <p>{t('internDetail.confirmAvailability')}</p>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="Yes, I am available to join immediately"
                />
                {t('internDetail.immediatelyAvailable')}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="No, I am currently on notice period"
                />
                {t('internDetail.noticePeriod')}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="No, I will have to serve notice period"
                />
                {t('internDetail.serveNoticePeriod')}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="Other"
                />
                {t('internDetail.other')}
                <span className='text-slate-500'>{t('internDetail.specifyAvailability')}</span>
              </label>
            </div>
            <p className='mt-5 font-semibold text-xl'>{t('internDetail.customResume')} <span className='text-slate-500'>({t('internDetail.optional')})</span></p>
            <small className='text-slate-500'>{t('internDetail.employerCanDownload')}</small>
            <div className="submit flex justify-center">
              {user ? (
                <button className='submit-btn' onClick={submitApplication}>{t('internDetail.submitApplication')}</button>
              ) : (
                <Link to={"/register"}>
                  <button className='submit-btn'>{t('internDetail.submitApplication')}</button>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default InternDeatil;