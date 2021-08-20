import axios from "axios";
//import { getHeapCodeStatistics } from "v8";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

const apiHandler = {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/users/me")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  // getItems() {
  //   return service
  //     .get("/api/items")
  //     .then((res) => res.data)
  //     .catch(errorHandler);
  // },

  getRooms(userId){
    return service
      .get("/api/rooms/" + userId)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  // getUser(userId){
  //   return service
  //     .get("/api/users/" + userId)
  //     .then((res) => res.data)
  //     .catch(errorHandler);
  // },

  getMessages(roomId){
    return service
    .get("/api/messages/" + roomId)
    .then((res) => res.data)
    .catch(errorHandler);
  },

  submitMessage(message){
    return service
    .post("/api/messages/", message)
    .then((res) => res.data)
    .catch(errorHandler);
  },

  //Requests related to the post

  //Get all posts
  getAllPost(){
    return service
    .get("/posts/")
    .then((res)=>res.data)
    .catch(errorHandler)
  },

  //Create New post
  createNewPost(newPost){
    return service
    .post("/posts/",newPost)
    .then((res)=>res.data)
    .catch(errorHandler)
  },

  //Get one posts
  getOnePost(postId){
    return service
    .get("/posts/"+postId)
    .then((res)=>res.data)
    .catch(errorHandler)
  },

  //Update one post
  updateOnePost(postId){
    return service
    .patch("/posts/"+postId)
    .then((res)=>res.data)
    .catch(errorHandler)
  },

  //Delete one posts
  deleteOnePost(postId){
    return service
    .delete("/posts/"+postId)
    .then((res)=>res.data)
    .catch(errorHandler)
  },
};

export default apiHandler;
