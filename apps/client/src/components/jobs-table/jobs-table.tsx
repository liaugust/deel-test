import {DataTable} from "@/components/data-table/data-table.tsx";
import {FC} from "react";
import {Job} from "@/types.ts";
import {columns} from "@/components/jobs-table/columns.tsx";

interface JobsTableProps {
	jobs: Job[];
}

export const JobsTable: FC<JobsTableProps> = ({jobs}) => {
	return <DataTable data={jobs} columns={columns} />
}