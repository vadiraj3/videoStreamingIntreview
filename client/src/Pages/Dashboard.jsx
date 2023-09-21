import React from 'react';
import { useQuery } from 'react-query';
import { Grid, Container, Box } from '@mui/material';
import VideoCard from '../Components/VideoCard'; // Component to display individual videos
import { fetchVideos } from '../services/api';
import Loader from '../Components/Loader';
import { toast } from 'react-toastify';

function Dashboard() {
	const { data: videos, isLoading, isError } = useQuery('videos', fetchVideos);

	if (isLoading) {
		return <Loader />;
	}

	if (isError) {
		toast.error('Error fetching videos ');
		return <></>;
	}

	return (
		<Container
			maxWidth="xl"
			sx={{
				marginTop: '70px',
			}}
			spacing={3}
			direction="row"
		>
			<Grid container spacing={3}>
				{videos?.videos?.map((video) => (
					<Grid item xs={12} sm={6} md={4} key={video.id}>
						<VideoCard video={video} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
}

export default Dashboard;
