import React, { useState } from 'react';
import './App.css';
import { AuthFactory } from './auth/infrastructure/components/auth.factory';

function App() {
	const [accessToken, setAccessToken] = useState('')

	return (
		<div className="App">
			<header className="App-header">
				{AuthFactory.create(setAccessToken)}
				<h3>Access Token: {accessToken}</h3>
			</header>
		</div>
	);
}

export default App;
