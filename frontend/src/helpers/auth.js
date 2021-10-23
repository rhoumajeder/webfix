import { isExpired, decodeToken } from "react-jwt";
import axios from "axios";
import { useHistory } from "react-router";
import axiosInstance from "./axios";

// export const login = (formData) => {
//     return axios
//         .post(`/api/auth/token`, formData)
// }

// export const register = (formData) => {
//     return axios
//         .post(`/api/auth/signup`, formData)
// }

// const requireAuth = () => {
//     if(!localStorage.getItem('access_token')) {
//       history.push('/login');
//     }
//     // stay on this route since the user is authenticated
//   }

// export const getUserID = () => {
//     const token = JSON.parse(localStorage.getItem("access_token"))
//     if(!token) {
//         return null
//     }
//     const decoded = decodeToken(token.access);
//     return decoded.user_id;
// }