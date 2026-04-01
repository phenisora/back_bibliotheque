import express from "express";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import categoryRoutes from "./routes/category.routes.js";
import membersRoutes from "./routes/member.routes.js";
import bookRoutes from "./routes/book.routes.js";
import borrowsRoutes from "./routes/borrow.routes.js";
import statsRoutes from "./routes/stats.routes.js"

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5000/api"
})
)

app.use('/api/auth',authRoutes);

app.use('/api/categories',categoryRoutes);

app.use('/api/members',membersRoutes);

app.use('/api/books', bookRoutes);

app.use('/api/borrows',borrowsRoutes);

app.use("/api/stats", statsRoutes);





app.listen(5000, () => {
  console.log("Serveur lancé sur http://localhost:5000");
});

export default app;
