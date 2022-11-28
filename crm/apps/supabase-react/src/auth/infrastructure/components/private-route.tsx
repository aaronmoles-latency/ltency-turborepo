import React, { FC, PropsWithChildren } from 'react';
import { useAuth } from '../../../Auth';
import { Navigate } from 'react-router-dom';


export const PrivateRoute: FC<PropsWithChildren> = ({ children}) => {
	const { user } = useAuth()

	if (!user) {
		return <Navigate to={"/login"} />
	}

	return <>{ children }</>
}
