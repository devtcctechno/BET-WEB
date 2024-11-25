import { useMutation } from "react-query";
import http from "../utils/http";
import { API_ENDPOINT } from "../utils/api-endoint";

async function fetchDeleteProductGLB(input: string) {
  return http.delete(`${API_ENDPOINT.DELETE_GLB}/${input}`);
}

export const useDeleteProductGLB = () => {
  return useMutation((input: string) => fetchDeleteProductGLB(input));
};
