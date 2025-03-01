import * as api from "../api";

// Action type constants
const CREATE_POST = "CREATE_POST";
const FETCH_ALL_POSTS = "FETCH_ALL_POSTS";
const ADD_REPLY = "ADD_REPLY";
const REMOVE_POST = "REMOVE_POST";
const UPVOTE_POST = "UPVOTE_POST";
const REMOVE_REPLY = "REMOVE_REPLY";

// Create a new post
export const createPost = (postData, navigate) => async (dispatch) => {
  try {
    // Validate post data (optional)
    if (!postData.title || !postData.body) {
      throw new Error("Please provide a title and body for the post.");
    }

    // Send request to create a post
    const { data } = await api.postQuestion(postData);

    // Dispatch action for successful post creation
    dispatch({ type: CREATE_POST, payload: data });

    // Fetch all posts to update the list
    dispatch(getAllPosts());

    // Redirect to the homepage
    navigate("/");
  } catch (error) {
    console.error("Failed to create post:", error.message);
    // Optionally dispatch an error action
    dispatch({ type: "POST_ERROR", payload: error.message });
  }
};

// Fetch all posts
export const getAllPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getAllQuestions();
    dispatch({ type: FETCH_ALL_POSTS, payload: data });
  } catch (error) {
    console.error("Failed to fetch posts:", error.message);
    // Optionally dispatch an error action
    dispatch({ type: "FETCH_ERROR", payload: error.message });
  }
};

// Add a reply to a post
export const addReply = (replyData) => async (dispatch) => {
  try {
    const { id, noOfAnswers, answerBody, userAnswered, userId } = replyData;

    // Validate reply data (optional)
    if (!answerBody || !userAnswered) {
      throw new Error("Please provide a valid reply.");
    }

    // Send request to add a reply
    const { data } = await api.postAnswer(
      id,
      noOfAnswers,
      answerBody,
      userAnswered,
      userId
    );

    // Dispatch action for successful reply addition
    dispatch({ type: ADD_REPLY, payload: data });

    // Fetch all posts to update the list
    dispatch(getAllPosts());
  } catch (error) {
    console.error("Failed to add reply:", error.message);
    // Optionally dispatch an error action
    dispatch({ type: "REPLY_ERROR", payload: error.message });
  }
};

// Delete a post
export const removePost = (id, navigate) => async (dispatch) => {
  try {
    await api.deleteQuestion(id);

    // Fetch all posts to update the list
    dispatch(getAllPosts());

    // Redirect to the homepage
    navigate("/");
  } catch (error) {
    console.error("Failed to delete post:", error.message);
    // Optionally dispatch an error action
    dispatch({ type: "DELETE_ERROR", payload: error.message });
  }
};

// Upvote a post
export const upvotePost = (id, value, userId) => async (dispatch) => {
  try {
    await api.voteQuestion(id, value, userId);

    // Fetch all posts to update the list
    dispatch(getAllPosts());
  } catch (error) {
    console.error("Failed to upvote post:", error.message);
    // Optionally dispatch an error action
    dispatch({ type: "VOTE_ERROR", payload: error.message });
  }
};

// Delete a reply
export const removeReply = (id, answerId, noOfAnswers) => async (dispatch) => {
  try {
    await api.deleteAnswer(id, answerId, noOfAnswers);

    // Fetch all posts to update the list
    dispatch(getAllPosts());
  } catch (error) {
    console.error("Failed to delete reply:", error.message);
    // Optionally dispatch an error action
    dispatch({ type: "DELETE_REPLY_ERROR", payload: error.message });
  }
};
