import axios from "axios";

const backendUrl = "https://amazon-backend-sb.herokuapp.com";

const Axios = axios.create({
  baseURL: backendUrl,
});

export default Axios;
