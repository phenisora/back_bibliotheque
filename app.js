import express from "express";
import authRoutes from "./routes/auth.routes.js";
import cors from 'cors';
import categoryRoutes from "./routes/category.routes.js";


const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth',authRoutes);

app.use('/api/categories',categoryRoutes);




app.listen(5000, () => {
  console.log("Serveur lancé sur http://localhost:5000");
});




export default app;