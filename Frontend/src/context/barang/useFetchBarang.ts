import { AxiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchBarang = ()=> {
    return  useQuery({queryKey:['barang'], 
            queryFn: async ()=> {
                const barangResponse = AxiosInstance.get('/barang');

                return barangResponse
            } })
}