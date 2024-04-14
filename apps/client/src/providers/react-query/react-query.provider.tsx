import {FC, PropsWithChildren} from "react";
import {QueryClient, QueryClientProvider} from "react-query";

export const ReactQueryProvider: FC<PropsWithChildren> = ({children}) => {
	const client = new QueryClient();
	
	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}