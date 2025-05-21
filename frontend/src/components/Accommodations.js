import React from 'react';

const accommodations = [
  {
    name: "Hotel Orizont Cozia",
    location: "Călimănești",
    type: "Hotel 3★",
    image: "/images/hotel_orizont.jpg",
    website: "https://www.hotel-orizont.ro/",
    phone: "+40748291031"
  },
  {
    name: "Pensiunea Hanul Vatra",
    location: "Costești",
    type: "Pensiune 4★",
    image: "/images/hanul_vatra.jpg",
    website: "https://hanulvatra.com/ro/",
    phone: "+40729782777"
  },
  {
    name: "Casa Veche",
    location: "Horezu",
    type: "Cabana tradițională",
    image: "/images/casa_veche.jpg",
    website: "https://www.casaveche.com/",
    phone: "+40746909915"
  },
  {
    name: "Grand Hotel Sofianu",
    location: "Râmnicu Vâlcea",
    type: "Hotel 4★",
    image: "/images/hotel_sofianu.jpg",
    website: "https://www.hotelsofianu.ro/ro/",
    phone: "+40750431697"
  },
  {
    name: "Noblesse Hotel Boutique & Spa",
    location: "Râmnicu Vâlcea",
    type: "Hotel 4★",
    image: "/images/hotel_noblesse.jpg",
    website: "https://resortparadis.ro/hotel-noblesse/",
    phone: "+40742086828"
  },
  {
    name: "Denta Suport Hotel",
    location: "Râmnicu Vâlcea",
    type: "Hotel 4★",
    image: "/images/hotel_denta.jpg",
    website: "https://www.dentasuporthotel.ro/",
    phone: "+40743447444"
  }
];

function Accommodations() {
  return (
    <div>
      <h2>Cazări Recomandate în Vâlcea</h2>
      <div className="row">
        {accommodations.map((acc, index) => {
          // Format link WhatsApp cu mesaj predefinit
          const phoneNumber = acc.phone.replace(/\D/g, '');
          const message = encodeURIComponent(`Bună ziua! Sunt interesat de o rezervare la ${acc.name}.`);
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

          return (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100">
                <img src={acc.image} className="card-img-top" alt={acc.name} />
                <div className="card-body">
                  <h5 className="card-title">{acc.name}</h5>
                  <p className="card-text">{acc.type} - {acc.location}</p>
                  <a
                    href={acc.website}
                    className="btn btn-primary me-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Vezi site-ul
                  </a>
                  <a
                    href={whatsappUrl}
                    className="btn btn-success"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Contactează-ne
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Accommodations;
