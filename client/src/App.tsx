import React from 'react';
import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom'; // Import Routes
import './App.css';
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import FileUpload from './Pages/FileUpload';
import NotFound from './Pages/NotFound';
import theme from './utils/theme';
import Dashboard from './Pages/Dashboard';
import Header from './Components/Header';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Header />

			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/upload-file" element={<FileUpload />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
