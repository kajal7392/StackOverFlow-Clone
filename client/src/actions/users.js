import * as api from "../api";

// Action type constants
const FETCH_ALL_MEMBERS = "FETCH_ALL_MEMBERS";
const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";

// Fetch all users (members)
export const getAllMembers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllUsers();

    // Dispatch action for successful fetch
    dispatch({ type: FETCH_ALL_MEMBERS, payload: data });
  } catch (error) {
    console.error("Failed to fetch members:", error.message);
    // Optionally dispatch an error action
    dispatch({ type: "FETCH_MEMBERS_ERROR", payload: error.message });
  }
};

// Update user profile
export const updateUserProfile = (id, updatedData) => async (dispatch) => {
  try {
    // Validate updated data (optional)
    if (!updatedData || typeof updatedData !== "object") {
      throw new Error("Invalid data provided for profile update.");
    }

    // Send request to update profile
    const { data } = await api.updateProfile(id, updatedData);

    // Dispatch action for successful profile update
    dispatch({ type: UPDATE_USER_PROFILE, payload: data });
  } catch (error) {
    console.error("Failed to update profile:", error.message);
    // Optionally dispatch an error action
    dispatch({ type: "UPDATE_PROFILE_ERROR", payload: error.message });
  }
};
