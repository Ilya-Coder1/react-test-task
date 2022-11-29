import { Octokit } from '@octokit/core'
import { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods'
import { paginateRest } from '@octokit/plugin-paginate-rest'

const forksPerRequest = 30;
const octokit = getOctokit();

function getOctokit() {
  const MyOctokit = Octokit.plugin(restEndpointMethods);
  return new MyOctokit({auth: "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"});
}

async function getForksList({ owner, repo }, page, forksInPage) {
  var response = await octokit.rest.repos.listForks({
    owner,
    repo,
    page,
    per_page: forksInPage
  })

  return response.data.map(el => Object({
    id: el.id,
    name: el.full_name,
    owner: el.owner.login,
    url: el.html_url,
    stars: el.stargazers_count
  }));
}

async function getForskCount({ owner, repo }) {
  var response = await octokit.rest.repos.get({owner, repo});
  var count = response.data.forks_count;
  return count;
}

export { getForksList, getForskCount };
