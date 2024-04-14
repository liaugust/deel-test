import {api} from "@/lib/api/api.ts";
import {useQuery} from "react-query";

const getContractors = async () => {
	const result = await api.get<{ id: number; firstName: string; lastName: string }[]>(`/contractors`);
	return result.data;
};

export const useGetContractors = () => useQuery('contractors', getContractors)