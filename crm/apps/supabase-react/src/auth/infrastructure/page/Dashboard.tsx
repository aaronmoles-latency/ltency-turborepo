import { useAuth } from '../../../Auth';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { protectedRoute } from '../components/protected-route';

export const Dashboard: FC = () => {
  const { user, accessToken, signOut } = useAuth()
	const navigate = useNavigate();

  async function handleSignOut() {
    await signOut()

    navigate('/login')
  }

  return (
    <div>
      <p>Welcome, {user?.id}!</p>
      <p>JWT: {accessToken ?? ''}</p>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  )
}

export const DashboardProtected = protectedRoute(Dashboard)
