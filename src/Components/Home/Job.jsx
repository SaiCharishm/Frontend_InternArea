import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation

function Job() {
    const { t } = useTranslation(); // Use useTranslation hook

    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("Big Brands");
    const [jobData, setJobData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://internshipbackend-vwja.onrender.com/api/job`);
                setJobData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleJob = (direction) => {
        const container = document.getElementById("container3");
        const step = 100;
        setCurrentSlide(prevSlide => direction === 'left' ? (prevSlide > 0 ? prevSlide - 1 : 0) : (prevSlide < 3 ? prevSlide + 1 : 3));
        sideScrollJob(container, direction, 25, step, 10);
    };

    const filterJobs = jobData.filter(item => !selectedCategory || item.category === selectedCategory);

    return (
        <div>
            <div className="info-intern mt-12">
                <div className="categories flex flex-wrap mt-14">
                    <p>{t('job.popularCategories')} :</p>
                    {['Big Brands', 'Work From Home', 'Part-time', 'MBA', 'Engineering', 'Media', 'Design', 'Data Science'].map((category, index) => (
                        <span
                            key={index}
                            className={`category mr-4 ml-6 ${selectedCategory === category ? 'bg-blue-500 text-white' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {t(`categories.${category}`)}
                        </span>
                    ))}
                </div>
            </div>
            <div className="internships" id='container3'>
                <div className="internShip-Info flex">
                    {filterJobs.map((data, index) => (
                        <div className="int-1 mt-6" key={index}>
                            <p className='mb-4 mt-3' id='boxer'>
                                <i className='bi bi-arrow-up-right text-blue-500' ></i> {t('job.activelyHiring')}
                            </p>
                            <p>{data.title}</p>
                            <small className='text-slate-400 text-sm'>{data.company}</small>
                            <hr className='mt-5' />
                            <p className='mt-3'><i className="bi bi-geo-alt-fill"></i> {data.location}  </p>
                            <p className='mt-1'> <i className="bi bi-cash-stack"></i> {data.CTC}</p>
                            <p className='mt-1'><i className="bi bi-calendar-fill"></i> {data.Experience}</p>
                            <div className='more flex justify-between mt-6'>
                                <span className='bg-slate-200 text-slate-400 w-20 rounded-sm text-center'>{t('job.job')}</span>
                                <Link to={`detailjob?q=${data._id}`}>
                                    <span className='text-blue-500 mr-2'>
                                        {t('job.viewDetails')} <i className="bi bi-chevron-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex BUttons mt-9">
                <button className='back' onClick={() => handleJob('left')}>
                    <i className='bi bi-chevron-left' id='sideBack'></i>
                </button>
                <button className="next" onClick={() => handleJob('right')}>
                    <i className='bi bi-chevron-right' id='slide'></i>
                </button>
            </div>
        </div>
    );
}

export default Job;

function sideScrollJob(element, direction, speed, distance, step) {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
        if (direction === 'left') {
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
            clearInterval(slideTimer);
        }
    }, speed);
}
