import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-production-b778.up.railway.app/api",
});

export default API;
