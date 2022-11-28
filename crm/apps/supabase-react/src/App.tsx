import React from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Dashboard, DashboardProtected } from './auth/infrastructure/page/Dashboard';
import { Signup } from './auth/infrastructure/page/Signup';
import { Login } from './auth/infrastructure/page/Login';
import { PrivateRoute } from './auth/infrastructure/components/private-route';

const router = createBrowserRouter([
	{
		path: "/",
		element: <PrivateRoute><Dashboard /></PrivateRoute>,
	},
	{
		path: "/protected",
		element: <DashboardProtected />,
	},
	{
		path: "/signup",
		element: <Signup />,
	},
	{
		path: "/login",
		element: <Login />,
	},
]);

function App() {
  return (
    <div className="App">
		<h1>supabase-auth-react</h1>
		<RouterProvider router={router} />
    </div>
  );
}

export default App;
