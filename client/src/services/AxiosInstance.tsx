import axios from 'axios';
import { toast } from 'react-toastify';

export const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(
	(config) => {
		config.headers['Content-Type'] = 'application/json';
		config.headers['app-name'] = 'Video Streaming';
		config.headers['app-key'] = 'SDLinglEinn2332';
		config.headers['Accept-Language'] = 'en';

		return config;
	},
	(error) => {
		// Handle request error
		return Promise.reject(error);
	}
);

let error = false;
axiosInstance.interceptors.response.use(
	(response) => {
		console.log(response.data);
		return response?.data;
	},
	(error) => {
		// Handle response error
		if (error?.response?.status && error.response.status == 400) {
			toast.error(error.response.data.error.message);
		}
		if (error?.response?.status && error.response.status == 401) {
			toast.error(error.response.data.error.message);
		}
		if (error?.response?.status && error.response.status == 500) {
			toast.error(error.response.data.error.message);
		}

		return Promise.reject(error);
	}
);

// Create a separate Axios instance for file uploads
export const axiosUpload = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

// Add an interceptor specific to the axiosUpload instance
axiosUpload.interceptors.request.use((config) => {
	config.headers['Content-Type'] = 'multipart/form-data'; // Set Content-Type only for file uploads

	return config;
});
