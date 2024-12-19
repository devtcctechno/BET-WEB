import { useMutation } from "react-query";
import http from "../utils/http";
import { API_ENDPOINT } from "../utils/api-endoint";

async function fetchDeleteProduct(input: string) {
  return http.delete(`${API_ENDPOINT.DELETE_PRODUCT}/${input}`);
}

export const useDeleteProduct = () => {
  return useMutation((input: string) => fetchDeleteProduct(input));
};
