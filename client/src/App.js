import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Login from './components/pages/Login';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Dashboard from './components/pages/Dashboard';
import Search from './components/pages/Search';
import Membership from './components/pages/Memebership';
import Success from './components/pages/Success';
import Cancel from './components/pages/Cancel';


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
  const [currentPage, setCurrentPage] = useState('About');

  // useEffect functionality is used to store the user's current page in local storage so when they reload the page, it renders the correct page instead of the default About page
  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      setCurrentPage(storedPage);
    }
  }, []);

  // Export the handlePageChange functionality that will change the currentPage to whatever the input is
  const handlePageChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem('currentPage', page);
  };

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === 'About') {
      return (
        <div>
          <Header currentPage={currentPage} handlePageChange={handlePageChange} />
          <About currentPage='About' />
          <Footer />
        </div>
      )
    }
    if (currentPage === 'Login') {
      return (
        <div>
          <Header currentPage={currentPage} handlePageChange={handlePageChange} />
          <Login currentPage='Login' />
          <Footer />
        </div>
      )
    }
    if (currentPage === 'Contact') {
      return (
        <div>
          <Header currentPage={currentPage} handlePageChange={handlePageChange} />
          <Contact currentPage='Contact' />
          <Footer />
        </div>
      )
    }
    if (currentPage === 'Dashboard') {
      return (
        <div>
          <Header currentPage={currentPage} handlePageChange={handlePageChange} />
          <Dashboard currentPage='Dashboard' />
          <Footer />
        </div>
      )
    }
    if (currentPage === 'Search') {
      return (
        <div>
          <Header currentPage={currentPage} handlePageChange={handlePageChange} />
          <Search currentPage='Search' />
          <Footer />
        </div>
      )
    }
    if (currentPage === 'Membership') {
      return (
        <div>
          <Header currentPage={currentPage} handlePageChange={handlePageChange} />
          <Membership currentPage='Membership' />
          <Footer />
        </div>
      )
    }
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path='/' element={renderPage()} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

export default App;