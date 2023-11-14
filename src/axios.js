import axios from "axios";

const axiosClient = axios.create({
    baseURL: `https://video-sharing-app-x6z9.onrender.com/api`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
});

export default axiosClient;