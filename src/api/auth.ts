import axios from "axios";

export const FetchLoginUser = async (email: any, password: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {
        email,
        password,
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const FetchregisterUser = async (
  name: any,
  email: any,
  password: any
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/register`,

      {
        name,
        email,
        password,
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};
export const fetchLogout = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
