import axios from "axios";

const ApiClient = axios.create({
    baseURL: "http://localhost:8000"
});

export default ApiClient;