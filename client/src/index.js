import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClientProvider from './lib/graphql/ApolloClient.js';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <ApolloClientProvider>
            <App />
        </ApolloClientProvider>
    </BrowserRouter>,
    document.getElementById('root')
);