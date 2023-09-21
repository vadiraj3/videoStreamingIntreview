import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';

function Header() {
	const pathname = useLocation().pathname;
	return (
		<AppBar position="static">
			<Toolbar style={{ backgroundColor: 'white' }}>
				<Link to="/">
					<Button
						variant={pathname == '/' ? 'contained' : 'outlined'}
						color="primary"
					>
						Dashboard
					</Button>
				</Link>
				<div style={{ marginLeft: '40px' }}></div>
				<Link to="/upload-file">
					<Button
						variant={pathname == '/upload-file' ? 'contained' : 'outlined'}
						color="primary"
					>
						Upload File
					</Button>
				</Link>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
