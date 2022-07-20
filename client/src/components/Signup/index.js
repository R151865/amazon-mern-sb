import { useNavigate } from "react-router-dom";

import { useState } from "react";

import Axios from "../../axios";
import "./index.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchPostUserDetails = async () => {
    const userDetails = {
      name,
      username: email,
      password,
    };

    await Axios.post("/signup", userDetails)
      .then((response) => {
        navigate("/login");
        setErrorMsg("");
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
      });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    fetchPostUserDetails();
  };

  return (
    <div>
      <div className="singup__body">
        <img
          alt="website logo"
          src="http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG"
        />
        <form className="singup__form" onSubmit={onSubmitForm}>
          <h3>Hey there! create new account</h3>
          <div>
            <label htmlFor="name">Your name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              placeholder="First and last name"
            />
          </div>
          <div>
            <label htmlFor="email">Your email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="text"
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="password">Your password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>

          <button type="submit">Create Account</button>
          {errorMsg.length > 0 && <p className="error_msg">{errorMsg}</p>}

          <p>
            Already have account? <a href="/login">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
