import app from './app.js';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';

dotenv.config();
//Cela va vérifier si la structure de la table a changé (ajout d'une colonne par exemple) et la modifier sans supprimer les données existantes.
sequelize.sync({alter: true})
     .then(()=>{
        app.listen(process.env.PORT || 3000,()=>{
        console.log(`Serveur Disponible sur le port  ${process.env.PORT}`);
    });
    console.log("Base de donnée synchronisée");
})
     .catch((err)=>{
        console.error("Erreur:",err);

});

