"use client";
import React from "react";
import { Card, Button, Spin } from "antd";

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

type Props = {
  repos: Repository[];
  hasMore: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
};

export default function RepoList({
  repos,
  hasMore,
  loadingMore,
  onLoadMore,
}: Props) {
  if (repos.length === 0) return null;

  return (
    <div className="repos-section">
      <h3 className="repos-title">Repositories ({repos.length})</h3>
      <div className="repos-grid">
        {repos.map((repo) => (
          <Card key={repo.id} className="repo-card" hoverable>
            <div className="repo-header">
              <h4 className="repo-name">
                <a href={repo.html_url} target="_blank" className="repo-link">
                  {repo.name}
                </a>
              </h4>
              <div className="repo-stars">
                <span className="star-icon">⭐</span>
                <span className="star-count">{repo.stargazers_count}</span>
              </div>
            </div>

            {repo.description && (
              <p className="repo-description">{repo.description}</p>
            )}

            <div className="repo-footer">
              {repo.language && (
                <span className="repo-language">{repo.language}</span>
              )}
              <div className="repo-stats">
                <span className="repo-stat">🍴 {repo.forks_count}</span>
                {repo.open_issues_count > 0 && (
                  <span className="repo-stat">📝 {repo.open_issues_count}</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {hasMore && (
        <div className="load-more-container">
          <Button
            type="primary"
            size="large"
            onClick={onLoadMore}
            loading={loadingMore}
            className="load-more-btn"
          >
            {loadingMore ? "Loading..." : "Load 5 More Repositories"}
          </Button>
        </div>
      )}

      {loadingMore && (
        <div className="loading-more">
          <Spin size="large" />
          <p>Loading more repositories...</p>
        </div>
      )}
    </div>
  );
}
