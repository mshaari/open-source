import React, { useState } from 'react';
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


// import Detail from './pages/Detail';
// import NoMatch from './pages/NoMatch';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Nav from './components/Nav';
// import { StoreProvider } from './utils/GlobalState';
// import Success from './pages/Success';
// import OrderHistory from './pages/OrderHistory';

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

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === 'About') {
      return (
        <About currentPage='About' />
      )
    }
    if (currentPage === 'Login') {
      return (
        <Login />
      )
    }
    if (currentPage === 'Contact') {
      return (
        <Contact currentPage='Contact' />
      )
    }
    if (currentPage === 'Dashboard') {
      return (
        <Dashboard />
      )
    }
    if (currentPage === 'Search') {
      return (
        <Search />
      )
    }
  };

  // Export the handlePageChange functionality that will change the currentPage to whatever the input is
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='rootApp'>
          <Header currentPage={currentPage} handlePageChange={handlePageChange} />
          {renderPage()}
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  )
}

// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <Router>
//         <div>
//           <StoreProvider>
//             <Nav />
//             <Routes>
//               <Route 
//                 path="/" 
//                 element={<Home />} 
//               />
//               <Route 
//                 path="/login" 
//                 element={<Login />} 
//               />
//               <Route 
//                 path="/signup" 
//                 element={<Signup />} 
//               />
//               <Route 
//                 path="/success" 
//                 element={<Success />} 
//               />
//               <Route 
//                 path="/orderHistory" 
//                 element={<OrderHistory />} 
//               />
//               <Route 
//                 path="/products/:id" 
//                 element={<Detail />} 
//               />
//               <Route
//                 path="*" 
//                 element={<NoMatch />} 
//               />
//             </Routes>
//           </StoreProvider>
//         </div>
//       </Router>
//     </ApolloProvider>
//   );
// }

export default App;
