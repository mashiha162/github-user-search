import axios from "axios";

const BASE_URL = "https://api.github.com/users";

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
}

export const fetchUser = async (username: string) => {
  const { data } = await axios.get(`${BASE_URL}/${username}`);
  return data;
};

export const fetchRepos = async (
  username: string,
  page: number = 1,
  perPage: number = 10
) => {
  const { data } = await axios.get(
    `${BASE_URL}/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`
  );

  // Sort by stars and return with pagination info
  const sortedRepos = (data as GitHubRepo[]).sort(
    (a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count
  );

  return {
    repos: sortedRepos,
    hasMore: data.length === perPage, // If we got full page, there might be more
  };
};
