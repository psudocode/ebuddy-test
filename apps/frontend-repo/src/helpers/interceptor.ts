import axios from "axios";
import { store } from "@/stores/store";
import { logout } from "@/stores/authSlice";

//Defaults will be combined with the instance
axios.defaults.baseURL = "http://localhost:3000";

//Create Axios Instance
const axiosInstance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
  },
});

//Add interceptors to instance
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.log("Network Error");
    } else if (error.response.status === 401) {
      console.log(error.response.status);
      store.dispatch(logout());
    }
    return error;
  }
);

export default axiosInstance;
