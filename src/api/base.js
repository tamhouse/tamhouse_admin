import axios from "axios";

const baseUrl = "http://localhost:3000/v1";
export const instance = axios.create({
  baseURL: baseUrl,
  method: 'get',
});