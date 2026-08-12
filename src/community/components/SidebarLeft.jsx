import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Terminal,
  BookOpen,
  Trophy,
  Briefcase,
  Users,
  Bookmark,
  Flame,
  ChevronRight,
} from "lucide-react";

import ProfileMiniCard from "./ProfileMiniCard";
import "./SidebarLeft.css";

const navItems = [
  {
    label: "Home",
    icon: Home,
    path: "/",
    end: true,
  },
  {
    label: "Playground",
    icon: Terminal,
    path: "/playground",
  },
  {
    label: "Courses",
    icon: BookOpen,
    path: "/courses",
  },
  {
    label: "Contests",
    icon: Trophy,
    path: "/contests",
  },
  {
    label: "Jobs",
    icon: Briefcase,
    path: "/jobs",
  },
  {
    label: "Community",
    icon: Users,
    path: "/community",
    badge: "LIVE",
  },
  {
    label: "Bookmarks",
    icon: Bookmark,
    path: "/bookmarks",
  },
];

export default function SidebarLeft() {
  return (
    <aside className="bn-sidebar-left">

      {/* Navigation */}
      <section className="bn-sidebar-section">

        <div className="bn-sidebar-header">
          <span className="bn-sidebar-title">
            Dashboard
          </span>
        </div>

        <nav className="bn-sidebar-nav">
          {navItems.map(
            ({ label, icon: Icon, path, badge, end }) => (
              <NavLink
                key={label}
                to={path}
                end={end}
                className={({ isActive }) =>
                  `bn-nav-item ${isActive ? "active" : ""}`
                }
              >
                <div className="bn-nav-left">

                  <span className="bn-nav-icon-wrapper">
                    <Icon
                      size={18}
                      strokeWidth={1.9}
                      className="bn-nav-icon"
                    />
                  </span>

                  <span className="bn-nav-label">
                    {label}
                  </span>

                  {badge && (
                    <span className="bn-live-badge">
                      <span className="bn-live-dot" />
                      {badge}
                    </span>
                  )}

                </div>

                <ChevronRight
                  size={15}
                  strokeWidth={2}
                  className="bn-nav-arrow"
                />

              </NavLink>
            )
          )}
        </nav>

      </section>

      {/* Streak */}
      <section className="bn-sidebar-card">

        <div className="bn-streak">

          <div className="bn-streak-icon">
            <Flame size={19} strokeWidth={2} />
          </div>

          <div className="bn-streak-content">
            <div className="bn-streak-top">
              <span>14 Day Streak</span>
              <span className="bn-streak-count">14</span>
            </div>

            <p>
              Keep solving daily challenges
            </p>
          </div>

        </div>

        <div className="bn-streak-progress">
          <span />
        </div>

      </section>

      {/* Profile */}
      <ProfileMiniCard />

    </aside>
  );
}