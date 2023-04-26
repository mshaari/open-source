import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { UserContext } from './components/UserContext';
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
  // const [currentPage, setCurrentPage] = useState('About');

  // // useEffect functionality is used to store the user's current page in local storage so when they reload the page, it renders the correct page instead of the default About page
  // useEffect(() => {
  //   const storedPage = localStorage.getItem('currentPage');
  //   if (storedPage) {
  //     setCurrentPage(storedPage);
  //   }
  // }, []);

  // // Import UserContext to see if user is logged in (determine whether to load login page or not)
  // const [user] = useContext(UserContext);


  // // Export the handlePageChange functionality that will change the currentPage to whatever the input is
  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  //   localStorage.setItem('currentPage', page);
  // };

  // // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  // const renderPage = () => {
  //   if (currentPage === 'About') {
  //     return (
  //       <div>
  //         <Header currentPage={currentPage} handlePageChange={handlePageChange} />
  //         <About currentPage='About' />
  //         <Footer />
  //       </div>
  //     )
  //   }
  //   if (currentPage === 'Login') {
  //     // If they are logged in, do not render the Login page, and render the About page instead
  //     if (user.loggedIn === true) {
  //       return (
  //         <div>
  //           <Header currentPage='About' handlePageChange={handlePageChange} />
  //           <About currentPage='About' />
  //           <Footer />
  //         </div>
  //       )
  //     } else {
  //       return (
  //         <div>
  //           <Header currentPage={currentPage} handlePageChange={handlePageChange} />
  //           <Login currentPage='Login' />
  //           <Footer />
  //         </div>
  //       )
  //     }

  //   }
  //   if (currentPage === 'Contact') {
  //     return (
  //       <div>
  //         <Header currentPage={currentPage} handlePageChange={handlePageChange} />
  //         <Contact currentPage='Contact' />
  //         <Footer />
  //       </div>
  //     )
  //   }
  //   if (currentPage === 'Dashboard') {
  //     return (
  //       <div>
  //         <Header currentPage={currentPage} handlePageChange={handlePageChange} />
  //         <Dashboard currentPage='Dashboard' />
  //         <Footer />
  //       </div>
  //     )
  //   }
  //   if (currentPage === 'Search') {
  //     return (
  //       <div>
  //         <Header currentPage={currentPage} handlePageChange={handlePageChange} />
  //         <Search currentPage='Search' />
  //         <Footer />
  //       </div>
  //     )
  //   }
  //   if (currentPage === 'Membership') {
  //     return (
  //       <div>
  //         <Header currentPage={currentPage} handlePageChange={handlePageChange} />
  //         <Membership currentPage='Membership' />
  //         <Footer />
  //       </div>
  //     )
  //   }
  // };

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Router>
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
      </Router>
      </Layout>
    </ApolloProvider>
  )
}

export default App;