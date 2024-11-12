import React, { useEffect, useState } from "react";
import "./CertificatePage.css";
import strings from "../utils/Certificatepage.json";
import uploadicon from "../assets/images/Download-icon.png";
import cancel from "../assets/images/cancel.png";
import template1 from "../assets/images/template1.png";
import template2 from "../assets/images/template2.png";
import template3 from "../assets/images/template3.png";
import template4 from "../assets/images/template4.png";
import template5 from "../assets/images/template5.png";
import template6 from "../assets/images/template6.png";
import template7 from "../assets/images/template7.png";
import template8 from "../assets/images/template8.png";
import template9 from "../assets/images/template9.png";
import template10 from "../assets/images/template10.png";
import template11 from "../assets/images/template11.png";
import template12 from "../assets/images/template12.png";
import template13 from "../assets/images/template13.png";
import template14 from "../assets/images/template14.png";
import template15 from "../assets/images/template15.png";
import samplelogo from "../assets/images/samplelogo.png";
import signature from "../assets/images/signature.png";
import Download from "../downloadPop/DownloadPop";
import AddIcon from "../assets/images/add.png";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Navbar } from "../navbar/Navbar";
import { useSearchParams } from "react-router-dom";

const templateImages = [
  template1,
  template2,
  template3,
  template4,
  template5,
  template6,
  template7,
  template8,
  template9,
  template10,
  template11,
  template12,
  template13,
  template14,
  template15,
];

