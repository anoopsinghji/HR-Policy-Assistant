import axios from "axios";

const api = axios.create({

    baseURL: import.meta.env.VITE_API_BASE_URL || "https://hr-policy-assistant-b595.onrender.com/"

});

export default api;

