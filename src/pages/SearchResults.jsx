import React, { Suspense } from 'react';
import { useSearchParams, useLoaderData, defer, Await, useAsyncValue } from 'react-router-dom'
import SearchForm from '../components/SearchForm';
import { getForksList, getForskCount } from '../app/github';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table'
import { LinkContainer } from 'react-router-bootstrap'

const contentPerPage = 8;

function ForksList() {
  const forksList = useAsyncValue()

  return (
    <>
      <Table striped bordered hover style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Repository Name</th>
            <th>Owner</th>
            <th>Stars</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {forksList.length > 0 && forksList.map((el) =>
            <tr key={el.id}>
              <td>{el.name}</td>
              <td>{el.owner}</td>
              <td>{el.stars}</td>
              <td><a href={el.url}>{el.url}</a></td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, pagesCount, forksList } = useLoaderData();

  const getPrevPage = () => page - 1 || 1;
  const getNextPage = () => page >= pagesCount ? page : Number(page) + 1

  const getSearchString = () => searchParams.get('repository') || '';

  return (
    <>
      <h2>Результаты поиска</h2>
      <SearchForm value={getSearchString()} />
      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={forksList}>
          <ForksList />
        </Await>
      </Suspense>
      <Pagination>
        <LinkContainer to={{ pathname: `/search&page=${getPrevPage()}`, search: `repository=${getSearchString()}` }}>
          <Pagination.Prev />
        </LinkContainer>
        <LinkContainer to={{ pathname: `/search&page=${getNextPage()}`, search: `repository=${getSearchString()}` }}>
          <Pagination.Next />
        </LinkContainer>
      </Pagination>
    </>
  );
}

const getRepositoryInfo = (searchParams) => {
  var result = {};

  if (searchParams) {
    var [owner, repo] = searchParams.split('/');
    result.owner = owner;
    result.repo = repo;
  }

  return result;
}


const searchResultsLoader = async ({ params, request }) => {
  var searchParams = new URL(request.url).searchParams.get('repository');
  var repository = getRepositoryInfo(searchParams);
  var forksCount = await getForskCount(repository);
  var pagesCount = Math.ceil(forksCount / contentPerPage);
  var forksList = getForksList(repository, params.page, contentPerPage);

  return defer({
    pagesCount,
    forksList,
    page: params.page,
  });
}

export { searchResultsLoader };
export default SearchResults;