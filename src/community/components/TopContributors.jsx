import React from "react";
import { topContributors } from "../data/communityPosts";
import "./TopContributors.css";

export default function TopContributors() {
  return (
    <div className="bn-widget-card">
      <h3 className="bn-widget-card__title">Top Contributors</h3>
      <div className="bn-contributors-list">
        {topContributors.map((person, i) => (
          <div className="bn-contributor-item" key={person.username}>
            <span className="bn-contributor-item__rank">{i + 1}</span>
            <div className="bn-contributor-item__avatar">{person.avatar}</div>
            <div className="bn-contributor-item__body">
              <span className="bn-contributor-item__name">{person.name}</span>
              <span className="bn-contributor-item__username">{person.username}</span>
            </div>
            <span className="bn-contributor-item__points">{person.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
