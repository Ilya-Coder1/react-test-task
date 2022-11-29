import React from 'react'
import SearchForm from '../components/SearchForm';

function Home(props) {

  return (
    <>
      <h2>Приложения для поиска форков репозиториев</h2>
      <SearchForm action="search&page=1"/>
    </>
  );
}

export default Home;