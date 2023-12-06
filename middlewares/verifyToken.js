import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.header("authorization");
    if (!token) return res.status(401).send("Access Denied.");

    try {
        const verified = jwt.verify(token, process.env.TOKEN);
        req.user = verified;
        next();

    } catch (err) {
        res.status(400).send("Invalid Token.");
    };
};

export default verifyToken;