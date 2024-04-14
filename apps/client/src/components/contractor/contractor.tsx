import {FC, useContext} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Profile} from "@/types.ts";
import {ContractorContext} from "@/context/contractor-context.tsx";

interface ContractorProps {
	contractor: Profile
}

export const Contractor: FC<ContractorProps> = ({contractor}) => {
	const {contractorId, onContractorSelect} = useContext(ContractorContext)
	
	const initials = `${contractor.firstName[0]}${contractor.lastName[0]}`;
	const isSelected = contractorId === contractor.id;
	
	return <div
		
		className="flex items-center justify-between space-x-4"
	>
		<div className="flex items-center space-x-4">
			<Avatar>
				<AvatarImage src="/avatars/01.png" />
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>
			<div>
				<p className="text-sm font-medium leading-none">
					{contractor.firstName} {contractor.lastName}
				</p>
				<p className="text-sm text-muted-foreground">contractor</p>
			</div>
		</div>
		
		<Button onClick={() => onContractorSelect(contractor.id)} disabled={isSelected}>Choose</Button>
	</div>
}