import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import SearchResults, { searchResultsLoader } from './pages/SearchResults';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "search",
          element: <SearchResults />
        },
        {
          path: "search&page=:page",
          element: <SearchResults />,
          loader: searchResultsLoader,
        },
      ]
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
