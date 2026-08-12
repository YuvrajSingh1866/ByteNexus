import React from "react";

import TrendingTags from "./TrendingTags";
import ContestCard from "./ContestCard";
import JobsCard from "./JobsCard";
import TopContributors from "./TopContributors";

import "./SidebarRight.css";

const SidebarRight = () => {
  return (
    <aside className="bn-sidebar-right">

      <div className="bn-sidebar-widget">
        <TrendingTags />
      </div>

      <div className="bn-sidebar-widget">
        <ContestCard />
      </div>

      <div className="bn-sidebar-widget">
        <JobsCard />
      </div>

      <div className="bn-sidebar-widget">
        <TopContributors />
      </div>

    </aside>
  );
};

export default SidebarRight;