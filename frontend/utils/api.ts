import axios from "axios";
import { getAuthToken } from "./authToken.js";

const API = axios.create({
  // baseURL: "http://localhost:4000/api",
  baseURL:process.env.REACT_APP_SERVER_URL,
  method: "GET",
  headers: { "Content-Type": "application/json","ngrok-skip-browser-warning": "true" },
});

API.interceptors.request.use(async (config) => {
  const jsonString  = await getAuthToken(); 
  const token = JSON.parse(jsonString)?.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// API Người dùng
export const getUsers = () => API.get("/users");
export const createUser = (userData: any) => API.post("/users", userData);

// API Họp (Meetings)
export const getMeetings = () => API.get("/meetings");
export const createMeeting = (meetingData: any) => API.post("/meetings", meetingData);
export const updateMeeting = (id: any, meetingData: any) => API.put(`/meetings/${id}`, meetingData);
export const deleteMeeting = (id: any) => API.delete(`/meetings/${id}`);
export const getMeetingByCodeMeeting = (meetingCode: any) => API.get(`/meetings/${meetingCode}`)
export const getMeetingByUser = (userId: any) =>API.get(`/meetings/user/${userId}`)

// API Tin nhắn (Messages)
export const getMessages = (meetingId: any) => API.get(`/messages?meetingId=${meetingId}`);
export const sendMessage = (messageData: any) => API.post("/messages", messageData);

// API Xác thực (Auth)
export const signup = (userData: any) => API.post("/auth/signup", userData);
export const login = (credentials: any) => API.post("/auth/login", credentials);

export default API;
