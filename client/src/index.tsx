import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

const app = document.getElementById('app');

const ErrorFallback: React.ComponentType<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

ReactDOM.render(
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // reset the state of your app so the error doesn't happen again
    }}
  >
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ErrorBoundary>,
  app
);
