import {api} from "@/lib/api/api.ts";
import {useQuery} from "react-query";
import {Profile} from "@/types.ts";

const getProfiles = async (type: 'client' | 'contractor') => {
	const result = await api.get<Profile[]>(`/profiles?type=${type}`);
	return result.data;
};

export const useGetClients = () => useQuery('clients', () => getProfiles('client'))