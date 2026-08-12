import React from "react";
import { Search } from "lucide-react";
import "./FeedHeader.css";

const tabs = [
  "For You",
  "Trending",
  "Projects",
  "Questions",
  "Jobs",
  "Achievements",
];

const FeedHeader = () => {
  return (
    <div className="bn-feed-header">

      <div className="bn-feed-title">

        <h1>Community</h1>

        <p>
          Learn, build and grow with developers from around the world.
        </p>

      </div>

      <div className="bn-feed-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search posts, developers, technologies..."
        />

      </div>

      <div className="bn-feed-tabs">

        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={index === 0 ? "active" : ""}
          >
            {tab}
          </button>
        ))}

      </div>

    </div>
  );
};

export default FeedHeader;