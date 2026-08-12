import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/RoomLobby.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { io } from "socket.io-client";
export default function RoomLobby() {
  const { roomId } = useParams();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const inviteLink = `${window.location.origin}/roomLobby/${roomId}`;

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/rooms/${roomId}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success) {
          setRoom(data.room);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
      
    };

    fetchRoom();
  }, [roomId]);

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      alert("Invite link copied!");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="room-lobby">
        <Navbar />
        <h2
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "150px",
          }}
        >
          Loading Room...
        </h2>
        <Footer />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="room-lobby">
        <Navbar />
        <h2
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "150px",
          }}
        >
          Room Not Found
        </h2>
        <Footer />
      </div>
    );
  }
const socket = io(import.meta.env.VITE_API_URL,{
    withCredentials:true
});
  return (
    <div className="room-lobby">
      <div className="background-grid"></div>

      <Navbar />

      <main className="room-content">
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
              {room.participants.map((player) => (
                <div
                  key={player.user._id}
                  className={`player-card ${
                    player.ready ? "player-ready" : ""
                  }`}
                >
                  <div className="player-left">
                    <div className="avatar">
                      {player.user.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3 className="player-name">
                        {player.user.name}

                        {room.host &&
                          room.host._id === player.user._id && (
                            <span
                              style={{
                                color: "#ffd700",
                                marginLeft: "8px",
                                fontSize: "14px",
                              }}
                            >
                              👑 Host
                            </span>
                          )}
                      </h3>

                      <p className="player-language">
                        Preferred Language:{" "}
                        {room.settings.language}
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
                className="primary-btn"
                onClick={copyInviteLink}
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
                    {room.settings.duration} Minutes
                  </span>
                </div>

                <div className="setting-row">
                  <span>Language</span>

                  <span className="setting-value">
                    {room.settings.language}
                  </span>
                </div>

                <div className="setting-row">
                  <span>Questions</span>

                  <span className="setting-value">
                    {room.settings.questions}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

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