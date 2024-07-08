import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://pinterest.paindev.net/",
  headers: {
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYXV0aF9jb2RlIjoiU01PVGVhbSIsInJvbGUiOjMsImlhdCI6MTcxOTk5NjkzMiwiZXhwIjoxNzIyNTg4OTMyfQ.kDyXmvKqOzPXEDvHegTwiOj7Yzp4bgCGuvdhF-D_5MA",
  },
});
export default baseApi;
