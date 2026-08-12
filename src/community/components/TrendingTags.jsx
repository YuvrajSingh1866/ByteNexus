import React from "react";
import { Hash, ArrowRight } from "lucide-react";
import { trendingTags } from "../data/communityPosts";
import "./TrendingTags.css";

const TrendingTags = () => {
  return (
    <div className="bn-widget-card">

      <div className="bn-widget-header">

        <h3 className="bn-widget-card__title">
          Trending Topics
        </h3>

        <button className="bn-widget-view">
          View All
          <ArrowRight size={14} />
        </button>

      </div>

      <div className="bn-trending-tags">

        {trendingTags.map(({ tag, posts }) => (

          <button
            key={tag}
            className="bn-trending-tag"
          >

            <div className="bn-tag-left">

              <div className="bn-tag-icon">
                <Hash size={14} />
              </div>

              <div>

                <span className="bn-trending-tag__name">
                  {tag}
                </span>

                <span className="bn-trending-tag__posts">
                  {posts} Posts
                </span>

              </div>

            </div>

            <ArrowRight
              size={16}
              className="bn-tag-arrow"
            />

          </button>

        ))}

      </div>

    </div>
  );
};

export default TrendingTags;