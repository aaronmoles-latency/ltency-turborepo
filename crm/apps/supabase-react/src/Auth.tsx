import React, { useContext, useState, useEffect, FC, PropsWithChildren } from 'react';
import { supabase } from './supabase'
import { AuthError, AuthResponse, OAuthResponse, Session, User } from '@supabase/supabase-js';

type Auth = {
	signUp: (email: string, password: string) => Promise<AuthResponse>,
	signIn: (email: string, password: string) => Promise<AuthResponse>,
	signInGoogle: () => Promise<OAuthResponse>,
	signOut: () => Promise<{ error: AuthError|null }>,
	user?: User,
	accessToken?: string,
}

const defaultValues: Auth = {
	signUp: (email: string, password: string) => supabase.auth.signUp({ email, password }),
	signIn: (email: string, password: string) => supabase.auth.signInWithPassword({ email, password }),
	signInGoogle: () => supabase.auth.signInWithOAuth({ provider: 'google' }),
	signOut: () => supabase.auth.signOut(),
	user: undefined,
	accessToken: undefined,
}

const AuthContext = React.createContext<Auth>(defaultValues)

export function useAuth() {
	return useContext(AuthContext)
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<User>()
	const [session, setSession] = useState<Session>()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		Promise.all([
			supabase.auth.getUser().then((userResponse) => setUser(userResponse.data.user!)),
			supabase.auth.getSession().then((sessionResponse) => setSession(sessionResponse.data.session!)),
		]).finally(() => setLoading(false))


		const { data: listener } = supabase.auth.onAuthStateChange(
			async (event, session) => {
				console.warn('AUTH EVENT ->', event);
				setUser(session?.user)
				setSession(session!)
				setLoading(false)
			}
		)


		return () => {
			listener.subscription.unsubscribe()
		}
	}, [])

	return (
		<AuthContext.Provider value={{ ...defaultValues, user, accessToken: session?.access_token }}>
			{!loading && children}
		</AuthContext.Provider>
	)
}
