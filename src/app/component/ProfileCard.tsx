import { Avatar, Card } from "antd";
import React from "react";

interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  location: string | null;
  company: string | null;
  blog: string | null;
}

type Props = { profile: GitHubProfile };

export default function ProfileCard({ profile }: Props) {
  return (
    <Card className="profile-card">
      <div className="profile-header">
        <Avatar
          src={profile.avatar_url}
          size={120}
          className="profile-avatar"
        />
        <div className="profile-info">
          <h2 className="profile-name">{profile.name || profile.login}</h2>
          <p className="profile-username">@{profile.login}</p>
          {profile.bio && <p className="profile-bio">{profile.bio}</p>}
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-number">{profile.followers}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{profile.following}</span>
          <span className="stat-label">Following</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{profile.public_repos}</span>
          <span className="stat-label">Repositories</span>
        </div>
      </div>

      <div className="profile-details">
        {profile.location && (
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <span>{profile.location}</span>
          </div>
        )}
        {profile.company && (
          <div className="detail-item">
            <span className="detail-icon">🏢</span>
            <span>{profile.company}</span>
          </div>
        )}
        {profile.blog && (
          <div className="detail-item">
            <span className="detail-icon">🔗</span>
            <a href={profile.blog} target="_blank" rel="noopener noreferrer">
              {profile.blog}
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}
