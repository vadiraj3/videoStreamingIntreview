import React, { useState, ChangeEvent } from 'react';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useMutation, useQueryClient } from 'react-query';
import { fileUpload } from '../services/api';
import { toast } from 'react-toastify';

function FileUpload() {
	const queryClient = useQueryClient();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const { mutate } = useMutation(fileUpload, {
		onSuccess: () => {
			toast.success('File uploaded successfully');
			setSelectedFile(null);
			// Invalidate and refetch any relevant queries after successful upload
			queryClient.invalidateQueries('videos');
		},
		onError: () => {
			toast.error('Error uploading file');
		},
	});

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setSelectedFile(e.target.files[0]);
		}
	};

	const handleUpload = async () => {
		if (!selectedFile) {
			// No file selected
			return;
		}
		mutate(selectedFile);
	};

	return (
		<Container
			style={{
				display: 'flex',
				alignItems: 'center',
				height: '90vh',
				justifyContent: 'center',
			}}
		>
			<Paper elevation={3} style={{ padding: '20px' }}>
				<Grid container spacing={2} justifyContent="center">
					<Grid item xs={12}>
						<Typography variant="h5" align="center">
							Upload a Video File
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<input
							type="file"
							accept=".mp4, .avi, .mkv"
							style={{ display: 'none' }}
							id="file-upload"
							onChange={handleFileChange}
						/>
						<label htmlFor="file-upload">
							<Button
								variant="contained"
								component="span"
								startIcon={<CloudUploadIcon />}
								fullWidth
								color="primary"
							>
								Choose a File
							</Button>
						</label>
					</Grid>
					<Grid item xs={12}>
						{selectedFile && (
							<Typography variant="body1">
								Selected File: {selectedFile.name}
							</Typography>
						)}
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							color="primary"
							onClick={handleUpload}
							fullWidth
						>
							Upload
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}

export default FileUpload;
