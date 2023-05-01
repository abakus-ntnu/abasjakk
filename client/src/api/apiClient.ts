import axios from "axios";

const password = encodeURIComponent("FALKERKUL")
const ApiClient = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      password: sessionStorage.getItem("admin_password")
    },
  });

export default ApiClient;
