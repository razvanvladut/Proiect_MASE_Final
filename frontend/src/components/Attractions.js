import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Attractions() {
  const [attractions, setAttractions] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/attractions`)
      .then(res => {
        console.log('Atracții primite:', res.data);
        setAttractions(res.data)
      })
      .catch(() => alert("Eroare la încărcarea atracțiilor"));
  }, []);

  const toggleDescription = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="container">
      <h2 className="mb-4">Atracții Turistice</h2>
      <div className="row">
        {attractions.map(a => (
          <div className="col-md-4 mb-3" key={a._id}>
            <div className="card h-100 shadow">
              <img
                src={a.imageUrl}
                className="card-img-top"
                alt={a.name}
                style={{ maxHeight: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{a.name}</h5>

                {expandedId === a._id && (
                  <p className="card-text">{a.description}</p>
                )}

                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => toggleDescription(a._id)}
                >
                  {expandedId === a._id ? 'Ascunde Detalii' : 'Afișează Detalii'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Attractions;
