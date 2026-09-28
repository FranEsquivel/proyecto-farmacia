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
                backgroundColor: '#FFFFFF',
                color: 'text.primary',
                borderBottom: '1px solid',
                borderColor: 'divider'
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
                {/* Logo */}
                <Box
                    component={Link}
                    to="/"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.2,
                        textDecoration: 'none',
                        color: 'text.primary',
                        mr: { xs: 2, md: 5 }
                    }}
                >
                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 2.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, #1976D2, #26A69A)',
                            color: '#FFFFFF',
                            boxShadow: '0 5px 12px rgba(25, 118, 210, 0.2)'
                        }}
                    >
                        <LocalPharmacyIcon sx={{ fontSize: 25 }} />
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
                                color: 'text.secondary',
                                display: { xs: 'none', sm: 'block' }
                            }}
                        >
                            Gestión farmacéutica
                        </Typography>
                    </Box>
                </Box>

                {/* Navegación */}
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
                                    position: 'relative',
                                    height: 44,
                                    px: { xs: 1.5, md: 2 },
                                    borderRadius: 2,
                                    color: activo
                                        ? '#1565C0'
                                        : 'text.secondary',
                                    fontWeight: activo ? 700 : 500,
                                    backgroundColor: activo
                                        ? '#EEF7FF'
                                        : 'transparent',
                                    '&:hover': {
                                        backgroundColor: activo
                                            ? '#E3F2FD'
                                            : '#F5F9FC',
                                        color: '#1565C0'
                                    },
                                    '&::after': activo
                                        ? {
                                            content: '""',
                                            position: 'absolute',
                                            left: 12,
                                            right: 12,
                                            bottom: 3,
                                            height: 3,
                                            borderRadius: 5,
                                            background: 'linear-gradient(90deg, #1976D2, #26A69A)'
                                        }
                                        : {}
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
