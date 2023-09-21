import React, { useState } from 'react';
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Button,
} from '@mui/material';
import io from 'socket.io-client';

function VideoCard({ video }) {
	console.log(video);
	const [playing, setPlaying] = useState(false);

	// Create a socket.io client connection
	const socket = io.connect(process.env.REACT_APP_API_URL);

	const handlePlayVideo = () => {
		const videoId = 1;
		// Emit a message to the server to start playing the selected video

		// Listen for 'start_playing_video' event
		socket.emit('play_video', { videoId }, (response) => {
			if (response.error) {
				// Handle error, e.g., display an error message to the user
				console.error(response.error);
			} else if (response.success) {
				// Handle success, e.g., update the UI
				setPlaying(true);
				console.log('Video playback started successfully');
			}
		});
	};

	return (
		<Card>
			<CardMedia
				component="video"
				alt={video.file_name}
				height="140"
				src={video.file_path}
				title={video.file_name}
				controls
				autoPlay={playing}
			/>
			<CardContent>
				<Typography variant="subtitle1">{video.title}</Typography>
				<Typography variant="body2" color="textSecondary">
					{video.description}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default VideoCard;
