import axios from "axios";

export const fetchUserProfile = async (setUserProfile) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const resp = await axios.get("http://localhost:3000/api/profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserProfile(resp);
  } catch (error) {
    throw error;
  }
};
