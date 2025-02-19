const mongoose = require('mongoose');

// Définir le schéma pour les produits
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true, // Ajoute automatiquement createdAt & updatedAt
    }
);

// Exporter le modèle
module.exports = mongoose.model('Product', productSchema);
