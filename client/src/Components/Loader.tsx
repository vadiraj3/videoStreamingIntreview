import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loader = () => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="80vh"
		>
			<CircularProgress size="4rem" />
		</Box>
	);
};

export default Loader;
