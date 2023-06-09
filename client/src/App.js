import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AuthProvider from './components/UserContext';
import Login from './components/pages/Login';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Dashboard from './components/pages/Dashboard';
import Search from './components/pages/Search';
import Membership from './components/pages/Memebership';
import Success from './components/pages/Success';
import Cancel from './components/pages/Cancel';
import Layout from './components/common/Layout';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path='/' element={<About />} />
              <Route path='/login' element={<Login />} />
              <Route path='/search' element={<Search />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/membership' element={<Membership />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/success' element={<Success />} />
              <Route path='/cancel' element={<Cancel />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App;