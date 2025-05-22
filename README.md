# Proiect_MASE_Final

# Turism Vâlcea - Backend & Frontend

Aplicație full-stack pentru gestionarea atracțiilor turistice și galeriei foto din zona Vâlcea, România.  
Backend-ul este realizat cu Node.js, Express și MongoDB, iar frontend-ul este o aplicație React.

---

## Funcționalități principale

- Autentificare și autorizare utilizatori (admin și user normal)
- Gestionare atracții turistice (adăugare, ștergere) - doar pentru admin
- Upload și afișare imagini pentru atracții și galerie
- Vizualizare lista de atracții turistice
- Galerie foto cu imagini încărcate de utilizatori

---

## Tehnologii folosite

- Backend: Node.js, Express, MongoDB, Mongoose, JWT pentru autentificare, Multer pentru upload fișiere
- Frontend: React
- Hosting: Azure Web Apps
- Gestionare cod: GitHub + GitHub Actions pentru CI/CD

---

## Setup local

### Backend

1. Clonează repo-ul și intră în folderul backend:
    ```bash
    cd backend
    ```
2. Instalează dependențele:
    ```bash
    npm install
    ```
3. Creează un fișier `.env` în directorul backend cu următoarele variabile:
    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/turism-valcea
    JWT_SECRET=supersecretjwtkey
    ```
4. Pornește serverul backend:
    ```bash
    npm start
    ```

### Frontend

1. Intră în folderul frontend:
    ```bash
    cd frontend
    ```
2. Instalează dependențele:
    ```bash
    npm install
    ```
3. Pornește frontend-ul în modul dezvoltare:
    ```bash
    npm start
    ```
4. Accesează aplicația în browser la [http://localhost:3000](http://localhost:3000)

---


