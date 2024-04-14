import {FC} from "react";
import {DepositWidget} from "@/components/deposit-widget/deposit-widget.tsx";
import {ContractorsWidget} from "@/components/contractors-widget/contractors-widget.tsx";
import {JobsWidget} from "@/components/jobs-widget/jobs-widget.tsx";

export const ClientActions: FC = () => {
	return <div className='grid gap-8'>
		<DepositWidget />
		
		<div className="grid grid-cols-2 gap-x-8">
			<ContractorsWidget />
			
			<JobsWidget />
		</div>
	</div>
}