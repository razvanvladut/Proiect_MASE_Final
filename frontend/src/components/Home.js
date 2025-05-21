import React from 'react';

function Home() {
  return (
    <div className="text-center">
      <h1>Bine ai venit în județul Vâlcea!</h1>
      <p className="lead mt-3">
        Explorează cele mai frumoase atracții turistice, cazări pitorești și împărtășește amintiri din călătoriile tale.
      </p>
      <img
        src="/images/judetul_valcea.jpg"
        className="img-fluid mt-4"
        alt="Valcea"
        style={{ maxHeight: '500px', borderRadius: '10px' }}
/>
    </div>
  );
}

export default Home;
