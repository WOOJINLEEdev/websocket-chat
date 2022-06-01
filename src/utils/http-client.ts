import axios from "axios";

export const instance = axios.create({
  timeout: 5 * 1000,
});
