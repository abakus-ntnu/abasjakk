import axios from "axios";

const password = encodeURIComponent("FALKERKUL")
const ApiClient = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "password": password
    },
});

export default ApiClient;
