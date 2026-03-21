import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const authHead = req.headers.authorization;
        if (!authHead) {
            return res.status(401).json({ message: "Token manquant" });
        }

        const token = authHead.split(" ")[1]; 
        
        if (!token) {
           
            return res.status(401).json({ message: "TM" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "token invalideee", erreur: error.message });
    }
}