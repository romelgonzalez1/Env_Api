const JwtService = require('./JwtService');

const authenticate = (req, res, next) => {

    const jwtService = new JwtService();

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado: Token no proporcionado' });
    }

    const decoded = jwtService.verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Acceso no autorizado: Token inválido o expirado' });
    }

    req.userId = decoded.id;

    next();
};

module.exports = authenticate;