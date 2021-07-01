import { useHistory } from 'react-router-dom';
import { FormEvent } from 'react';

import { database } from '../../services/firebase';

import ilustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import { Button } from '../../components/Button/index';
import { useAuth } from '../../hooks/useAuth';

import { useState } from 'react';

import "../../styles/auth.scss";

export function Home() {
  const history = useHistory();
  const {user, signInWithGoogle} = useAuth()
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }
  
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('This room does not exist.');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('The room was closed.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }
  
  return (
    <div id="page-auth">
      <aside>
        <img src={ilustrationImg} alt="Ilustration" />
        <strong>Create Q&amp;A rooms.</strong>
        <p>Ask questions in real-time.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Google logo" />
            Create room with Google
          </button>
          <div className="separator">Or enter a room.</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Enter room code."
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Send
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}