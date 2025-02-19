const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Route GET : Récupérer tous les produits
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Trouver tous les produits
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route POST : Ajouter un produit
router.post('/', async (req, res) => {
    const { name, price, description } = req.body;

    const product = new Product({
        name,
        price,
        description,
    });

    try {
        const newProduct = await product.save(); // Sauvegarder dans la base de données
        res.status(201).json(newProduct); // Réponse JSON
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route GET : Récupérer un produit par ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found!' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route PUT : Mettre à jour un produit
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Renvoie l'objet mis à jour
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found!' });
        }

        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route DELETE : Supprimer un produit
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found!' });
        }
        res.status(204).send(); // Succès sans contenu
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
