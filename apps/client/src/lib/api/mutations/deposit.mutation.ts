import {api} from "@/lib/api/api.ts";
import {AxiosError} from "axios";
import {useMutation, useQueryClient} from "react-query";

const deposit = async (amount: number): Promise<void> => {
	await api.post("/balances/deposit", {amount});
};

export const useDeposit = <T extends number>() => {
	const queryClient = useQueryClient();
	
	return useMutation<unknown, AxiosError<{ error: string }>, T>(deposit, {
		onSettled: async () => {
			await queryClient.invalidateQueries(["profile"]);
		},
	});
};