"use client";
import Searchbar from "./component/Searchbar";
import RepoList from "./component/RepoList";
import { useGithub } from "./hooks/useGithub";
import { Alert, Spin } from "antd";
import ProfileCard from "./component/ProfileCard";
import ThemeToggle from "./component/ThemeToggle";
import { ThemeProvider } from "./context/ThemeContext";

function HomeContent() {
  const {
    loading,
    loadingMore,
    error,
    profileData,
    repos,
    hasMore,
    searchUser,
    loadMoreRepos,
  } = useGithub();

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="header-section">
          <div className="theme-toggle-container">
            <ThemeToggle />
          </div>
          <h1 className="app-title">GitHub User Search</h1>
          <p className="app-subtitle">
            Discover GitHub profiles and their repositories
          </p>
        </div>

        <Searchbar onSearch={searchUser} />

        {loading && (
          <div className="loading-container">
            <Spin size="large" />
            <p className="loading-text">Searching for user...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <Alert
              type="error"
              message="Search Error"
              description={error}
              showIcon
              className="error-alert"
            />
          </div>
        )}

        {profileData && !loading && (
          <div className="results-container">
            <ProfileCard profile={profileData} />
            <RepoList
              repos={repos}
              hasMore={hasMore}
              loadingMore={loadingMore}
              onLoadMore={loadMoreRepos}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}
