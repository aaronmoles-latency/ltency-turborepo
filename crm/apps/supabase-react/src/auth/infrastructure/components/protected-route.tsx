import React, { ComponentType } from 'react';
import { useAuth } from '../../../Auth';
import { Navigate } from 'react-router-dom';

export const protectedRoute = <T extends {}>(Component: ComponentType<T>) => {
	return (props: T) => {
		const { user } = useAuth()

		if (!user) {
			return <Navigate to={"/login"} />
		}
		return <Component {...props} />;
	};
};

