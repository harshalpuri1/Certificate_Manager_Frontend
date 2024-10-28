import React from 'react';
import './Navbar.css';
import logo from '../assets/images/logo.png';
import settingsIcon from '../assets/images/settings.png';
import userIcon from '../assets/images/user.png';
import strings from '../utils/Certificatepage.json';
import constants from '../utils/config/config';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

export const Navbar = () => {
    const nav = useNavigate();
    const location = useLocation();

    const userLogout = async () => {
        try {
            const response = await api.logoutUser();
            localStorage.clear();
            toast.success(response.body.message, {
                toastId: constants.constantsErrors.toastId,
            });
            nav(constants.navigationLink.loginLink);
        } catch (error) {
            toast.error(constants.constantsErrors.logoutErr);
        }
    };

    const isOnSettingsPage = location.pathname === constants.navigationLink.settings;

    return (
        <div className='nav-container'>
            <nav className="navbar">
                <div className="logo-container">
                    <img src={logo} alt="logo" className="logo" />
                </div>
                <div className="navbar-right">
                    <button
                        className={`settings-button ${isOnSettingsPage ? 'disabled' : ''}`}
                        onClick={() => nav(constants.navigationLink.settings)}
                        disabled={isOnSettingsPage}
                    >
                        <img
                            src={settingsIcon}
                            alt={strings.settingsButtonAlt}
                            className="settings-icon"
                        />
                    </button>
                    <button className="logout-button" onClick={userLogout}>
                        {strings.logoutButton}
                    </button>
                    <img src={userIcon} alt="user" className="user-icon" />
                </div>
            </nav>
        </div>
    );
};
