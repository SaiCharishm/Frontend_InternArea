import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import './admin.css';

function AdminLogin() {
    const { t } = useTranslation(); // Access translation functions
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const LoginAdmin = async () => {
        console.log("Attempting login with:", { username, password }); // Debug log

        if (username === '' || password === '') {
            alert(t('adminLogin.fillBlanks')); // Translate alert message
        } else {
            const bodyjson = {
                username: username,
                password: password
            };
            try {
                const res = await axios.post('https://localhost:7480/api/admin/adminLogin', bodyjson);
                console.log(res, 'data is sent');
                alert(t('adminLogin.success')); // Translate success message
                navigate('/adminepanel');
            } catch (err) {
                console.error("Login error:", err.response ? err.response.data : err.message); // Debug log
                if (err.response && err.response.status === 401) {
                    alert(t('adminLogin.failure')); // Translate failure message
                } else {
                    alert(t('adminLogin.serverError')); // Translate server error message
                }
            }
        }
    };

    return (
        <div>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                            {t('adminLogin.contactUs')} {/* Translate title */}
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            {t('adminLogin.contactUsDescription')} {/* Translate description */}
                        </p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                                        {t('adminLogin.name')} {/* Translate label */}
                                    </label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        id="name"
                                        name="name"
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="pass" className="leading-7 text-sm text-gray-600">
                                        {t('adminLogin.password')} {/* Translate label */}
                                    </label>
                                    <input
                                        type="password"
                                        id="pass"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <button onClick={LoginAdmin} className="bt3" style={{ padding: '10px', backgroundColor: 'blue', color: 'white' }}>
                                {t('adminLogin.login')} {/* Translate button text */}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AdminLogin;
