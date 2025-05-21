import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const centerValcea = {
  lat: 45.1,
  lng: 24.0
};

function Map() {
  const [attractions, setAttractions] = useState([]);
  const [selected, setSelected] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/attractions`)
      .then(res => setAttractions(res.data))
      .catch(() => alert("Eroare la atracții pentru hartă"));
  }, []);

  if (!isLoaded) return <div>Se încarcă harta...</div>;

  return (
    <div>
      <h2>Hartă Atracții Turistice</h2>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerValcea}
        zoom={9}
      >
        {attractions.map((a) => (
          <Marker
            key={a._id}
            position={{ lat: a.location.lat, lng: a.location.lng }}
            onClick={() => setSelected(a)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{
              lat: selected.location.lat,
              lng: selected.location.lng
            }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h6>{selected.name}</h6>
              <p>{selected.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default Map;
