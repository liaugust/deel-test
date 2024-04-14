import {api} from "@/lib/api/api.ts";
import {Job} from "@/types.ts";
import {useQuery} from "react-query";

const getUnpaidJobs = async () => {
	const result = await api.get<Job[]>("/jobs/unpaid");
	return result.data;
};

export const useGetUnpaidJobs = () => {
	return useQuery("jobs", getUnpaidJobs);
};