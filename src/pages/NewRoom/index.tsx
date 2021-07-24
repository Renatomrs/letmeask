import { Link, useHistory } from 'react-router-dom';

import { FormEvent, useState } from 'react';

import ilustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';

import { Button } from '../../components/Button/index';
import { database } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';

import "../../styles/auth.scss";

export function NewRoom() {
  const {user} = useAuth()
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/admin/rooms/${firebaseRoom.key}`);
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
          <h2>Create a new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Room name"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Create room
            </Button>
          </form>
          <p>
            Want to join an existing room?
            <Link to="/">Click here</Link>
          </p>
        </div>
      </main>
    </div>
  )
}