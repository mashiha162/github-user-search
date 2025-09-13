"use client";

import { useState, useCallback } from "react";
import { fetchRepos, fetchUser } from "../service/github";

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
}

export const useGithub = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");

  const searchUser = useCallback(async (username: string) => {
    setLoading(true);
    setError(null);
    setCurrentUsername(username);
    setCurrentPage(1);
    setRepos([]);

    try {
      const userData = await fetchUser(username);
      const repoData = await fetchRepos(username, 1, 10);
      setRepos(repoData.repos);
      setHasMore(repoData.hasMore);
      setProfileData(userData);
    } catch {
      setError("User not found or API limit exceeded");
      setProfileData(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMoreRepos = useCallback(async () => {
    if (!currentUsername || loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const repoData = await fetchRepos(currentUsername, nextPage, 10);
      setRepos((prevRepos) => [...prevRepos, ...repoData.repos]);
      setHasMore(repoData.hasMore);
      setCurrentPage(nextPage);
    } catch {
      setError("Failed to load more repositories");
    } finally {
      setLoadingMore(false);
    }
  }, [currentUsername, currentPage, loadingMore, hasMore]);

  return {
    loading,
    loadingMore,
    error,
    profileData,
    repos,
    hasMore,
    searchUser,
    loadMoreRepos,
  };
};
