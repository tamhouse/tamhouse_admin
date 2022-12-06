import { instance } from "./base";

export async function getCategories() {
  const data = await instance.get(`/categories`);
  return data;
}
export async function postCategory(data) {
  const res = await instance.post(`/categories`, data);
  return res;
}
export async function updateCategory(id, data) {
  const res = await instance.patch(`/categories/${id}`, data);
  return res;
}
export async function deleteCategory(data) {
  let query = "?name="+data.name;
  if(data.parent) query = query+"&parent="+data.parent
  const res = await instance.delete(`/categories`+query);
  return res;
}