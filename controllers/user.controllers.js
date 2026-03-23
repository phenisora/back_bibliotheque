import bcrypt from "bcrypt";
import {User} from '../models/index.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//   Register

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Hasher le mot de passe
        const mdpHashed = await bcrypt.hash(password, 10);

        // 2. Créer l'utilisateur (
        const newUser = await User.create({
            name,
            email,
            password: mdpHashed
        });

        // 3. Générer le Token JWT 
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            process.env.SECRET_KEY,
            { expiresIn: '7d' }
        );

      
        return res.status(201).json({
            token: token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (err) {
        // En cas d'erreur (ex: email déjà utilisé)
        return res.status(400).json({ error: err.message });
    }
}

//   Se Connecterr
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Recherche de l'utilisateur
        const user = await User.findOne(
            { where: { email } 
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2. Comparaison du mot de passe 
        const isPwdValid = await bcrypt.compare(password, user.password);

        if (!isPwdValid) {
          
            return res.status(401).json({ message: "Dangua fater sa mot de passe" });
        }

        // 3. Génération du token
        const token = jwt.sign(
            { id: user.id },
            process.env.SECRET_KEY,
            { expiresIn: '7d' }
        );

       
        return res.status(200).json({
            message: "Connecté",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


// Obtenir Profile
export const getProfile = async (req, res) => {
    try {
      
        const user = await User.findByPk(req.userId, {
            attributes: ['id', 'name', 'email']
        });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        return res.status(200).json(user);

    } catch (error) { 
        return res.status(500).json({ message: error.message });
    }
};