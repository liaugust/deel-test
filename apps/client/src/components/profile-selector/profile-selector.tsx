import {FC, useCallback} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

interface ProfileSelectorProps {
	profiles: { id: number; firstName: string; lastName: string }[]
	onProfileChoose: (profileId: number) => void
}

export const ProfileSelector: FC<ProfileSelectorProps> = ({profiles, onProfileChoose}) => {
	const handleChangeProfile = useCallback(
		(profileId: string) => {
			onProfileChoose(Number(profileId));
		},
		[onProfileChoose]
	);
	
	return (
		<Select onValueChange={handleChangeProfile}>
			<SelectTrigger className="w-[200px]">
				<SelectValue placeholder="Choose profile to login" />
			</SelectTrigger>
			<SelectContent>
				{profiles.map((profile) => (
					<SelectItem key={profile.id} value={profile.id.toString()}>
						{profile.firstName} {profile.lastName}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}