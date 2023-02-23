import React from 'react';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/defaultStyles.css';
import '../styles/globalStyles.css';
import AuthProvider from '../contexts/AuthContext';
import Screen from '../components/Screen';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Screen>
        <Component {...pageProps} />
      </Screen>
    </AuthProvider>
  );
}

export default MyApp;
