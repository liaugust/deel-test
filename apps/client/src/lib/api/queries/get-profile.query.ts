import {useQuery} from "react-query";
import {api} from "@/lib/api/api.ts";

const getProfile = async () => {
	const result = await api.get<{ id: number; firstName: string; lastName: string; balance: number }>("/profile");
	return result.data;
};

export const useGetProfile = () => {
	return useQuery("profile", getProfile);
};