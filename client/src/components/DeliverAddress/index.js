import { useState } from "react";
import AppContext from "../../context/AppContext";
import Axios from "../../axios";

import { TailSpin } from "react-loader-spinner";

import "./index.css";

function DeliverAddress({ getTransactionDetails }) {
  const [imageLoadingStatus, setImageLoadingStatus] = useState("INITIAL");
  const [erroMsg, setErrorMsg] = useState(false);
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [showAddress, setShowAddress] = useState(false);
  const [file, setFile] = useState("");
  const [cloudinaryImgUrl, setCloudinaryImagUrl] = useState("");

  return (
    <AppContext.Consumer>
      {(value) => {
        const onChangeFile = (e) => {
          setImageLoadingStatus("LOADING");
          const file = e.target.files[0];

          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "awqrygqn");

          const url = "https://api.cloudinary.com/v1_1/drgclgorx/image/upload";
          Axios.post(url, formData)
            .then((r) => {
              const cloudImagUrl = r.data.secure_url;
              setCloudinaryImagUrl(cloudImagUrl);
              setImageLoadingStatus("SUCCESS");
            })
            .catch((err) => {
              setImageLoadingStatus("FAILURE");
            });

          setFile(URL.createObjectURL(e.target.files[0]));
        };

        const addressResultSection = () => {
          return (
            <div className="address-results">
              <p>{address} </p>
              <p>Ph: {number}</p>
              {file.length > 0 ? <img alt="transa" src={file} /> : null}

              <button type="button" onClick={() => setShowAddress(false)}>
                Edit
              </button>
            </div>
          );
        };

        const onsubmitAddress = () => {
          if (address == "" || file == "" || number == "") {
            setErrorMsg(true);
          } else {
            setErrorMsg(false);
            setShowAddress(true);
            const transactionDetails = {
              phoneNumber: number,
              address,
              transactionImageUrl: cloudinaryImgUrl,
            };
            getTransactionDetails(transactionDetails);
          }
        };

        const imageFailureView = () => {
          return (
            <p>
              <strong>Image uploading failure retry again</strong>
            </p>
          );
        };

        const loadingView = () => {
          return (
            <div className="image-loader">
              <TailSpin color="#00BFFF" height={50} width={50} />;
            </div>
          );
        };

        const imageLoadingSuccessView = () => {
          return cloudinaryImgUrl.length > 0 ? (
            <img alt="transaction screenshot" src={cloudinaryImgUrl} />
          ) : null;
        };

        const getImageLoadingStatus = () => {
          switch (imageLoadingStatus) {
            case "LOADING":
              return loadingView();
            case "SUCCESS":
              return imageLoadingSuccessView();
            case "FAILURE":
              return imageFailureView();
            default:
              return null;
          }
        };

        const getAddressInputSection = () => {
          return (
            <div className="input-section">
              <div>
                <label htmlFor="number">Number: </label>
                <input
                  id="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  type="text"
                  placeholder="Enter Phone number"
                />
              </div>

              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
              />

              <div className="file_uploading">
                <label htmlFor="file">Upload transaction screenshot: </label>
                <p>Phone pay, Google pay, Paytm, other cards Accepted</p>
                <input
                  id="file"
                  type="file"
                  placeholder="Add Transaction"
                  onChange={onChangeFile}
                />
                {getImageLoadingStatus()}
              </div>

              <button type="button" onClick={onsubmitAddress}>
                Submit
              </button>
              {erroMsg && <p className="error">*Fill Required fields</p>}
            </div>
          );
        };

        return (
          <div className="deliver-address">
            {showAddress ? addressResultSection() : getAddressInputSection()}
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}

export default DeliverAddress;
