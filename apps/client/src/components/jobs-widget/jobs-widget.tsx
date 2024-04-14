import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {JobsTable} from "@/components/jobs-table/jobs-table.tsx";
import {useGetUnpaidJobs} from "@/lib/api/jobs/queries/get-unpaid-jobs.query.ts";

export function JobsWidget() {
	const {data = []} = useGetUnpaidJobs();
	
	return (
		<Card>
			<CardHeader>
				<CardTitle>Unpaid jobs</CardTitle>
				<CardDescription>Manage your unpaid jobs.</CardDescription>
			</CardHeader>
			<CardContent>
				<JobsTable jobs={data} />
			</CardContent>
		</Card>
	);
}
