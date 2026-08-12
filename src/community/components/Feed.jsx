import React from "react";

import FeedHeader from "./FeedHeader";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";

import { communityPosts } from "../data/communityPosts";

import "./Feed.css";

const Feed = () => {
  return (
    <main className="bn-feed">

      {/* Page Header */}
      <FeedHeader />

      {/* Create Post */}
      <CreatePost />

      {/* Feed */}
      <section className="bn-feed__list">

        {communityPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))}

      </section>

    </main>
  );
};

export default Feed;