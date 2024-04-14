import {api} from "@/lib/api/api.ts";
import {useQuery} from "react-query";
import {Profile} from "@/types.ts";

const getContractors = async () => {
	const result = await api.get<Profile[]>(`/contractors`);
	return result.data;
};

export const useGetContractors = () => useQuery('contractors', getContractors)