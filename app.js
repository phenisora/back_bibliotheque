import express from "express";
import authRoutes from "./routes/auth.routes.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.listen(5000, () => {
  console.log("Serveur lancé sur http://localhost:5000");
});


app.use('/api/auth',authRoutes);

export default app;