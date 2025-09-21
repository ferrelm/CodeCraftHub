const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
	const authHeader = req.header('Authorization');
	const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

	if (!token) return res.status(401).json({ error: 'Access denied.' });
	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret');
		req.user = verified;
		next();
	} catch (error) {
		res.status(400).json({ error: 'Invalid token.' });
	}
};

module.exports = authMiddleware;
