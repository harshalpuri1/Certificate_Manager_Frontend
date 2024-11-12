import React from "react";
import "./Settings.css";
import strings from "../utils/Settings.json";
import apiKey from "../assets/settingImg/apikey.png";
import reload from "../assets/settingImg/reload.png";
import edit from "../assets/settingImg/edit.png";
import profile from "../assets/settingImg/profile.png";
import crown from "../assets/settingImg/crown.png";
import add from "../assets/settingImg/add.png";
import phone from "../assets/settingImg/phone.png";
import mail from "../assets/settingImg/mail.png";
import address from "../assets/settingImg/address.png";
import { Navbar } from "../navbar/Navbar";
import { toast } from "react-toastify";

const Settings = () => {
  const email = localStorage.getItem(strings.email);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success(strings.toastcopy);
      },
      (err) => {
        toast.error(strings.toasterror);
      }
    );
  };
  return (
    <>
      <Navbar />
      <div className="settings-container">
        <div className="settings-header">
          <p>{strings.settingsTitle}</p>
          <button className="save-button">{strings.saveButtonText}</button>
        </div>
        <div className="settings-content">
          <div className="left-box">
            <div className="profile-section">
              <div className="profile-header">
                <div className="profile-title">{strings.profileTitle}</div>
                <img src={edit} alt="Edit Icon" className="edit-icon" />
              </div>
              <div className="profile-pic-container">
                <img src={profile} alt="Profile" className="profile-pic" />
                <img src={crown} alt="Crown" className="crown-icon" />
              </div>
              <div className="profile-info">
                <p className="profile-wisdom">{strings.wisdomGroup}</p>
                <p className="profile-detail">{strings.profileDetail}</p>
                <div className="contact-info">
                  <div className="info-item">
                    <div className="icon-background">
                      <img src={phone} alt="Phone Icon" className="info-icon" />
                    </div>
                    <span className="info-text">{strings.phoneno}</span>
                  </div>
                  <div className="info-item">
                    <div className="icon-background">
                      <img src={mail} alt="Email Icon" className="info-icon" />
                    </div>
                    <span className="info-text" style={{ color: "#0D47A1", fontWeight: "500" }}>{email}</span>
                  </div>
                  <div className="info-item">
                    <div className="icon-background">
                      <img
                        src={address}
                        alt="Location Icon"
                        className="info-icon"
                      />
                    </div>
                    <span className="info-text">{strings.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-box">
            <div className="applications-header">
              <div className="applications-title">
                {strings.applicationHeader}
              </div>
              <button className="add-button">
                <img src={add} alt="Add Icon" className="add-icon" />
                {strings.addButton}
              </button>
            </div>
            <div className="table-wrapper">
              <table className="custom-table">
                <thead className="thead-table">
                  <tr>
                    <th>{strings.applicationHeader}</th>
                    <th style={{ paddingLeft: "18px" }}>
                      {strings.apiKeyHeader}
                    </th>
                    <th style={{ paddingLeft: "18px" }}>
                      {strings.secretKeyHeader}
                    </th>

                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {strings.applications.map((app, index) => (
                    <tr key={index}>
                      <td>{app.applicationName}</td>
                      <td>
                        <img
                          src={apiKey}
                          alt="API Key Icon"
                          className="table-icon"
                          onClick={() => handleCopy(app.apiKey)}
                        />
                        {app.apiKey}
                        <img
                          src={reload}
                          alt="Reload Icon"
                          className="table-icon"
                        />
                      </td>
                      <td>
                        <img
                          src={apiKey}
                          alt="API Key Icon"
                          className="table-icon"
                          onClick={() => handleCopy(app.secretKey)}
                        />
                        {app.secretKey}
                        <img
                          src={reload}
                          alt="Reload Icon"
                          className="table-icon"
                        />
                      </td>
                      <td>
                        <div className="aligning">
                          <button className="action-button">
                            <div className="circle">3</div>
                            {strings.urlButton}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
