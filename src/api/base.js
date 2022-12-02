import axios from "axios";

const baseUrl = "localhost:3000";
export const instance = axios.create({
  baseURL: baseUrl,
  method: 'get',
});