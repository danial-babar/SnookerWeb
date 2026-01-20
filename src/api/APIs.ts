import axios from "axios";

// Set the base URL of the API
export const BASE_URL = "https://snooker.orangehost.info/api.php";

// Function to get userId from localStorage (for use in interceptors)
const getUserId = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("hashedUserId");
  }
  return null;
};

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add request interceptor to automatically include userId in all API requests
api.interceptors.request.use(
  (config) => {
    const userId = getUserId();
    
    // Ensure userId is always included in request params
    if (userId) {
      // Initialize params if it doesn't exist
      if (!config.params) {
        config.params = {};
      }
      // Add userId to params (will be sent as query parameter)
      config.params.userId = userId;
    } else {
      // If no userId is found, log a warning (but don't block the request)
      console.warn("Warning: No userId found in localStorage. API request may fail. User should visit with ?id=hashedUserId parameter.");
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
        // userId will be automatically added by interceptor
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while getting single match:", error);
    throw error;
  }
};

// Function to get top scorers (player stats)
export const getTopScorers = async (pageNo: number = 1) => {
  try {
    const response = await api.get("", {
      params: {
        j: "report_top_scorer",
        page_no: pageNo,
        // userId will be automatically added by interceptor
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while getting top scorers:", error);
    throw error;
  }
};

export default api;
