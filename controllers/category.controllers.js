import { Category, Book } from '../models/index.js';

// 1. Récupérer toutes les catégories

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [{
                model: Book,
                as: 'books', 
                attributes: ['id']
            }]
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Créer une catégorie 
export const creerCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        // On crée la catégorie dans MySQL
        const newCategory = await Category.create({ name, description });
        
        res.status(201).json(newCategory);
    } catch (error) {
      
        res.status(400).json({ message: "Erreur lors de la création", error: error.message });
    }
};

// 3 . Modifie une catégorie

export const modifierCategory = async (req,res) => {

    try{

        const {id}= req.params;
        const {name,description} = req.body;

        const category = await Category.findByPk(id);
        if(!category){
             res.status(404).json({ message: "Categorie non trouvé"});
        }

        await category.update({name,description});
        res.status(200).json({ message: "Catégorie modifiée ", category });
    } catch (error) {
         res.status(400).json({ message: "Erreur lors de la modification", error: error.message });

    }

};

// 4 . Supprimer une catégorie

export const supprimerCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Introuvable" });
        }

        await category.destroy();
        return res.status(200).json({ message: "Categorie supprimé avec succés" });

    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};