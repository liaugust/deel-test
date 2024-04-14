import {FC} from "react";
import {DepositWidget} from "@/components/deposit-widget/deposit-widget.tsx";
import {ContractorActions} from "@/components/contractor-actions/contractor-actions.tsx";

export const ClientActions: FC = () => {
	return <div className='grid gap-8'>
		<DepositWidget />
		
		<ContractorActions />
	</div>
}