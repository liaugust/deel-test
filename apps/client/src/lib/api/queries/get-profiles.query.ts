import {api} from "@/lib/api/api.ts";
import {useQuery} from "react-query";

const getProfiles = async (type: 'client' | 'contractor') => {
	const result = await api.get<{ id: number; firstName: string; lastName: string }[]>(`/profiles?type=${type}`);
	return result.data;
};

export const useGetClients = () => useQuery('clients', () => getProfiles('client'))
