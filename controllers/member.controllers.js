import { Member} from '../models/index.js';
import { Op } from "sequelize";

// 1 . Recuperer les membres
export const getMembre = async (req, res) => {
    try {
        // 1. Récupérer la page depuis l'URL (ex: ?page=1), par défaut 1
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // Nombre de membres par page
        const offset = (page - 1) * limit;

        // 2. findAndCountAll récupère les données ET le nombre total
        const { count, rows } = await Member.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']] // Les plus récents en premier
        });

        // 3. Renvoyer exactement le format de l'image du prof
        return res.status(200).json({
            total: count,
            page: page,
            totalPages: Math.ceil(count / limit),
            members: rows
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "Erreur lors de la récupération des membres", 
            error: error.message 
        });
    }
};



// 2 . Creer un membre
export const creerMembre = async(req,res) =>{
    try {
      
        const { first_name, last_name, email, phone, address, status } = req.body;

        const newMember = await Member.create({
            first_name,
            last_name,
            email,
            phone,
            address,
            status
        });

        return res.status(201).json(newMember);
    } catch (error) {
        return res.status(400).json({ message: "Erreur lors de la création", error: error.message });
    }



};


// 3. Modifier un membre

export const modifierMembre= async (req, res) => {
    try {
        const { id } = req.params; 
        const { first_name, last_name, email, phone, address, status } = req.body;

        // On cherche d'abord si le membre existe
        const member = await Member.findByPk(id);
        
        if (!member) {
            return res.status(404).json({ message: "Membre non trouvé" });
        }

        // MISE À JOUR 
        await Member.update(
            { first_name, last_name, email, phone, address, status },
            { where: { id: id } } 
        );

        return res.status(200).json({ message: "Membre modifié avec succès" });

    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// 4 . Supprimer un membre

export const supprimerMembre = async (req,res) => {

    try {
        const member = await Member.findByPk(req.params.id);

        if (!member) {
            return res.status(404).json({ message: "Introuvable" });
        }

        await member.destroy();
        return res.status(200).json({ message: "Membre supprimé avec succés" });

    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }



};

// 5. Rechercher un membre

export const rechercherMembre = async (req,res) => {
    try {
        const nom = req.query.nom; 

        const membres = await Member.findAll({
            where: {
                last_name: { [Op.like]: `%${nom}%` } 
            }
        });

        res.json(membres); 

    } catch (error) {
        res.status(500).json({ message: "Erreur" });
    }

};

