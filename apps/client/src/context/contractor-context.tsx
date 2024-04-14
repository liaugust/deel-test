import {createContext, FC, PropsWithChildren, useState} from "react";

interface ContractorContextValue {
	contractorId: number | null;
	onContractorSelect: (id: number) => void
}

export const ContractorContext = createContext<ContractorContextValue>({} as ContractorContextValue);

export const ContractorProvider: FC<PropsWithChildren> = ({children}) => {
	const [contractorId, setContractorId] = useState<number | null>(null)
	
	const onContractorSelect = (id: number) => {
		setContractorId(id)
	}
	
	return <ContractorContext.Provider value={{onContractorSelect, contractorId}}>{children}</ContractorContext.Provider>
}