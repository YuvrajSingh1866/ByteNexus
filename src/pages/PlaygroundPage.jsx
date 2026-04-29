import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import './PlaygroundPage.css'

// ── CreateRoomModal ────────────────────────────────────────────────────────────
// Shows when user clicks "Create Room". Lets them pick topic, difficulty,
// and invite friends before creating the room.
const CreateRoomModal = ({ onClose }) => {
  // Form state
  const [topic, setTopic]           = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [friendEmail, setFriendEmail] = useState('')
  const [invitedFriends, setInvitedFriends] = useState([])

  // Add a friend email to the invite list
  const handleAddFriend = () => {
    const trimmed = friendEmail.trim()
    if (trimmed && !invitedFriends.includes(trimmed)) {
      setInvitedFriends([...invitedFriends, trimmed])
      setFriendEmail('')
    }
  }

  // Remove a friend from the invite list
  const handleRemoveFriend = (email) => {
    setInvitedFriends(invitedFriends.filter(f => f !== email))
  }

  // Handle Enter key in the invite input
  const handleFriendKeyDown = (e) => {
    if (e.key === 'Enter') handleAddFriend()
  }

  // Submit – wire this to your backend later
  const handleCreate = async () => {
  if (!topic || !difficulty) {
    alert('Please select a topic and difficulty.')
    return
  }

  const res = await fetch("http://localhost:5000/api/rooms/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      topic,
      difficulty,
      invitedFriends
    })
  })

  const data = await res.json()

  if (res.ok) {
    alert("Room created & invites sent 🚀")
    onClose()
  } else {
    alert(data.message)
  }
}

  return (
    // Clicking the dark overlay closes the modal
    <div className="modal-overlay" onClick={onClose}>
      {/* Stop clicks inside the card from bubbling to the overlay */}
      <div className="modal-card" onClick={e => e.stopPropagation()}>

        <div className="modal-header">
          <h2 className="modal-title">🛠️ Create a Room</h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* ── Options Table ── */}
        <table className="room-options-table">
          <tbody>

            {/* Coding Topic */}
            <tr>
              <td className="option-label">Coding Topic</td>
              <td>
                <select
                  className="option-select"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                >
                  <option value="">-- Select Topic --</option>
                  <option value="arrays">Arrays & Strings</option>
                  <option value="linkedlist">Linked Lists</option>
                  <option value="trees">Trees & Graphs</option>
                  <option value="dp">Dynamic Programming</option>
                  <option value="sorting">Sorting & Searching</option>
                  <option value="recursion">Recursion</option>
                  <option value="oops">OOP Concepts</option>
                  <option value="web">Web Development</option>
                  <option value="dbms">DBMS / SQL</option>
                  <option value="os">Operating Systems</option>
                </select>
              </td>
            </tr>

            {/* Difficulty */}
            <tr>
              <td className="option-label">Difficulty</td>
              <td>
                <div className="difficulty-options">
                  {['Easy', 'Medium', 'Hard'].map(level => (
                    <button
                      key={level}
                      className={`difficulty-btn ${difficulty === level ? 'active-' + level.toLowerCase() : ''}`}
                      onClick={() => setDifficulty(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </td>
            </tr>

            {/* Invite Friends */}
            <tr>
              <td className="option-label">Invite Friends</td>
              <td>
                <div className="invite-row">
                  <input
                    className="invite-input"
                    type="email"
                    placeholder="friend@email.com"
                    value={friendEmail}
                    onChange={e => setFriendEmail(e.target.value)}
                    onKeyDown={handleFriendKeyDown}
                  />
                  <button className="invite-add-btn" onClick={handleAddFriend}>
                    + Add
                  </button>
                </div>

                {/* Invited friends chips */}
                {invitedFriends.length > 0 && (
                  <div className="invited-list">
                    {invitedFriends.map(email => (
                      <span key={email} className="friend-chip">
                        {email}
                        <button
                          className="chip-remove"
                          onClick={() => handleRemoveFriend(email)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </td>
            </tr>

          </tbody>
        </table>

        {/* Action Buttons */}
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-create" onClick={handleCreate}>🚀 Create Room</button>
        </div>

      </div>
    </div>
  )
}


// ── JoinRoomModal ──────────────────────────────────────────────────────────────
// Simple modal where user pastes a room code to join
const JoinRoomModal = ({ onClose }) => {
  const [roomCode, setRoomCode] = useState('')

  const handleJoin = () => {
    if (!roomCode.trim()) {
      alert('Please enter a room code.')
      return
    }
    console.log('Joining room:', roomCode)
    // TODO: call your API here
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card small-card" onClick={e => e.stopPropagation()}>

        <div className="modal-header">
          <h2 className="modal-title">🔗 Join a Room</h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <p className="join-hint">Enter the room code shared by your friend</p>

        <input
          className="join-input"
          type="text"
          placeholder="e.g. BN-4829-XZ"
          value={roomCode}
          onChange={e => setRoomCode(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleJoin()}
        />

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-create" onClick={handleJoin}>Join Room</button>
        </div>

      </div>
    </div>
  )
}


// ── PlaygroundPage ─────────────────────────────────────────────────────────────
const PlaygroundPage = () => {
  // Track which modal is open: null | 'create' | 'join'
  const [activeModal, setActiveModal] = useState(null)

  return (
    <div>
      <Navbar />

      <div className="playground-container">
        <h1 className="playground-title">Welcome to the Playground</h1>
        <p className="playground-subtitle">
          Compete with your friends in a collaborative coding environment
        </p>

        {/* ── Room section ── */}
        <div className="room-section">
          <h2 className="room-section-title">Collaborative Rooms🔥</h2>
          <p className="room-section-subtitle">
            Practice together — create a private room or join one with a code.
          </p>

          <div className="room-buttons">
            {/* Opens the Create Room modal */}
            <button
              className="room-btn create-btn"
              onClick={() => setActiveModal('create')}
            >
              ➕ Create Room
            </button>

            {/* Opens the Join Room modal */}
            <button
              className="room-btn join-btn"
              onClick={() => setActiveModal('join')}
            >
              🔗 Join Room
            </button>
          </div>
        </div>
      </div>

      {/* ── Modals (rendered only when active) ── */}
      {activeModal === 'create' && (
        <CreateRoomModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'join' && (
        <JoinRoomModal onClose={() => setActiveModal(null)} />
      )}

      <Footer />
    </div>
  )
}

export default PlaygroundPage
