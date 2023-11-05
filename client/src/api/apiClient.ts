import axios from "axios";

const ApiClient = axios.create({
  baseURL: process.env.API_URL || "http://localhost:8080",
  headers: {
    password: sessionStorage.getItem("admin_password"),
  },
});

export default ApiClient;
