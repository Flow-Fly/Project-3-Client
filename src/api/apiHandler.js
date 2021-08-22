import axios from 'axios';
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
      .post('/api/auth/signup', userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post('/api/auth/signin', userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get('/api/users/me')
      .then((res) => {
        console.log(`%c${res.data.email} is logged in`,
          "display: inline-block ; border: 3px solid red ; border-radius: 7px ; " +
          "padding: 10px ; margin: 20px ;")
        return res.data
      })
      .catch(errorHandler);
  },

  logout() {
    return service
      .get('/api/auth/logout')
      .then((res) => res.data)
      .catch(errorHandler);
  },

  //Users related
  getUser(userId) {
    return service
      .get('/api/users/' + userId)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUsers() {
    return service
      .get('/api/users')
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserByMail(email) {
    return service
      .get('/api/users/user?email=' + email)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  //Messenger related
  getRooms(userId) {
    return service
      .get('/api/rooms/' + userId)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  createRoom(senderId, receiverId) {
    return service
      .post('/api/rooms/', { senderId, receiverId })
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getMessages(roomId) {
    return service
      .get('/api/messages/' + roomId)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  submitMessage(message) {
    return service
      .post('/api/messages/', message)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  //Requests related to jobs
  getJobs() {
    return service
      .get('/jobs/')
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getJob(jobId) {
    return service
      .get(`/jobs/:${jobId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addJob(data) {
    return service
      .post('/jobs', data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateJob(jobId, data) {
    return service
      .patch(`/jobs/${jobId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteJob(jobId) {
    return service
      .delete(`/jobs/${jobId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  //Requests related to the post

  //Get all posts
  getAllPost() {
    return service
      .get('/posts/')
      .then((res) => res.data)
      .catch(errorHandler);
  },

  //Create New post
  createNewPost(newPost) {
    return service
      .post('/posts/', newPost)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  //Get one posts
  getOnePost(postId) {
    return service
      .get('/posts/' + postId)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  //Update one post
  updateOnePost(postId) {
    return service
      .patch('/posts/' + postId)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  //Delete one posts
  deleteOnePost(postId) {
    return service
      .delete('/posts/' + postId)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};

export default apiHandler;
