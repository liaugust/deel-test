import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {JobsTable} from "@/components/jobs-table/jobs-table.tsx";
import {useGetUnpaidJobs} from "@/lib/api/jobs/queries/get-unpaid-jobs.query.ts";
import {useContext, useEffect} from "react";
import {ContractorContext} from "@/context/contractor-context.tsx";
import {Label} from "@/components/ui/label.tsx";

export function JobsWidget() {
	const {contractorId} = useContext(ContractorContext)
	const {data = [], refetch} = useGetUnpaidJobs(contractorId);
	
	useEffect(() => {
		if (contractorId) {
			refetch()
		}
	}, [contractorId])
	
	return (
		<Card>
			<CardHeader>
				<CardTitle>Unpaid jobs</CardTitle>
				<CardDescription>Manage your unpaid jobs.</CardDescription>
			</CardHeader>
			<CardContent>
				{contractorId ? <JobsTable jobs={data} /> : <Label>Choose contractor</Label>}
			</CardContent>
		</Card>
	);
}
