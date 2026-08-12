import React from "react";

import SidebarLeft from "./components/SidebarLeft";
import Feed from "./components/Feed";
import SidebarRight from "./components/SidebarRight";

import "./Community.css";

const Community = () => {
  return (
    <main className="bn-community">
      <div className="bn-community-wrapper">

        {/* Left Sidebar */}
        <aside className="bn-community__col bn-community__col--left">
          <SidebarLeft />
        </aside>

        {/* Main Feed */}
        <section className="bn-community__col bn-community__col--center">
          <Feed />
        </section>

        {/* Right Sidebar */}
        <aside className="bn-community__col bn-community__col--right">
          <SidebarRight />
        </aside>

      </div>
    </main>
  );
};

export default Community;