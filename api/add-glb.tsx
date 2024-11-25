import { useMutation } from "react-query";
import http from "../utils/http";
import { API_ENDPOINT } from "../utils/api-endoint";

interface GlbUpload {
    id: string;
    body: any
}

async function fetchAddProductGLB(input: GlbUpload) {
  return http.post(`${API_ENDPOINT.ADD_PRODUCT}/${input.id}`, input.body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 60
  });
}

export const useAddProductGLB = () => {
  return useMutation((input: GlbUpload) => fetchAddProductGLB(input));
};
