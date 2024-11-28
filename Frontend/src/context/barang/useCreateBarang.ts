import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "../../lib/axios";
import { DataBarangSchema } from "../../pages/pesan";

export const useCreateBarang = ({onSuccess}) => {
    return useMutation({
        mutationFn: async (value: DataBarangSchema) => {
            const barangResponse = await AxiosInstance.post('/items',value);
            return barangResponse.data
        },
        onSuccess
    })
}