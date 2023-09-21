const Video = require('../modals/Video');

const getVideos = async (req, res) => {
	const videos = await Video.getVideos();

	res.status(200).json({
		message: 'Videos retrieved successfully',
		videos: videos,
	});
};

const uploadVideo = (req, res) => {
	try {
		if (!req.file) {
			// No file was uploaded
			return res.status(400).json({ error: 'No file uploaded' });
		}

		// Access the uploaded file's information
		const { originalname, size, mimetype, filename } = req.file;

		// Perform any additional validation or checks here (e.g., file format, size limit)

		// Save the uploaded file to a local folder (e.g., 'uploads/')
		const uploadFolder = 'uploads/'; // Specify the folder where you want to save the files
		const filePath = `http://localhost:3001/${uploadFolder}${filename}`;

		// Move the file to the specified location
		req.file.path = filePath; // Update the file path to the saved location

		// You may want to create a new record in your database to store information about the uploaded file

		const newVideo = Video.create({
			// Define properties for your Video model (e.g., file name, size, etc.)
			fileName: originalname,
			fileSize: size,
			fileType: mimetype,
			filePath: filePath, // Store the file path in the database
		});

		// Respond with a success message and the saved video record
		res.json({
			message: 'File uploaded successfully',
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
};

module.exports = { uploadVideo, getVideos };
