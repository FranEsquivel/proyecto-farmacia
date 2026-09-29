import { useEffect, useState } from 'react';
import { getMedicamentos, getCategorias, getEmpleados } from '../services/api';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Button,
    Chip,
    Stack
} from '@mui/material';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AddIcon from '@mui/icons-material/Add';

function Dashboard() {
    const [stats, setStats] = useState({
        meds: 0,
        cats: 0,
        emps: 0
    });

    const [loading, setLoading] = useState(true);
    const [backendStatus, setBackendStatus] = useState(false);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [medicamentos, categorias, empleados] = await Promise.all([
                    getMedicamentos(),
                    getCategorias(),
                    getEmpleados()
                ]);

                setStats({
                    meds: medicamentos.length,
                    cats: categorias.length,
                    emps: empleados.length
                });

                setBackendStatus(true);
            } catch (error) {
                console.error('Error al cargar datos:', error);
                setBackendStatus(false);
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: 'calc(100vh - 68px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <CircularProgress color="primary" />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 68px)',
                px: { xs: 2, md: 5 },
                py: { xs: 3, md: 5 },
                maxWidth: 1400,
                mx: 'auto'
            }}
        >
            {/* Encabezado */}
            <Box
                sx={{
                    mb: 5,
                    p: { xs: 3, md: 4 },
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #1976D2 0%, #26A69A 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 10px 30px rgba(25, 118, 210, 0.18)'
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 1
                    }}
                >
                    Dashboard
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        opacity: 0.9
                    }}
                >
                    Resumen general de la gestión de la farmacia.
                </Typography>
            </Box>

            {/* Estadísticas */}
            <Grid container spacing={3}>
                {/* Medicamentos */}
                <Grid item xs={12} md={4}>
                    <Card
                        sx={{
                            height: '100%',
                            background: 'linear-gradient(145deg, #FFFFFF 0%, #F1F8FF 100%)',
                            overflow: 'hidden',
                            position: 'relative'
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: 5,
                                background: 'linear-gradient(90deg, #1976D2, #42A5F5)'
                            }}
                        />

                        <CardContent sx={{ p: 3 }}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="flex-start"
                            >
                                <Box>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 1 }}
                                    >
                                        Medicamentos
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        color="primary.dark"
                                        sx={{ fontWeight: 700 }}
                                    >
                                        {stats.meds}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        Registrados en el sistema
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: 58,
                                        height: 58,
                                        borderRadius: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'linear-gradient(135deg, #1976D2, #42A5F5)',
                                        color: '#FFFFFF',
                                        boxShadow: '0 6px 15px rgba(25, 118, 210, 0.25)'
                                    }}
                                >
                                    <LocalPharmacyIcon sx={{ fontSize: 30 }} />
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Categorías */}
                <Grid item xs={12} md={4}>
                    <Card
                        sx={{
                            height: '100%',
                            background: 'linear-gradient(145deg, #FFFFFF 0%, #F0FAF8 100%)',
                            overflow: 'hidden',
                            position: 'relative'
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: 5,
                                background: 'linear-gradient(90deg, #00A896, #26A69A)'
                            }}
                        />

                        <CardContent sx={{ p: 3 }}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="flex-start"
                            >
                                <Box>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 1 }}
                                    >
                                        Categorías
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        color="success.dark"
                                        sx={{ fontWeight: 700 }}
                                    >
                                        {stats.cats}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        Categorías disponibles
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: 58,
                                        height: 58,
                                        borderRadius: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'linear-gradient(135deg, #00A896, #26A69A)',
                                        color: '#FFFFFF',
                                        boxShadow: '0 6px 15px rgba(0, 168, 150, 0.25)'
                                    }}
                                >
                                    <CategoryIcon sx={{ fontSize: 30 }} />
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Empleados */}
                <Grid item xs={12} md={4}>
                    <Card
                        sx={{
                            height: '100%',
                            background: 'linear-gradient(145deg, #FFFFFF 0%, #F7F4FC 100%)',
                            overflow: 'hidden',
                            position: 'relative'
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: 5,
                                background: 'linear-gradient(90deg, #7E57C2, #9575CD)'
                            }}
                        />

                        <CardContent sx={{ p: 3 }}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="flex-start"
                            >
                                <Box>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 1 }}
                                    >
                                        Empleados
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        color="info.dark"
                                        sx={{ fontWeight: 700 }}
                                    >
                                        {stats.emps}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        Personal registrado
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: 58,
                                        height: 58,
                                        borderRadius: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'linear-gradient(135deg, #7E57C2, #9575CD)',
                                        color: '#FFFFFF',
                                        boxShadow: '0 6px 15px rgba(126, 87, 194, 0.25)'
                                    }}
                                >
                                    <PeopleIcon sx={{ fontSize: 30 }} />
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Acciones rápidas */}
            <Box sx={{ mt: 5 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        mb: 2.5
                    }}
                >
                    Acciones rápidas
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{
                                justifyContent: 'flex-start',
                                py: 2,
                                px: 3,
                                color: '#FFFFFF',
                                background: 'linear-gradient(135deg, #1976D2, #26A69A)',
                                boxShadow: '0 6px 15px rgba(25, 118, 210, 0.2)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #1565C0, #00897B)',
                                    boxShadow: '0 8px 18px rgba(25, 118, 210, 0.25)'
                                }
                            }}
                        >
                            Nuevo medicamento
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{
                                justifyContent: 'flex-start',
                                py: 2,
                                px: 3,
                                color: '#FFFFFF',
                                background: 'linear-gradient(135deg, #1976D2, #26A69A)',
                                boxShadow: '0 6px 15px rgba(25, 118, 210, 0.2)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #1565C0, #00897B)',
                                    boxShadow: '0 8px 18px rgba(25, 118, 210, 0.25)'
                                }
                            }}
                        >
                            Nueva categoría
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Estado del sistema */}
            <Box sx={{ mt: 5 }}>
                <Card
                    sx={{
                        background: 'linear-gradient(135deg, #F0FAF8 0%, #FFFFFF 100%)'
                    }}
                >
                    <CardContent sx={{ p: 3 }}>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="space-between"
                            alignItems={{ xs: 'flex-start', sm: 'center' }}
                            spacing={2}
                        >
                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 700 }}
                                >
                                    Estado del sistema
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 0.5 }}
                                >
                                    Estado de conexión con la API del sistema.
                                </Typography>
                            </Box>

                            <Chip
                                icon={
                                    backendStatus
                                        ? <CheckCircleIcon />
                                        : <WarningAmberIcon />
                                }
                                label={
                                    backendStatus
                                        ? 'API conectada'
                                        : 'API desconectada'
                                }
                                color={backendStatus ? 'success' : 'warning'}
                                sx={{
                                    fontWeight: 600,
                                    px: 1
                                }}
                            />
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default Dashboard;