import axios from "axios";
import { url } from "./url";

export const get = (route) => {
  const localToken = localStorage.getItem("localToken");
  console.log("This was taken out of localStorage", localToken);

  return axios.get(`${url}${route}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localToken,
    },
  });
};

export const post = (route, body) => {
  const localToken = localStorage.getItem("localToken");
  console.log("This was taken out of localStorage", localToken);

  return axios.post(`${url}${route}`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localToken,
    },
  });
};
