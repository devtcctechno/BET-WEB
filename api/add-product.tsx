import { useMutation } from "react-query";
import http from "../utils/http";
import { API_ENDPOINT } from "../utils/api-endoint";

async function fetchAddProduct(input: any) {
  return http.post(API_ENDPOINT.ADD_PRODUCT, input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export const useAddProduct = () => {
  return useMutation((input: any) => fetchAddProduct(input));
};
