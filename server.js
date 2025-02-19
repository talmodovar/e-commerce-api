const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
const dotenv = require('dotenv');

// Charger les variables d’environnement
dotenv.config();

// Initialiser l’application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware : Traiter les requêtes avec JSON
app.use(express.json());

// Définir la route principale (GET "/")
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the E-commerce API!' });
});

// Utiliser le fichier de routes pour les produits
app.use('/api/products', productRoutes);

// Connexion à MongoDB
mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected!'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

