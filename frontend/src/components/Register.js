import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, { username, password });
      alert("Înregistrare reușită!");
      window.location.href = "/login";
    } catch (err) {
      alert("Eroare la înregistrare");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Înregistrare</h2>
      <input className="form-control mb-2" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" className="form-control mb-2" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-success">Register</button>
    </form>
  );
}

export default Register;
