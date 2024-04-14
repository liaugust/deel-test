import {api} from "@/lib/api/api.ts";
import {useMutation, useQueryClient} from "react-query";
import {AxiosError} from "axios";

const payForJob = async (jobId: number): Promise<void> => {
	await api.post(`/jobs/${jobId}/pay`, {});
};

export const usePayForJob = <T extends number>() => {
	const queryClient = useQueryClient();
	
	return useMutation<unknown, AxiosError<{ error: string }>, T>(payForJob, {
		onSettled: async () => {
			await queryClient.invalidateQueries(["jobs"]);
			await queryClient.invalidateQueries(["profile"]);
		},
	});
};