const Certificate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(templateImages[0]);
  const [logoFileName, setLogoFileName] = useState("Upload File");
  const [signatureFileName, setSignatureFileName] = useState("Upload File");
  const [topDescription, setTopDescription] = useState();
  const [recipientName, setRecipientName] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Returns date in "YYYY-MM-DD"
  });
    const [certifiedBy, setCertifiedBy] = useState("John Doe");
  const [logoImage, setLogoImage] = useState(samplelogo);
  const [signatureImage, setSignatureImage] = useState(signature);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [names, setNames] = useState([]);
  const [namesParams] = useSearchParams();
  const [hasShownAlert, setHasShownAlert] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 769 && !hasShownAlert) {
        alert("Rotate your phone for a better experience");
        setHasShownAlert(true);
      } else if (window.innerWidth >= 769 && hasShownAlert) {
        setHasShownAlert(false);
      }
    };

    // Check on initial load
    handleResize();

    // Update on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [hasShownAlert]);


  useEffect(() => {
    const extractNamesFromURL = () => {
      const nameString = namesParams.get("names");
      if (nameString) {
        const namesArray = nameString.split(",").map((name) => name.trim());
        setNames(namesArray);
        if (namesArray.length > 0) {
          setRecipientName(namesArray[0]);
        }
      }
    };

    if (namesParams && namesParams.has("names")) {
      extractNamesFromURL();
    }
  }, [namesParams]);

  const downloadAsPDF = async () => {
    if (names.length === 0) {
      toast.error(strings.noRecipientNames);
      return;
    }
    const toastId = toast.loading(strings.genCertificate);
    try {
      if (names.length === 1) {
        const recipientName = names[0];
        document.querySelector(".recipient-name").innerText = recipientName;
        const certificateElement = document.querySelector(
          ".certificate-manager"
        );
        const scale = 4;
        const canvas = await html2canvas(certificateElement, {
          useCORS: true,
          scale: scale,
        });

        const image = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape");
        pdf.addImage(image, "PNG", 0, 0, 300, 210);
        pdf.save(`${recipientName} certificate.pdf`);
      } else {
        const zip = new JSZip();
        for (const recipientName of names) {
          document.querySelector(".recipient-name").innerText = recipientName;
          const certificateElement = document.querySelector(
            ".certificate-manager"
          );
          const scale = 4;
          const canvas = await html2canvas(certificateElement, {
            useCORS: true,
            scale: scale,
          });

          const image = canvas.toDataURL("image/png");
          const pdf = new jsPDF("landscape");
          pdf.addImage(image, "PNG", 0, 0, 300, 210);

          const pdfBlob = pdf.output("blob");
          zip.file(`${recipientName} certificate.pdf`, pdfBlob);
        }

        await zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, "Certificates.zip");
        });
      }
      toast.update(toastId, {
        render: strings.certificateGenSucc,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: strings.errGenCertificate,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const downloadAsImage = async () => {
    if (names.length === 0) {
      toast.error(strings.noRecipientNames);
      return;
    }

    const toastId = toast.loading(strings.genCertificate);
    try {
      if (names.length === 1) {
        const recipientName = names[0];
        document.querySelector(".recipient-name").innerText = recipientName;
        const certificateElement = document.querySelector(
          ".certificate-manager"
        );

        const canvas = await html2canvas(certificateElement, {
          useCORS: true,
          scale: 4,
        });

        const link = document.createElement("a");
        link.download = `${recipientName} certificate.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      } else {
        const zip = new JSZip();
        for (const recipientName of names) {
          document.querySelector(".recipient-name").innerText = recipientName;
          const certificateElement = document.querySelector(
            ".certificate-manager"
          );

          const canvas = await html2canvas(certificateElement, {
            useCORS: true,
            scale: 4,
          });

          const imageBlob = await new Promise((resolve) =>
            canvas.toBlob(resolve, "image/png")
          );
          zip.file(`${recipientName} certificate.png`, imageBlob);
        }

        await zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, "Certificates.zip");
        });
      }
      toast.update(toastId, {
        render: strings.certificateGenSucc,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: strings.errGenCertificate,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const addName = (name) => {
    if (name.trim()) {
      setNames((prevNames) => [...prevNames, name]);
    }
  };

  const removeName = (index) => {
    setNames((prevNames) => prevNames.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setRecipientName("");
  }, [names]);

  const handlePress = async () => {
    const certificateElement = document.querySelector(".certificate-manager");
    const url = html2canvas(certificateElement, {
      useCORS: true,
      scale: 4,
    }).then((canvas) => {
      setImage(canvas.toDataURL("image/png"));
    });
    setImage(url);
    openModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogoFileName(file.name);
      setLogoImage(URL.createObjectURL(file));
    }
  };

  const handleSignatureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSignatureFileName(file.name);
      setSignatureImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Navbar />
      <div className="certificate-page">
        <div className="certificate-display">
          <div className="certificate-preview-container">
            <div className="certificate-manager">
              <img
                src={selectedTemplate}
                alt="certificate-preview"
                className="certificate-preview"
              />
              <div className="certificate-texts">
                <div className="info-container">
                  <div className="top-description">{topDescription ? topDescription: strings.topDescription }</div>
                  <div className="recipient-name">
                    {recipientName ? recipientName : "Name of recipient"}
                  </div>
                  <div className="description">{description ? description: strings.description }</div>
                </div>
                <div className="date-certified-container">
                  <div className="date">{date}</div>
                  <div className="certificate-manager-container ">
                    {signatureImage && (
                      <img
                        src={signatureImage}
                        alt="signature"
                        className="certificate-signature"
                      />
                    )}
                    <div className="certified-by">{certifiedBy}</div>
                  </div>
                </div>

                {logoImage && (
                  <img
                    src={logoImage}
                    alt="logo"
                    className="certificate-logo"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="certificate-templates">
          {templateImages.map((template, index) => (
            <div
              key={index}
              className={`template-box ${
                selectedTemplate === template ? "active" : ""
              }`}
              onClick={() => handleTemplateClick(template)}
            >
              <img src={template} alt={`template ${index + 1}`} />
            </div>
          ))}
        </div>

        <div className="edit-certificate">
          <h2>{strings.editCertificateTitle}</h2>
          <form>
            <div className="form-group logo-group">
              <div className="label-box">{strings.LogoLabel}</div>
              <div className="upload-box">
                <input
                  type="file"
                  id="file-upload-logo"
                  style={{ display: "none" }}
                  onChange={handleLogoUpload}
                  accept=".jpg,.jpeg,.png"
                />
                <label htmlFor="file-upload-logo" className="form-input">
                  {logoFileName}
                  <img
                    src={uploadicon}
                    alt="Upload Icon"
                    className="upload-icon"
                  />
                </label>
              </div>
            </div>

            <div className="form-group">
              <div className="label-box">{strings.topDescriptionLabel}</div>
              <input
                type="text"
                id="top-description"
                placeholder="Enter top description"
                className="form-input"
                value={topDescription}
                onChange={(e) => setTopDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <div className="label-box">{strings.recipientNameLabel}</div>
              <input
                type="text"
                id="recipient-name"
                placeholder="Enter Name"
                className="form-input"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />
              <img
                onClick={() => addName(recipientName)}
                className="add-name-icon"
                alt="add"
                src={AddIcon}
              />
            </div>
            {names.length > 0 && (
              <div className="label-box">
                {names.map((name, index) => (
                  <div key={index} className="name-chip">
                    {name}
                    <button className="remove-name-button" onClick={() => removeName(index)}>
                      <img
                        className="remove-name-img"
                        alt="cancel"
                        src={cancel}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="form-group">
              <div className="label-box">{strings.descriptionLabel}</div>
              <textarea
                id="description"
                placeholder="Enter description"
                className="form-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <div className="label-box">{strings.dateLabel}</div>
              <input
                type="date"
                id="date"
                placeholder="Enter date"
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <div className="label-box">{strings.certifiedByLabel}</div>
              <input
                type="text"
                id="certified-by"
                placeholder="Enter Name"
                className="form-input"
                value={certifiedBy}
                onChange={(e) => setCertifiedBy(e.target.value)}
              />
            </div>

            <div className="form-group signature-group">
              <div className="label-box">{strings.signatureLabel}</div>
              <div className="upload-box">
                <input
                  type="file"
                  id="file-upload-signature"
                  style={{ display: "none" }}
                  onChange={handleSignatureUpload}
                  accept=".jpg,.jpeg,.png"
                />
                <label htmlFor="file-upload-signature" className="form-input">
                  {signatureFileName}
                  <img
                    src={uploadicon}
                    alt="Upload Icon"
                    className="upload-icon"
                  />
                </label>
              </div>
            </div>
            <button
          onClick={() => {
            addName(recipientName);
            handlePress();
          }}
          className="generate-btn"
        >
          {strings.GenerateButton}
        </button>
          </form>
        </div>

        <Download
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          selectedTemplate={selectedTemplate}
          topDescription={topDescription}
          recipientName={recipientName}
          description={description}
          date={date}
          certifiedBy={certifiedBy}
          logoImage={logoImage}
          signatureImage={signatureImage}
          certificate={image}
          downloadAsPDF={downloadAsPDF}
          downloadAsImage={downloadAsImage}
        />
      </div>
    </>
  );
};

export default Certificate;
