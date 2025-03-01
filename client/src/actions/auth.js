import * as api from "../api";
import { setCurrentUser } from "./currentUser";

// Action type constants
const USER_AUTH = "USER_AUTH";

// Register a new user
export const registerUser = (userCredentials, navigate) => async (dispatch) => {
  try {
    // Validate user input (optional)
    if (!userCredentials.name || !userCredentials.email || !userCredentials.password) {
      throw new Error("Please fill in all fields.");
    }

    // Send registration request to the API
    const { data } = await api.signUp(userCredentials);

    // Dispatch action for successful authentication
    dispatch({ type: USER_AUTH, data });

    // Set the current user in the Redux store
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile")));

    // Redirect to the homepage
    navigate("/");
  } catch (error) {
    console.error("Registration failed:", error.message);
    // Optionally dispatch an error action
    dispatch({ type: "AUTH_ERROR", payload: error.message });
  }
};

// Log in an existing user
export const authenticateUser = (userCredentials, navigate) => async (dispatch) => {
  try {
    // Validate user input (optional)
    if (!userCredentials.email || !userCredentials.password) {
      throw new Error("Please provide email and password.");
    }

    // Send login request to the API
    const { data } = await api.logIn(userCredentials);

    // Dispatch action for successful authentication
    dispatch({ type: USER_AUTH, data });

    // Set the current user in the Redux store
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile")));

    // Redirect to the homepage
    navigate("/");
  } catch (error) {
    console.error("Login failed:", error.message);
    // Optionally dispatch an error action
    dispatch({ type: "AUTH_ERROR", payload: error.message });
  }
};

