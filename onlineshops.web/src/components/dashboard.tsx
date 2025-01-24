import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItemText, CssBaseline, Box, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, Link } from 'react-router-dom'

function Dashboard() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setOpenDrawer(!openDrawer);
    };

    const handleLogout = () => {
        navigate(`/login`)
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={openDrawer}
            >
                <List>
                    <ListItemButton component={Link} to="/dashboard">
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/list-category">
                        <ListItemText primary="Categories" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/list-product">
                        <ListItemText primary="Products" />
                    </ListItemButton>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>

                        </Typography>
                        <Button
                            color="inherit"
                            variant="text"
                            onClick={handleLogout}
                            sx={{ ml: 2 }}
                        >
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box sx={{ mt: 4, mr: 40 }}>
                    <p>Hello User!</p>
                </Box>
            </Box>
        </Box>
    );
}

export default Dashboard;
