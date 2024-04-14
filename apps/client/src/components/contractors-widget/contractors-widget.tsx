import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "../ui/card";
import {useGetContractors} from "@/lib/api/queries/get-contractors.query.ts";
import {Contractor} from "@/components/contractor/contractor.tsx";

export function ContractorsWidget() {
	const {data = []} = useGetContractors();
	
	return (
		<Card>
			<CardHeader>
				<CardTitle>Contractors</CardTitle>
				<CardDescription>Manage your unpaid jobs.</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-6">
				{data.map((contractor) => {
					return (
						<Contractor key={contractor.id} contractor={contractor} />
					);
				})}
			</CardContent>
		</Card>
	);
}
