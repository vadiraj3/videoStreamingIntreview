// Video.js

const db = require('../db/dbConfig'); // Import the database connection

// Define the Video model
class Video {
	constructor() {}

	getVideos() {
		const sql = `Select * from uploaded_videos`;
		return new Promise((resolve, reject) => {
			db.query(sql, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	create({ fileName, fileSize, fileType, filePath }) {
		const sql =
			'INSERT INTO uploaded_videos(file_name, file_size, file_type, file_path) values(?,?,?,?)';
		return new Promise((resolve, reject) => {
			db.query(sql, [fileName, fileSize, fileType, filePath], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	// Add other methods as needed
}

module.exports = new Video();
