import axios from 'axios';

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
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get('/api/auth/logout')
      .then((res) => res.data)
      .catch(errorHandler);
  },

  // getItems() {
  //   return service
  //     .get("/api/items")
  //     .then((res) => res.data)
  //     .catch(errorHandler);
  // },

  getRooms(userId) {
    return service
      .get('/api/rooms/' + userId)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  // getUser(userId){
  //   return service
  //     .get("/api/users/" + userId)
  //     .then((res) => res.data)
  //     .catch(errorHandler);
  // },

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

  getJobs() {
    return service
      .get('/jobs')
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
};

export default apiHandler;
