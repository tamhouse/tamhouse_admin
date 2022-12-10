import { instance } from "./base";

export async function getInfor() {
  const data = await instance.get(`/infor`);
  return data;
}
export async function updateInfor(data, id) {
  const res = await instance.post(`/infor/${id}`, data);
  return res;
}
