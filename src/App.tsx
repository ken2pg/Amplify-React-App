import React, { useEffect, useState } from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsmobile from './aws-exports';

Amplify.configure(awsmobile);

const App = () => {
  const [authState, setAuthState] = useState<AuthState>();
  const [user, setUser] = useState<object | undefined>();
  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);
  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <AmplifySignOut />
    </div>
  ) : (
    <AmplifyAuthenticator />
  );
};

export default App;
