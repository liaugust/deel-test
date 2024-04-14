import {FC} from "react";
import {DepositWidget} from "@/components/deposit-widget/deposit-widget.tsx";
import {ContractorsWidget} from "@/components/contractors-widget/contractors-widget.tsx";

export const ClientActions: FC = () => {
	return <div className='grid gap-8'>
		<DepositWidget />
		
		<ContractorsWidget />
	</div>
}