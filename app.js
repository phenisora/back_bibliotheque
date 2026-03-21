
import express from "express";

const app = express();

app.use(express.json());


app.listen(5000, () => {
  console.log("Serveur lancé sur http://localhost:5000");
});



export default app;