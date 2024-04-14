import {FC} from "react";
import {ContractorsWidget} from "@/components/contractors-widget/contractors-widget.tsx";
import {JobsWidget} from "@/components/jobs-widget/jobs-widget.tsx";
import {ContractorProvider} from "@/context/contractor-context.tsx";

export const ContractorActions: FC = () => {
	return <ContractorProvider>
		<div className="grid grid-cols-2 gap-x-8">
			<ContractorsWidget />
			
			<JobsWidget />
		</div>
	</ContractorProvider>
}