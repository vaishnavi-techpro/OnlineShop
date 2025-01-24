import  { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Drawer, List, ListItemButton, ListItemText, CssBaseline, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleDrawerToggle = () => {
        setOpenDrawer(!openDrawer);
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
                        <Button
                            color="inherit"
                            variant="text"
                            sx={{ ml: 2 }}
                        >
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </Box>
    );
}

export default Dashboard;
