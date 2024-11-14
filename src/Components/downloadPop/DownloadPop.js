import React from 'react';
import Modal from 'react-modal';

import strings from '../utils/Downloadpop.json';
import './DownloadPop.css';  
import close from '../assets/images/Vector.png';

const Download = ({ isOpen,certificate, onRequestClose,downloadAsPDF,downloadAsImage}) => {

  return (
    <Modal className="modal" isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Certificate Generated">
      <div className="container"> 
        <nav>
          <div className="navLeft">
            <h1 className='sucsTitle'>{strings.successTitle}</h1>
            <h5 className='sucsMsg'>{strings.successMessage}</h5>
          </div>
          <div className="close">
            <img onClick={onRequestClose} src={close} alt="Close" className="close-img" />
          </div>
        </nav>

        <div className="flex-container">
          <div className="main-inner">
                {certificate && <img src={certificate} alt="certificate-preview" className="certificatesignature" />}
          </div>   

          <div className="rightBox">
            <div className="btnBox">
              <h4>{strings.editFileTitle}</h4>
              <button onClick={onRequestClose} className="btn1">{strings.editButtonText}</button>
              <button className="btn2" onClick={downloadAsImage}>
                {strings.downloadImageButtonText} 
              </button>
              <button className="btn3" onClick={downloadAsPDF}>{strings.downloadPdfButtonText}</button>
            </div>
            <div className="file-detail">
              <h4><span>{strings.fileLabel}</span> {strings.fileInfo}</h4>
              <div className="license">
                <h4><span>{strings.licenseLabel}</span>{strings.licenseType}</h4>
                <span>{strings.moreDetails}</span>
              </div>
              <h3>{strings.issueFound} <span>{strings.reportLabel}</span></h3>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Download;
