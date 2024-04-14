import {FC} from "react";
import {ProfileSelector} from "@/components/profile-selector/profile-selector.tsx";
import {useGetClients} from "@/lib/api/queries/get-profiles.query.ts";
import {useGetProfile} from "@/lib/api/queries/get-profile.query.ts";
import {useAuthenticate} from "@/lib/api/mutations/authenticate.mutation.ts";

export const Header: FC = () => {
	const {data: profiles = []} = useGetClients()
	const {mutate} = useAuthenticate()
	const {data} = useGetProfile()
	
	return <div className='flex items-center gap-x-4'>
		{data &&
			<div>
				<div>Welcome back, {data.firstName}</div>
				<div>Your balance: ${data.balance.toFixed(2)}</div>
			</div>}
		<ProfileSelector profiles={profiles} onProfileChoose={mutate} />
	</div>
}