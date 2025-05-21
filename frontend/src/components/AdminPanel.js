import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [attractions, setAttractions] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    if (!isAdmin) {
      alert("Acces interzis. Doar admin.");
      window.location.href = "/";
      return;
    }

    fetchAttractions();
  }, []);

  const fetchAttractions = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/attractions`);
      setAttractions(res.data);
    } catch (err) {
      alert("Eroare la încărcare atracții");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Selectează o imagine!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      const location = JSON.stringify({ lat: parseFloat(lat), lng: parseFloat(lng) });
      formData.append('location', location);
      formData.append('image', selectedFile);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/api/attractions`, formData, config);

      setName('');
      setDescription('');
      setLat('');
      setLng('');
      setSelectedFile(null);
      fetchAttractions();
    } catch (err) {
      alert("Eroare la adăugare");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Ești sigur că vrei să ștergi această atracție?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/attractions/${id}`, {
        headers: { Authorization: token }
      });
      fetchAttractions();
    } catch (err) {
      alert("Eroare la ștergere");
    }
  };

  return (
    <div>
      <h2>Panou Administrator</h2>

      <form onSubmit={handleAdd} className="mb-4">
        <h5>Adaugă o atracție turistică</h5>
        <input
          className="form-control mb-2"
          placeholder="Nume"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <textarea
          className="form-control mb-2"
          placeholder="Descriere"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          step="any"
          className="form-control mb-2"
          placeholder="Latitudine"
          value={lat}
          onChange={e => setLat(e.target.value)}
          required
        />
        <input
          type="number"
          step="any"
          className="form-control mb-2"
          placeholder="Longitudine"
          value={lng}
          onChange={e => setLng(e.target.value)}
          required
        />

        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <button className="btn btn-success">Adaugă</button>
      </form>

      <h5>Atracții existente</h5>
      <div className="row">
        {attractions.map((a) => (
          <div className="col-md-4 mb-3" key={a._id}>
            <div className="card">
              <img src={ a.imageUrl.startsWith('/uploads/') ? `${process.env.REACT_APP_API_URL}${a.imageUrl}` : `${a.imageUrl}`} className="card-img-top" alt={a.name} />
              <div className="card-body">
                <h5 className="card-title">{a.name}</h5>
                <p className="card-text">{a.description}</p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(a._id)}
                >
                  Șterge
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
