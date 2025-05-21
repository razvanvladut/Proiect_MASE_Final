import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, { username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('isAdmin', res.data.isAdmin);
      localStorage.setItem('username', res.data.username);
      alert("Autentificare reușită!");
      window.location.href = "/";
    } catch (err) {
      alert("Eroare la login. Verifică datele.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Parolele nu coincid!");
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, { username, password });
      alert("Înregistrare reușită! Te poți autentifica.");
      setIsRegister(false);
    } catch (err) {
      alert("Eroare la înregistrare. Încearcă un alt nume.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">{isRegister ? "Înregistrare" : "Autentificare"}</h3>
        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          <div className="mb-3">
            <label className="form-label">Nume utilizator</label>
            <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Parolă</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {isRegister && (
            <div className="mb-3">
              <label className="form-label">Confirmă parola</label>
              <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100 mb-3">
            {isRegister ? "Înregistrează-te" : "Autentifică-te"}
          </button>
        </form>
        <button
          className="btn btn-outline-secondary w-100"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Ai deja cont? Autentifică-te" : "Nu ai cont? Înregistrează-te"}
        </button>
      </div>
    </div>
  );
}

export default Login;
