import axios from "axios";

// Create an Axios instance with a base URL
const API = axios.create({
  baseURL: "https://my-dev-community-server.onrender.com",
});

// Add request interceptor to attach authorization token
API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

// Add response interceptor for error handling (optional)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

// Authentication
export const authenticateUser = (authData) => API.post("/auth/login", authData);
export const registerUser = (authData) => API.post("/auth/signup", authData);

// Posts
export const createPost = (postData) => API.post("/posts/create", postData);
export const fetchAllPosts = () => API.get("/posts/all");
export const deletePost = (id) => API.delete(`/posts/delete/${id}`);
export const upvotePost = (id, value, userId) =>
  API.patch(`/posts/vote/${id}`, { value, userId });

// Replies
export const addReply = (id, noOfReplies, replyBody, userReplied, userId) =>
  API.patch(`/replies/add/${id}`, {
    id,
    noOfReplies,
    replyBody,
    userReplied,
    userId,
  });
export const deleteReply = (id, replyId, noOfReplies) =>
  API.patch(`/replies/delete/${id}`, { replyId, noOfReplies });

// Users
export const fetchAllUsers = () => API.get("/users/all");
export const updateUserProfile = (id, updatedData) =>
  API.patch(`/users/update/${id}`, updatedData);
