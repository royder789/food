import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET || "twentysixthmay"; // Use env variable

const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.headers["token"]; // Get token from headers

        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
        }

        const token_decode = jwt.verify(token, JWT_SECRET);
        req.body.userId = token_decode.id; // Attach user ID to request
        next();
    } catch (error) {
        console.log("Auth Error:", error.message);
        return res.status(403).json({ success: false, message: "Invalid token. Authentication failed." });
    }
};

export default authMiddleWare;
