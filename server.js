import app from './app.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { sequelize , User} from './models/index.js';

dotenv.config();


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



sequelize.sync({})
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

