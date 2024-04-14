import {useMutation, useQueryClient} from "react-query";

const authenticate = async (profileId: number) => {
	localStorage.setItem("profile_id", profileId.toString());
};

export const useAuthenticate = <T extends number>() => {
	const queryClient = useQueryClient();
	
	return useMutation<unknown, unknown, T>(authenticate, {
		onSettled: async () => {
			await queryClient.invalidateQueries(["profile"]);
		},
	});
};