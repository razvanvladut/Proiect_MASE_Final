import React, { useState } from 'react';
import axios from 'axios';

function UploadImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [error, setError] = useState(null);

  // Când selectezi o imagine
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setUploadedUrl(null);
      setError(null);
    }
  };

  // Trimite imaginea la backend
  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setUploading(true);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadedUrl(res.data.imageUrl);
      setError(null);
    } catch (err) {
      setError('Eroare la upload.');
      setUploadedUrl(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Încarcă o imagine</h3>

      <div className="mb-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="form-control"
        />
      </div>

      {preview && (
        <div className="mb-3">
          <p>Preview:</p>
          <img
            src={preview}
            alt="preview"
            style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'contain' }}
          />
        </div>
      )}

      <button
        className="btn btn-primary"
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
      >
        {uploading ? 'Se încarcă...' : 'Încarcă'}
      </button>

      {uploadedUrl && (
        <div className="alert alert-success mt-3">
          Imaginea a fost încărcată cu succes!<br />
          <a href={`${process.env.REACT_APP_API_URL}${uploadedUrl}`} target="_blank" rel="noreferrer">
            Vezi imaginea aici
          </a>
        </div>
      )}

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default UploadImage;
