import {Header} from "@/components/header/header.tsx";
import {useGetProfile} from "@/lib/api/queries/get-profile.query.ts";
import {ClientActions} from "@/components/client-actions/client-actions.tsx";
import {Toaster} from "@/components/ui/toaster"


function App() {
	const {data} = useGetProfile()
	
	return (
		<div className='max-w-[1280px] w-full m-auto p-4 grid gap-8'>
			<Header />
			
			{data && <ClientActions />}
			
			<Toaster />
		</div>
	)
}

export default App
