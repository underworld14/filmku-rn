import axios from "axios";

const API_KEY = "cc832ab994aa10f683626fc13625c1df";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000,
  params: {
    api_key: API_KEY,
  },
});

export default api;
