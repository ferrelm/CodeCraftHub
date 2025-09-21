const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env'), override: true });
const connectDB = require('./config/db');
const initServer = require('./config/server');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./utils/errorHandler');

const app = initServer();

// Initiate DB connection (non-blocking for server startup)
connectDB();

// Routes & middleware
app.use('/api/users', userRoutes);
app.use(errorHandler);

// Start server with automatic port selection if in use
const startServer = (port) => {
	const server = app.listen(port, () => {
		console.log(`Server running on port ${port}`);
	});
	server.on('error', (err) => {
		if (err.code === 'EADDRINUSE') {
			const nextPort = Number(port) + 1;
			console.warn(`Port ${port} is in use. Trying port ${nextPort}...`);
			startServer(nextPort);
		} else {
			console.error('Server failed to start:', err);
			process.exit(1);
		}
	});
};

startServer(process.env.PORT || 5000);
