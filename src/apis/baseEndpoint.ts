import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://pinterest.paindev.net/",
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYXV0aF9jb2RlIjoiU01PVGVhbSIsInJvbGUiOjMsImlhdCI6MTcyMjYwNzEyMiwiZXhwIjoxNzI1MTk5MTIyfQ.UCCt-mIPIlCJMT239-0HNwW3uDjeYk7qmVujpfQXS-M`,
  },
});
baseApi.interceptors.request.use(
  function (request) {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
    if (currentUser) {
      request.headers.accessToken = `${currentUser.accessToken}`;
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
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await axios({
          method: "GET",
          url: "https://pinterest.paindev.net/user/refresh-token",
          headers: {
            accessToken: `Bearer ${
              JSON.parse(localStorage.getItem("currentUser") || "{}")
                .refreshToken
            }`,
          },
        });

        localStorage.setItem("currentUser", JSON.stringify(data.data));
        baseApi.defaults.headers.common[
          "accessToken"
        ] = ` ${data.data.accessToken}`;
        originalRequest.headers["accessToken"] = ` ${data.data.accessToken}`;

        return baseApi(originalRequest);
      } catch (error) {
        console.log("Refresh token failed", error);
        localStorage.removeItem("currentUser");
        window.location.href = "/news";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default baseApi;
