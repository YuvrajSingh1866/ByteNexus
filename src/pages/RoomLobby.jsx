import { useParams } from "react-router-dom";
import "../styles/RoomLobby.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function RoomLobby() {
  const { roomId } = useParams();

  const participants = [
    {
      id: "u1",
      name: "Yuvraj",
      language: "Java",
      ready: true,
    },
    {
      id: "u2",
      name: "Rahul",
      language: "JavaScript",
      ready: false,
    },
    {
      id: "u3",
      name: "Aman",
      language: "Python",
      ready: true,
    },
  ];

  const inviteLink = `http://localhost:5173/roomLobby/${roomId}`;

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      alert("Invite link copied!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="room-lobby">
      <div className="background-grid"></div>

     <Navbar />
      {/* Main */}
      <main className="room-content">
        {/* Room Info */}
        
        {/* Grid */}
        <div className="room-grid">
          {/* Participants */}
          <div className="participants-section">
            <div className="participants-header">
              <h2>Participants</h2>
              <p>
                Waiting for all players to get ready.
              </p>
            </div>

            <div className="players-list">
              {participants.map((player) => (
                <div
                  key={player.id}
                  className={`player-card ${
                    player.ready
                      ? "player-ready"
                      : ""
                  }`}
                >
                  <div className="player-left">
                    <div className="avatar">
                      {player.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="player-name">
                        {player.name}
                      </h3>

                      <p className="player-language">
                        Preferred Language: {player.language}
                      </p>
                    </div>
                  </div>

                  <div>
                    {player.ready ? (
                      <div className="ready-badge">
                        Ready ✅
                      </div>
                    ) : (
                      <div className="waiting-badge">
                        Waiting ⏳
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            {/* Invite */}
            <div className="sidebar-box">
              <h2>Invite Players</h2>

              <div className="invite-link">
                {inviteLink}
              </div>

              <button
                onClick={copyInviteLink}
                className="primary-btn"
              >
                Copy Invite Link
              </button>
            </div>

            {/* Settings */}
            <div className="sidebar-box">
              <h2>Match Settings</h2>

              <div className="settings-list">
                <div className="setting-row">
                  <span>Time Limit</span>
                  <span className="setting-value">
                    20 Minutes
                  </span>
                </div>

                <div className="setting-row">
                  <span>Language</span>
                  <span className="setting-value">
                    Java
                  </span>
                </div>

                <div className="setting-row">
                  <span>Questions</span>
                  <span className="setting-value">
                    1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="start-btn-wrapper">
          <button className="start-btn">
            Start Contest 🚀
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}