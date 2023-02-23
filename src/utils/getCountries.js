import axios from "axios";

export const getCountries = async () => {
  try {
    const data = await axios.get("https://restcountries.com/v2/all");
    return data.data
  } catch (error) {
    console.log(error);
  }
};
