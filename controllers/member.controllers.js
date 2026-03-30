import { Member} from '../models/index.js';
import { Op } from "sequelize";

// 1 . Recuperer les membres
export const getMembre = async (req, res) => {
    try {
        // 1. On récupère search depuis req.query (comme ton ami l'a fait pour les livres)
        const { search, page = 1, limit = 10 } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(limit);

        // 2. On prépare l'objet de recherche (exactement comme dans ton exemple précédent)
        const where = {};

        if (search) {
            where[Op.or] = [
                { first_name: { [Op.like]: `%${search}%` } }, // Recherche dans le prénom
                { last_name: { [Op.like]: `%${search}%` } },  // Recherche dans le nom
            ];
        }

        // 3. Exécution de la requête avec le filtre 'where'
        const { count, rows } = await Member.findAndCountAll({
            where, // On applique le filtre ici
            limit: parseInt(limit),
            offset: offset,
            order: [['createdAt', 'DESC']]
        });

        // 4. Renvoi du résultat au format attendu par le prof
        return res.status(200).json({
            total: count,
            page: parseInt(page),
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



