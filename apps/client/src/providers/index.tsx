import {FC, PropsWithChildren} from "react";
import {ReactQueryProvider} from "./react-query/react-query.provider.tsx";

export const Providers: FC<PropsWithChildren> = ({children}) => {
	return <ReactQueryProvider>
		{children}
	</ReactQueryProvider>
}