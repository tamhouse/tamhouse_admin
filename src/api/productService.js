import { instance } from "./base";

export async function getProducts() {
  const data = await instance.get(`/products`);
  return data;
}
export async function getProduct(id) {
  const res = await instance.get(`/products/${id}`);
  return res;
}
export async function postProduct(data) {
  const res = await instance.post(`/products`, data);
  return res;
}
export async function updateProduct(id, data) {
  const res = await instance.patch(`/products/${id}`, data);
  return res;
}
export async function deleteProducts(data) {
  let name = data.toString()
  const res = await instance.delete(`/products?name=`+name);
  return res;
}