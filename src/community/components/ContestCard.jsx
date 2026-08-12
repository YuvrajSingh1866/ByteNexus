import React from "react";
import { Trophy, Clock, Users } from "lucide-react";
import { upcomingContest as contest } from "../data/communityPosts";
import "./ContestCard.css";

export default function ContestCard() {
  return (
    <div className="bn-widget-card bn-contest-card">
      <div className="bn-contest-card__glow" />
      <h3 className="bn-widget-card__title">Upcoming Contest</h3>

      <div className="bn-contest-card__body">
        <div className="bn-contest-card__icon">
          <Trophy size={18} strokeWidth={1.8} />
        </div>
        <div>
          <span className="bn-contest-card__name">{contest.title}</span>
          <span className="bn-contest-card__date">{contest.date}</span>
        </div>
      </div>

      <div className="bn-contest-card__meta">
        <span className="bn-contest-card__meta-item">
          <Clock size={13} strokeWidth={1.8} />
          Starts in {contest.startsIn}
        </span>
        <span className="bn-contest-card__meta-item">
          <Users size={13} strokeWidth={1.8} />
          {contest.participants}
        </span>
      </div>

      <button type="button" className="bn-contest-card__cta">
        Register · {contest.difficulty}
      </button>
    </div>
  );
}
