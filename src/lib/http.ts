import axios from "axios";

export const getData = async (url: string, config?: any) => {
  try {
    const result = await axios.get(url);

    return result?.data;
  } catch (error) {
    console.error(error);
  }
};

export const postData = async (url: string, data?: any, config?: any) => {
  try {
    const result = await axios.post(url, data, config);

    return result?.data;
  } catch (error) {
    console.error(error);
  }
};
