import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

import Axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./index.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erroMsg, setErrorMessage] = useState("");

  const onSubmitSuccess = (jwtToken, userDetails) => {
    Cookies.set("jwtToken", jwtToken, { expires: 10 });
    Cookies.set("userDetails", JSON.stringify(userDetails), { expires: 10 });

    setErrorMessage("");
    navigate("/");
  };

  const fetchJwtToken = async () => {
    const userDetails = { username: email, password };

    await Axios.post("/login", userDetails)
      .then((response) => {
        onSubmitSuccess(response.data.jwtToken, response.data.userDetails);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    fetchJwtToken();
  };

  const jwtToken = Cookies.get("jwtToken");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login">
      <div className="login__body">
        <img
          alt="website logo"
          src="http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG"
        />

        <form className="login__form" onSubmit={onSubmitForm}>
          <h2>Sign in </h2>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="text"
              placeholder="Email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>

          <button type="submit"> Sign In</button>
          {erroMsg.length > 0 ? (
            <p className="error_message">{erroMsg}</p>
          ) : null}

          <p>
            By signing-in you agree to the AMAZON devleoped by @sbch Condtions
            of User & sale. Please see our privacy notice, our Cookies and our
            interest-based Ads Notice.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="crate_account_btn"
            type="button"
          >
            Create your Amazon Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
