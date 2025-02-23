import axios from "axios";

export const getAllUser = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/getAllUser`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData: any) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/createUser`,
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId: any) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/user/deleteUser/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId: any) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/getUserById/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId: any, data: any) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/user/updateUser/${userId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
