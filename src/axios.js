import axios from "axios";

const axiosClient = axios.create({
    // baseURL: process.env.REACT_APP_SERVER,
    baseURL: `http://localhost:5000/api`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
});

export default axiosClient;