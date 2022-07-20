import { useState } from "react";
import Axios from "../../axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

function AdminItemForm() {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [percentage, setPercentage] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const clearAllInputs = () => {
    setImageUrl("");
    setErrMsg("");
    setTitle("");
    setPrice("");
    setPercentage("");
  };

  const postProductDataAndCreate = async () => {
    const productData = {
      imageUrl,
      title,
      price,
      percentageOff: percentage,
    };

    const jwtToken = Cookies.get("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await Axios.post("/products", productData, config)
      .then(() => {
        console.log("sfaffa");
      })
      .catch((err) => console.log(`admin form creating item ${err}`));
  };

  const isInteger = (value) => {
    const parsedInt = parseInt(value);

    if (isNaN(parsedInt)) {
      return false;
    }

    if (parsedInt.toString().length !== value.length) {
      return false;
    }

    return true;
  };

  const checkInputsValidations = () => {
    if (imageUrl == "" || title == "" || price == "" || percentage == "") {
      setErrMsg("*Fill the required fields");
      return false;
    }

    if (!isInteger(price)) {
      setErrMsg("*Enter valid price");
      return false;
    }

    if (!isInteger(percentage)) {
      setErrMsg("*Enter valid percentage");
      return false;
    }

    setErrMsg("");
    return true;
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (checkInputsValidations()) {
      postProductDataAndCreate();
      clearAllInputs();
      navigate("/admin");
      // entering all clear proceed
    } else {
      // error occuree while fillign the form
    }
  };

  return (
    <div className="admin-form">
      <img
        alt="form bg"
        src="https://img.freepik.com/free-vector/gradient-intranet-illustration_23-2149368727.jpg?w=2000"
      />

      <form className="admin-form__form" onSubmit={onSubmitForm}>
        <div>
          <label htmlFor="image">IMAGE URL</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            id="image"
            type="text"
            placeholder="Enter Image Url"
          />
        </div>
        <div>
          <label htmlFor="title">TITLE</label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            placeholder="Enter title"
          />
        </div>

        <div className="price_percentage_rating">
          <div>
            <label htmlFor="price">PRICE</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id="price"
              type="text"
              placeholder="Price"
            />
          </div>
          <div>
            <label htmlFor="percentageOff">PERCENTAGE OFF</label>
            <input
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              id="percentageOff"
              type="text"
              placeholder="Percentage %"
            />
          </div>
        </div>

        <button type="submit">Submit</button>
        {errMsg.length > 0 ? <p className="form_error">{errMsg}</p> : null}
      </form>
    </div>
  );
}

export default AdminItemForm;
