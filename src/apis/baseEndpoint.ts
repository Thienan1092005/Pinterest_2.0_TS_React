import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://pinterest.paindev.net/",
  headers: {
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYXV0aF9jb2RlIjoiU01PVGVhbSIsInJvbGUiOjMsImlhdCI6MTcxOTk5NjkzMiwiZXhwIjoxNzIyNTg4OTMyfQ.kDyXmvKqOzPXEDvHegTwiOj7Yzp4bgCGuvdhF-D_5MA",
  },
});

baseApi.interceptors.request.use(
  function (request) {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
    if (currentUser) {
      request.headers.accessToken = currentUser.accessToken;
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

baseApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.data.statusCode === 401) {
      localStorage.removeItem("currentUser");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default baseApi;
