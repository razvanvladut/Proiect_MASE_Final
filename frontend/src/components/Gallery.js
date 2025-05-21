import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState('view'); // 'view' sau 'upload'
  const isLoggedIn = localStorage.getItem('token');

  const loadGallery = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/gallery`);
      setGallery(res.data);
    } catch (err) {
      alert("Eroare la încărcarea pozelor");
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Selectează o imagine!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('description', description);

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/gallery/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('token')
          }
        }
      );

      setSelectedFile(null);
      setDescription('');
      setActiveTab('view');
      loadGallery();

    } catch (err) {
      alert("Eroare la încărcarea imaginii");
    }
  };

  return (
    <div>
      <h2>Galerie Turistică</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link custom-tab-button ${activeTab === 'view' ? 'active' : ''}`}
            onClick={() => setActiveTab('view')}
          >
            Vezi Imagini
          </button>
        </li>
        {isLoggedIn && (
          <li className="nav-item">
            <button
              className={`nav-link custom-tab-button ${activeTab === 'upload' ? 'active' : ''}`}
              onClick={() => setActiveTab('upload')}
            >
              Încarcă Imagine
            </button>
          </li>
        )}
      </ul>

      {/* Tab Content */}
      {activeTab === 'view' && (
        <div className="row">
          {gallery.map((photo) => (
            <div className="col-md-4 mb-3" key={photo._id}>
              <div className="card">
                <img
                  src={`${process.env.REACT_APP_API_URL}${photo.imageUrl}`}
                  className="card-img-top"
                  alt="Calatorie"
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body">
                  <p className="card-text">{photo.description}</p>
                  <small className="text-muted">Postat de utilizatorul ID: {photo.user}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'upload' && (
        <form onSubmit={handleUpload}>
          <div className="mb-3">
            <label className="form-label">Selectează o imagine</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Descriere"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary" type="submit">Încarcă</button>
        </form>
      )}
    </div>
  );
}

export default Gallery;
