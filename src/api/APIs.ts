import axios from "axios";

// Set the base URL of the API
export const BASE_URL = "https://snooker.orangehost.info/api.php";

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Function to get public match list
export const getMatchesPublic = async (pageNo = 1) => {
  try {
    const response = await api.get("", {
      params: {
        j: "get_matches_public",
        page_no: pageNo,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while getting matches:", error);
    throw error;
  }
};

// Function to get a single match by ID
export const getSingleMatchPublic = async (matchId: string) => {
  try {
    const response = await api.get("", {
      params: {
        j: "get_single_match_public",
        matchId: matchId, // ✅ Correct parameter name
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while getting single match:", error);
    throw error;
  }
};

export default api;
