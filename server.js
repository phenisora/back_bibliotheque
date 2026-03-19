import app from './app.js';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';

dotenv.config();

sequelize.sync({force:false})
     .then(()=>{
        app.listen(process.env.PORT || 3000,()=>{
        console.log(`Serveur Disponible sur le port  ${process.env.PORT}`);
    });
    console.log("Base de donnée synchronisée");
})
     .catch((err)=>{
        console.error("Erreur:",err);

});

