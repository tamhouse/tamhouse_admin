import { instance } from "./base";

export async function get() {
  const data = await instance.get(`/slide`);
  return data;
}
export async function post(data) {
  const res = await instance.post(`/slide`, data);
  return res;
}
