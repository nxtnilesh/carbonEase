import API from "../utils/api";

export const registerUser = async (email, password) => {
  return API.post("/register", { email, password });
};

export const verifyOTP = async (email, otp) => {
  return API.post("/verify-otp", { email, otp });
};

export const loginUser = async (email, password) => {
  const { data } = await API.post("/login", { email, password });
  localStorage.setItem("token", data.token);
  return data;
};

export const getProfile = async () => {
  return API.get("/profile");
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
