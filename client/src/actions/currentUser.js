// Action type constant
const SET_USER_PROFILE = "SET_USER_PROFILE";

// Action creator to set the current user's data
export const updateUserProfile = (userData) => {
  // Validate user data (optional)
  if (!userData || typeof userData !== "object") {
    console.error("Invalid user data provided.");
    return;
  }

  // Return the action object
  return {
    type: SET_USER_PROFILE,
    payload: userData,
  };
};
