import {FC, useEffect} from "react";
import {DropdownMenuItem} from "../ui/dropdown-menu";
import {usePayForJob} from "@/lib/api/jobs/mutations/pay-for-job.mutation.ts";
import {useToast} from "@/components/ui/use-toast.ts";

interface PayForJobProps {
	jobId: number;
}

export const PayForJob: FC<PayForJobProps> = ({jobId}) => {
	const {mutateAsync, error} = usePayForJob();
	const {toast} = useToast()
	
	const onPayForJob = async () => {
		await mutateAsync(jobId);
		toast({description: 'Successfully paid for the job'})
	};
	
	useEffect(() => {
		if (error) {
			toast({
				variant: 'destructive',
				description: error.response?.data.error
			})
		}
	}, [toast, error])
	
	
	return <DropdownMenuItem onClick={onPayForJob}>Pay for job</DropdownMenuItem>;
};
