import React from 'react';

const accommodations = [
  {
    name: "Hotel Orizont Cozia",
    location: "Călimănești",
    type: "Hotel 3★",
    image: "/images/hotel_orizont.jpg",
    website: "https://www.hotel-orizont.ro/"
  },
  {
    name: "Pensiunea Hanul Vatra",
    location: "Costești",
    type: "Pensiune 4★",
    image: "/images/hanul_vatra.jpg",
    website: "https://hanulvatra.com/ro/"
  },
  {
    name: "Casa Veche",
    location: "Horezu",
    type: "Cabana tradițională",
    image: "/images/casa_veche.jpg",
    website: "https://www.casaveche.com/"
  },
  {
    name: "Grand Hotel Sofianu",
    location: "Râmnicu Vâlcea",
    type: "Hotel 4★",
    image: "/images/hotel_sofianu.jpg",
    website: "https://www.hotelsofianu.ro/ro/"
  },
  {
    name: "Noblesse Hotel Boutique & Spa",
    location: "Râmnicu Vâlcea",
    type: "Hotel 4★",
    image: "/images/hotel_noblesse.jpg",
    website: "https://resortparadis.ro/hotel-noblesse/"
  },
  {
    name: "Denta Suport Hotel",
    location: "Râmnicu Vâlcea",
    type: "Hotel 4★",
    image: "/images/hotel_denta.jpg",
    website: "https://www.dentasuporthotel.ro/"
  }
];

function Accommodations() {
  return (
    <div>
      <h2>Cazări Recomandate în Vâlcea</h2>
      <div className="row">
        {accommodations.map((acc, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <img src={acc.image} className="card-img-top" alt={acc.name} />
              <div className="card-body">
                <h5 className="card-title">{acc.name}</h5>
                <p className="card-text">{acc.type} - {acc.location}</p>
                <a href={acc.website} className="btn btn-primary" target="_blank" rel="noreferrer">
                  Vezi site-ul
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accommodations;
