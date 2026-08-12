import React from "react";
import { currentUser } from "../data/communityPosts";
import "./ProfileMiniCard.css";

export default function ProfileMiniCard() {
  return (
    <div className="bn-profile-mini">
      <div className="bn-profile-mini__avatar">{currentUser.avatar}</div>
      <div className="bn-profile-mini__info">
        <span className="bn-profile-mini__name">{currentUser.name}</span>
        <span className="bn-profile-mini__title">{currentUser.title}</span>
      </div>
    </div>
  );
}
