import {api} from "@/lib/api/api.ts";
import {Job} from "@/types.ts";
import {useQuery} from "react-query";

const getUnpaidJobs = async (contractorId: number) => {
	const endpoint = contractorId ? `/jobs/unpaid?contractorId=${contractorId}` : "/jobs/unpaid";
	const result = await api.get<Job[]>(endpoint);
	return result.data;
};

export const useGetUnpaidJobs = (contractorId: number | null) => {
	return useQuery("jobs", () => getUnpaidJobs(contractorId!), {enabled: !!contractorId})
};