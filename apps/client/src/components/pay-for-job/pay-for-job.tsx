import {FC} from "react";
import {DropdownMenuItem} from "../ui/dropdown-menu";
import {usePayForJob} from "@/lib/api/jobs/mutations/pay-for-job.mutation.ts";

interface PayForJobProps {
	jobId: number;
}

export const PayForJob: FC<PayForJobProps> = ({jobId}) => {
	const {mutateAsync} = usePayForJob();
	
	const onPayForJob = async () => {
		await mutateAsync(jobId);
	};
	
	return <DropdownMenuItem onClick={onPayForJob}>Pay for job</DropdownMenuItem>;
};
