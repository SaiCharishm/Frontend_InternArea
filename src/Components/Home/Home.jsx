import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import first from "../../Assets/Firstslide.png";
import second from "../../Assets/secondslide.webp";
import third from "../../Assets/thirdsilde.webp";
import fouth from "../../Assets/fourthslide.webp";
import "./home.css";
import Job from './Job';

function Home() {
  const { t } = useTranslation(); // Destructure t function from useTranslation hook
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(t('categories.bigBrands'));
  const [internshipData, setInternshipData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:7480/api/internship`);
        setInternshipData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const filterInternShips = internshipData.filter((item) =>
    !selectedCategory || item.category === selectedCategory
  );

  const handleSlide = (direction) => {
    const container = document.getElementById("container");
    const step = 100;
    if (direction === 'left') {
      setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : 0));
    } else {
      setCurrentSlide((prevSlide) => (prevSlide < 3 ? prevSlide + 1 : 3));
    }
    sideScroll(container, direction, 25, step, 10);
  };

  const handleSlideIntern = (direction) => {
    const container = document.getElementById("container2");
    const step = 100;
    if (direction === 'left') {
      setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : 0));
    } else {
      setCurrentSlide((prevSlide) => (prevSlide < 3 ? prevSlide + 1 : 3));
    }
    sideScrollIntern(container, direction, 25, step, 10);
  };

  return (
    <>
      <h1 className='text-center text-3xl font-bold'>{t('home.title')}</h1>
      <p className='text-center text-lg font-bold'>{t('home.trending')}</p>
      <div className="imgs flex justify-center" id='container'>
        <div className="slide flex mt-10" id='content'>
          <img className='slide_Img ml-4' src={first} alt="" />
          <img className='slide_Img ml-4' src={second} alt="" />
          <img className='slide_Img ml-4' src={third} alt="" />
          <img className='slide_Img ml-4' src={fouth} alt="" />
        </div>
      </div>
      <div className="flex BUttons">
        <button className='back' onClick={() => handleSlide('left')}> <i className='bi bi-chevron-left' id='sideBack'></i></button>
        <button className="next" onClick={() => handleSlide('right')}> <i className='bi bi-chevron-right' id='slide'></i></button>
      </div>

      <div className="infoys">
        <div className="info-intern">
          <div className="mt-16">
            <h1 className='text-center font-bold'>{t('home.latestInternships')}</h1>
          </div>
          <div className="categories flex flex-wrap mt-14">
            <p>{t('home.popularCategories')} :</p>
            <span className={`category mr-4 ml-6 ${selectedCategory === t('categories.bigBrands') ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory(t('categories.bigBrands'))}>{t('categories.bigBrands')}</span>
            <span className={`category mr-4 ml-6 ${selectedCategory === t('categories.workFromHome') ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory(t('categories.workFromHome'))}>{t('categories.workFromHome')}</span>
            <span className={`category mr-4 ml-6 ${selectedCategory === t('categories.partTime') ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory(t('categories.partTime'))}>{t('categories.partTime')}</span>
            <span className={`category mr-4 ml-6 ${selectedCategory === t('categories.mba') ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory(t('categories.mba'))}>{t('categories.mba')}</span>
            <span className={`category mr-4 ml-6 ${selectedCategory === t('categories.engineering') ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory(t('categories.engineering'))}>{t('categories.engineering')}</span>
            <span className={`category mr-4 ml-6 ${selectedCategory === t('categories.media') ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory(t('categories.media'))}>{t('categories.media')}</span>
            <span className={`category mr-4 ml-6 ${selectedCategory === t('categories.design') ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory(t('categories.design'))}>{t('categories.design')}</span>
            <span className={`category mr-4 ml-6 ${selectedCategory === t('categories.dataScience') ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory(t('categories.dataScience'))}>{t('categories.dataScience')}</span>
          </div>
        </div>
        <div className="internships" id='container2'>
          <div className="internShip-Info flex">
            {
              filterInternShips.map((data, index) => (
                <div className="int-1 mt-6" key={index}>
                  <p className='mb-4 mt-3' id='boxer'> <i className='bi bi-arrow-up-right text-blue-500' ></i> {t('home.activelyHiring')}</p>
                  <p>{data.title}</p>
                  <small className='text-slate-400 text-sm'>{data.company}</small>
                  <hr className='mt-5' />
                  <p className='mt-3' ><i className="bi bi-geo-alt-fill"></i> {data.location}  </p>
                  <p className='mt-1'> <i className="bi bi-cash-stack"></i> {data.stipend}</p>
                  <p className='mt-1'><i className="bi bi-calendar-fill"></i> {data.Duration}</p>
                  <div className='more flex justify-between mt-6'>
                    <span className='bg-slate-200 text-slate-400 w-20 rounded-sm text-center'>{t('home.internship')}</span>
                    <Link to={`/detailInternship?q=${data._id}`}>
                      <span className='text-blue-500 mr-2'> 
                        {t('home.viewDetails')} <i className="bi bi-chevron-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="flex BUttons mt-9">
          <button className='back' onClick={() => handleSlideIntern('left')}> <i className='bi bi-chevron-left' id='sideBack'></i></button>
          <button className="next" onClick={() => handleSlideIntern('right')}> <i className='bi bi-chevron-right' id='slide'></i></button>
        </div>
      </div>
      <Job />
      <hr />
      <div className="analytics mt-8 flex flex-wrap justify-center items-center text-center">
        <div className="text-block mt-5">
          <span className='font-bold text-6xl text-blue-600'>300K+</span>
          <p>{t('home.companiesHiring')}</p>
        </div>
        <div className="text-block mt-5">
          <span className='font-bold text-6xl text-blue-600'>10K+</span>
          <p>{t('home.newOpenings')}</p>
        </div>
        <div className="text-block mt-5">
          <span className='font-bold text-6xl text-blue-600'>21Mn+</span>
          <p>{t('home.activeStudents')}</p>
        </div>

        <div className="text-block mt-5">
          <span className='font-bold text-6xl text-blue-600'>600K+</span>
          <p>learners</p>
        </div>
      </div>
      <div className="logins flex h-32 mt-8">
        <div className="cont">
          <p className="flex justify-center text-white text-xl items-center m-5 w-30">Empower your career with InternArea today</p>
        </div>
        <div className="log flex">
          <a href="/register" id='buttons' className="flex items-center bg-white h-9 justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
            <div className="px-4 py-3">
              <svg className="h-6 w-6" viewBox="0 0 40 40">
                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
              </svg>
            </div>
            <p className="px-4 py-3 w-5/6 text-center text-sm text-gray-600 font-bold">Sign in with Google</p>
          </a>
          <a href="/register">
            <button className='btn6'>Register</button>
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;

function sideScroll(element, direction, speed, distance, step) {
  let scrollAmount = 0;
  const slideTimer = setInterval(function () {
    if (direction === 'left') {
      element.scrollLeft -= step;
    } else {
      element.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
}

function sideScrollIntern(element, direction, speed, distance, step) {
  let scrollAmount = 0;
  const slideTimer = setInterval(function () {
    if (direction === 'left') {
      element.scrollLeft -= step;
    } else {
      element.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
}
