import {FC} from "react";
import {ProfileSelector} from "@/components/profile-selector/profile-selector.tsx";

export const Header: FC = () => {
	return <div>
		<ProfileSelector profiles={[]} onProfileChoose={console.log} />
	</div>
}