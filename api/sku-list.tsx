import { useQuery } from "react-query";
import http from "../utils/http";
import { API_ENDPOINT } from "../utils/api-endoint";

export const fetchSkuList = async () => {
  const { data } = await http.get(API_ENDPOINT.SKU_LIST);
  return data;
};
export const useSkuList = () => {
  return useQuery([API_ENDPOINT.SKU_LIST], fetchSkuList, {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
