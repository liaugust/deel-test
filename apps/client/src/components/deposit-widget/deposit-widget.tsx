import {FC, FormEvent, useEffect,} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useDeposit} from "@/lib/api/mutations/deposit.mutation.ts";
import {useToast} from "@/components/ui/use-toast.ts";

const AMOUNT_TO_DEPOSIT = ["1", "5", "10", "50", "100", "500"];

export const DepositWidget: FC = () => {
	const {mutateAsync, error} = useDeposit();
	const {toast} = useToast()
	
	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		const formData = new FormData(e.target as HTMLFormElement);
		
		await mutateAsync(Number(formData.get("amount")));
		toast({description: 'Successfully deposited'})
	};
	
	useEffect(() => {
		if (error) {
			toast({
				variant: 'destructive',
				description: error.response?.data.error
			})
		}
	}, [toast, error])
	
	return (
		<Card>
			<CardHeader>
				<CardTitle>Deposit</CardTitle>
				<CardDescription>Choose an amount to deposit</CardDescription>
			</CardHeader>
			<form onSubmit={onSubmit}>
				<CardContent className="grid gap-6">
					<RadioGroup
						name="amount"
						className="grid grid-cols-6 gap-4"
						defaultValue={AMOUNT_TO_DEPOSIT[0]}
					>
						{AMOUNT_TO_DEPOSIT.map((amount) => (
							<div key={amount}>
								<RadioGroupItem
									value={amount}
									id={amount}
									className="peer sr-only"
									aria-label={amount}
								/>
								<Label
									htmlFor={amount}
									className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
								>
									{amount}
								</Label>
							</div>
						))}
					</RadioGroup>
				</CardContent>
				<CardFooter>
					<Button type="submit" className="w-full">
						Continue
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}