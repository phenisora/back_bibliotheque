import app from './app.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { sequelize , User} from './models/index.js';

dotenv.config();
//Cela va vérifier si la structure de la table a changé (ajout d'une colonne par exemple) et la modifier sans supprimer les données existantes.

const createDefaultAdmin = async () => {
    const userCount = await User.count();
    
    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Admin",
        email: "admin@bibliotheque.com",
        password: hashedPassword,
      });
      console.log("Admin par défaut créé");
    }
  };



sequelize.sync({alter: true})
     .then(async()=>{
        await createDefaultAdmin();
        app.listen(process.env.PORT || 3000,()=>{
        console.log(`Serveur Disponible sur le port  ${process.env.PORT}`);
    });
    console.log("Base de donnée synchronisée");
})
     .catch((err)=>{
        console.error("Erreur:",err);

});

