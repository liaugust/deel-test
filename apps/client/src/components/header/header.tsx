import {FC} from "react";
import {ProfileSelector} from "@/components/profile-selector/profile-selector.tsx";
import {useGetClients} from "@/lib/api/queries/get-profiles.query.ts";

export const Header: FC = () => {
	const {data = []} = useGetClients()
	
	return <div>
		<ProfileSelector profiles={data} onProfileChoose={console.log} />
	</div>
}