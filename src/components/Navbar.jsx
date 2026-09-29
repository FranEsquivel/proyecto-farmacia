import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';

export default function Navbar() {
    const location = useLocation();

    const menuItems = [
        { label: 'Dashboard', path: '/' },
        { label: 'Medicamentos', path: '/medicamentos' },
        { label: 'Categorías', path: '/categorias' },
        { label: 'Empleados', path: '/empleados' }
    ];

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                background: 'linear-gradient(135deg, #00897B 0%, #00796B 45%, #1565C0 100%)',
                color: '#FFFFFF',
                boxShadow: '0 4px 16px rgba(25, 118, 210, 0.22)'
            }}
        >
            <Toolbar
                sx={{
                    minHeight: 72,
                    px: { xs: 2, md: 5 },
                    maxWidth: 1400,
                    width: '100%',
                    mx: 'auto'
                }}
            >
                {/* Logo y nombre */}
                <Box
                    component={Link}
                    to="/"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.2,
                        textDecoration: 'none',
                        color: '#FFFFFF',
                        mr: { xs: 2, md: 5 }
                    }}
                >
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.16)',
                            border: '1px solid rgba(255, 255, 255, 0.22)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)'
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
                            Farmacia App
                        </Typography>

                        <Typography
                            variant="caption"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.78)',
                                display: { xs: 'none', sm: 'block' }
                            }}
                        >
                            Gestión farmacéutica
                        </Typography>
                    </Box>
                </Box>

                {/* Menú */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        height: '100%'
                    }}
                >
                    {menuItems.map((item) => {
                        const activo = location.pathname === item.path;

                        return (
                            <Button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                sx={{
                                    height: 44,
                                    minWidth: 'auto',
                                    px: { xs: 1.5, md: 2 },
                                    borderRadius: 2,
                                    border: '1px solid transparent',
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
            </Toolbar>
        </AppBar>
    );
}
