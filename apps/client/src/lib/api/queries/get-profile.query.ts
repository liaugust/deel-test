import {useQuery} from "react-query";
import {api} from "@/lib/api/api.ts";
import {Profile} from "@/types.ts";

const getProfile = async () => {
	const result = await api.get<Profile>("/profile");
	return result.data;
};

export const useGetProfile = () => {
	return useQuery("profile", getProfile);
};