import { useState } from 'react';

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from '@mui/material';

import { Link, useLocation } from 'react-router-dom';

import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Navbar() {
    const location = useLocation();

    const [menuAbierto, setMenuAbierto] = useState(false);

    const menuItems = [
        { label: 'Dashboard', path: '/' },
        { label: 'Medicamentos', path: '/medicamentos' },
        { label: 'Categorías', path: '/categorias' },
        { label: 'Empleados', path: '/empleados' }
    ];

    const cerrarMenu = () => {
        setMenuAbierto(false);
    };

    return (
        <>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    background:
                        'linear-gradient(135deg, #00897B 0%, #00796B 45%, #1565C0 100%)',
                    color: '#FFFFFF',
                    boxShadow:
                        '0 4px 16px rgba(25, 118, 210, 0.22)'
                }}
            >
                <Toolbar
                    sx={{
                        minHeight: 72,
                        px: { xs: 2, md: 5 },
                        maxWidth: 1400,
                        width: '100%',
                        mx: 'auto',
                        boxSizing: 'border-box'
                    }}
                >
                    {/* Logo y nombre */}
                    <Box
                        component={Link}
                        to="/"
                        onClick={cerrarMenu}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.2,
                            textDecoration: 'none',
                            color: '#FFFFFF',
                            mr: { xs: 0, md: 5 },
                            minWidth: 0
                        }}
                    >
                        <Box
                            sx={{
                                width: 44,
                                height: 44,
                                flexShrink: 0,
                                borderRadius: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                    'rgba(255, 255, 255, 0.16)',
                                border:
                                    '1px solid rgba(255, 255, 255, 0.22)',
                                boxShadow:
                                    '0 4px 12px rgba(0, 0, 0, 0.12)'
                            }}
                        >
                            <LocalPharmacyIcon sx={{ fontSize: 26 }} />
                        </Box>

                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    lineHeight: 1.1,
                                    letterSpacing: '-0.3px'
                                }}
                            >
                                FarmaciApp
                            </Typography>

                            <Typography
                                variant="caption"
                                sx={{
                                    color:
                                        'rgba(255, 255, 255, 0.78)',
                                    display: {
                                        xs: 'none',
                                        sm: 'block'
                                    }
                                }}
                            >
                                Gestión farmacéutica
                            </Typography>
                        </Box>
                    </Box>

                    {/* Menú de escritorio */}
                    <Box
                        sx={{
                            display: {
                                xs: 'none',
                                md: 'flex'
                            },
                            alignItems: 'center',
                            gap: 0.5,
                            height: '100%'
                        }}
                    >
                        {menuItems.map((item) => {
                            const activo =
                                location.pathname === item.path;

                            return (
                                <Button
                                    key={item.path}
                                    component={Link}
                                    to={item.path}
                                    sx={{
                                        height: 44,
                                        minWidth: 'auto',
                                        px: 2,
                                        borderRadius: 2,
                                        border:
                                            '1px solid transparent',
                                        color: activo
                                            ? '#1565C0'
                                            : 'rgba(255, 255, 255, 0.9)',
                                        fontWeight: activo ? 700 : 500,
                                        backgroundColor: activo
                                            ? '#FFFFFF'
                                            : 'transparent',
                                        transition:
                                            'background-color 0.2s ease, color 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: activo
                                                ? '#FFFFFF'
                                                : 'rgba(255, 255, 255, 0.13)',
                                            color: activo
                                                ? '#1565C0'
                                                : '#FFFFFF'
                                        }
                                    }}
                                >
                                    {item.label}
                                </Button>
                            );
                        })}
                    </Box>

                    {/* Botón hamburguesa en móvil */}
                    <Box
                        sx={{
                            display: {
                                xs: 'flex',
                                md: 'none'
                            },
                            marginLeft: 'auto'
                        }}
                    >
                        <IconButton
                            onClick={() => setMenuAbierto(true)}
                            sx={{
                                color: '#FFFFFF',
                                backgroundColor:
                                    'rgba(255, 255, 255, 0.12)',
                                '&:hover': {
                                    backgroundColor:
                                        'rgba(255, 255, 255, 0.2)'
                                }
                            }}
                            aria-label="Abrir menú"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Menú lateral móvil */}
            <Drawer
                anchor="right"
                open={menuAbierto}
                onClose={cerrarMenu}
            >
                <Box
                    sx={{
                        width: 270,
                        maxWidth: '80vw'
                    }}
                    role="presentation"
                >
                    {/* Encabezado del menú */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: 2,
                            py: 1.5,
                            borderBottom: '1px solid',
                            borderColor: 'divider'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            <LocalPharmacyIcon
                                sx={{
                                    color: '#00897B'
                                }}
                            />

                            <Typography
                                sx={{
                                    fontWeight: 700
                                }}
                            >
                                FarmaciApp
                            </Typography>
                        </Box>

                        <IconButton
                            onClick={cerrarMenu}
                            aria-label="Cerrar menú"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Opciones */}
                    <List sx={{ pt: 1 }}>
                        {menuItems.map((item) => {
                            const activo =
                                location.pathname === item.path;

                            return (
                                <ListItem
                                    key={item.path}
                                    disablePadding
                                >
                                    <ListItemButton
                                        component={Link}
                                        to={item.path}
                                        onClick={cerrarMenu}
                                        selected={activo}
                                        sx={{
                                            mx: 1,
                                            mb: 0.5,
                                            borderRadius: 2,
                                            '&.Mui-selected': {
                                                backgroundColor:
                                                    'rgba(0, 137, 123, 0.1)',
                                                color: '#00796B'
                                            },
                                            '&.Mui-selected:hover': {
                                                backgroundColor:
                                                    'rgba(0, 137, 123, 0.15)'
                                            }
                                        }}
                                    >
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                fontWeight: activo
                                                    ? 700
                                                    : 500
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            </Drawer>
        </>
    );
}