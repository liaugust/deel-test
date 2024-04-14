import {Button} from "../ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "../ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useGetContractors} from "@/lib/api/queries/get-contractors.query.ts";

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
					const initials = `${contractor.firstName[0]}${contractor.lastName[0]}`;
					
					return (
						<div
							key={contractor.id}
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
							
							<Button>Choose</Button>
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
}
