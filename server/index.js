const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const fileRoute = require('./routes/video');
const dbConnect = require('./db/dbConfig');
const cors = require('cors');
const app = express();

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

app.use(express.json());
app.use('/uploads', express.static('uploads'));

io.on('connection', (socket) => {
	// Listen for 'play_video' event
	socket.on('play_video', ({ videoId }, callback) => {
		if (typeof videoId === 'number' && !isNaN(videoId)) {
			console.log(videoId);
			// Broadcast to all connected clients to start playing the selected video
			io.emit('start_playing_video', { videoId });
			callback({ success: true });
		} else {
			// Handle the case where videoId is not a valid number
			callback({ error: 'Invalid video ID.' });
		}
	});
});

app.use('/videos', fileRoute);

const PORT = process.env.SERVER_PORT || 3001;

const start = async () => {
	try {
		dbConnect.getConnection((err, connection) => {
			if (err) {
				console.error('Error connecting to the database:', err);
				// Handle connection error
			} else {
				console.log('Connected to the database!');
				server.listen(PORT, () => {
					console.log('Server running and Database connected Successfully');
				});
				connection.release();
			}
		});
	} catch (error) {
		console.log(error.message);
	}
};

start();
