import { useEffect, useState } from 'react';

import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    Stack,
    Chip
} from '@mui/material';

import MedicationIcon from '@mui/icons-material/Medication';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Link } from 'react-router-dom';

import {
    getMedicamentos,
    getCategorias,
    getEmpleados
} from '../services/api';

export default function Dashboard() {
    const [medicamentos, setMedicamentos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        const cargarDatos = async () => {
            const medicamentosData = await getMedicamentos();
            const categoriasData = await getCategorias();
            const empleadosData = await getEmpleados();

            setMedicamentos(medicamentosData);
            setCategorias(categoriasData);
            setEmpleados(empleadosData);
        };

        cargarDatos();
    }, []);

    const tarjetas = [
        {
            titulo: 'Medicamentos',
            cantidad: medicamentos.length,
            icono: <MedicationIcon sx={{ fontSize: 30 }} />,
            color: '#1976D2',
            colorClaro: '#42A5F5',
            ruta: '/medicamentos',
            texto: 'Ver medicamentos'
        },
        {
            titulo: 'Categorías',
            cantidad: categorias.length,
            icono: <CategoryIcon sx={{ fontSize: 30 }} />,
            color: '#00897B',
            colorClaro: '#4DB6AC',
            ruta: '/categorias',
            texto: 'Ver categorías'
        },
        {
            titulo: 'Empleados',
            cantidad: empleados.length,
            icono: <PeopleIcon sx={{ fontSize: 30 }} />,
            color: '#673AB7',
            colorClaro: '#9575CD',
            ruta: '/empleados',
            texto: 'Ver empleados'
        }
    ];

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 72px)',
                position: 'relative',
                overflow: 'hidden',
                background:
                    'linear-gradient(135deg, #D8F3FF 0%, #E1FAF5 50%, #E9E0FA 100%)',
                px: { xs: 2, md: 5 },
                py: { xs: 3, md: 5 },

                '@keyframes mover1': {
                    '0%': {
                        transform: 'translate(0, 0) rotate(-15deg)'
                    },
                    '50%': {
                        transform: 'translate(80px, 50px) rotate(10deg)'
                    },
                    '100%': {
                        transform: 'translate(0, 0) rotate(-15deg)'
                    }
                },

                '@keyframes mover2': {
                    '0%': {
                        transform: 'translate(0, 0) rotate(20deg)'
                    },
                    '50%': {
                        transform: 'translate(-70px, 60px) rotate(-10deg)'
                    },
                    '100%': {
                        transform: 'translate(0, 0) rotate(20deg)'
                    }
                },

                '@keyframes mover3': {
                    '0%': {
                        transform: 'translate(0, 0) scale(1)'
                    },
                    '50%': {
                        transform: 'translate(60px, -50px) scale(1.08)'
                    },
                    '100%': {
                        transform: 'translate(0, 0) scale(1)'
                    }
                },

                '@keyframes cambiarColor1': {
                    '0%': {
                        backgroundColor: '#42A5F5'
                    },
                    '25%': {
                        backgroundColor: '#26A69A'
                    },
                    '50%': {
                        backgroundColor: '#00A896'
                    },
                    '75%': {
                        backgroundColor: '#7E57C2'
                    },
                    '100%': {
                        backgroundColor: '#42A5F5'
                    }
                },

                '@keyframes cambiarColor2': {
                    '0%': {
                        backgroundColor: '#26A69A'
                    },
                    '25%': {
                        backgroundColor: '#7E57C2'
                    },
                    '50%': {
                        backgroundColor: '#42A5F5'
                    },
                    '75%': {
                        backgroundColor: '#00A896'
                    },
                    '100%': {
                        backgroundColor: '#26A69A'
                    }
                },

                '@keyframes cambiarColor3': {
                    '0%': {
                        backgroundColor: '#7E57C2'
                    },
                    '25%': {
                        backgroundColor: '#00A896'
                    },
                    '50%': {
                        backgroundColor: '#42A5F5'
                    },
                    '75%': {
                        backgroundColor: '#26A69A'
                    },
                    '100%': {
                        backgroundColor: '#7E57C2'
                    }
                },

                '@keyframes cambiarColor4': {
                    '0%': {
                        backgroundColor: '#00A896'
                    },
                    '25%': {
                        backgroundColor: '#42A5F5'
                    },
                    '50%': {
                        backgroundColor: '#7E57C2'
                    },
                    '75%': {
                        backgroundColor: '#26A69A'
                    },
                    '100%': {
                        backgroundColor: '#00A896'
                    }
                },
                '@keyframes cambiarColor5': {
                    '0%': {
                        backgroundColor: '#29B6F6'
                    },
                    '25%': {
                        backgroundColor: '#7E57C2'
                    },
                    '50%': {
                        backgroundColor: '#26A69A'
                    },
                    '75%': {
                        backgroundColor: '#42A5F5'
                    },
                    '100%': {
                        backgroundColor: '#29B6F6'
                    }
                },
            }}
        >
            {/* Mancha azul superior izquierda */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 280,
                    height: 190,
                    borderRadius: '50%',
                    background: '#42A5F5',
                    opacity: 0.42,
                    filter: 'blur(8px)',
                    top: -60,
                    left: -70,
                    animation:
                        'mover1 7s ease-in-out infinite, cambiarColor1 16s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />

            {/* Mancha turquesa superior derecha */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 240,
                    height: 180,
                    borderRadius: '50%',
                    background: '#26A69A',
                    opacity: 0.38,
                    filter: 'blur(8px)',
                    top: 80,
                    right: -50,
                    animation:
                        'mover2 8s ease-in-out infinite, cambiarColor2 19s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />

            {/* Mancha violeta derecha */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 210,
                    height: 160,
                    borderRadius: '50%',
                    background: '#7E57C2',
                    opacity: 0.32,
                    filter: 'blur(8px)',
                    top: '35%',
                    right: '8%',
                    animation:
                        'mover3 6s ease-in-out infinite, cambiarColor3 14s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />

            {/* Mancha verde derecha */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 230,
                    height: 160,
                    borderRadius: '50%',
                    background: '#00A896',
                    opacity: 0.30,
                    filter: 'blur(8px)',
                    top: '48%',
                    right: '30%',
                    animation:
                        'mover2 7.5s ease-in-out infinite reverse, cambiarColor4 18s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />

            {/* Mancha azul inferior derecha */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 270,
                    height: 180,
                    borderRadius: '50%',
                    background: '#29B6F6',
                    opacity: 0.36,
                    filter: 'blur(8px)',
                    bottom: -60,
                    right: -60,
                    animation:
                        'mover1 6.5s ease-in-out infinite reverse, cambiarColor2 17s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />

            {/* Mancha violeta inferior derecha */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 200,
                    height: 150,
                    borderRadius: '50%',
                    background: '#9575CD',
                    opacity: 0.30,
                    filter: 'blur(8px)',
                    bottom: 50,
                    right: '30%',
                    animation:
                        'mover3 8s ease-in-out infinite reverse, cambiarColor1 20s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />

            {/* Mancha turquesa superior derecha */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 190,
                    height: 140,
                    borderRadius: '50%',
                    background: '#4DB6AC',
                    opacity: 0.28,
                    filter: 'blur(8px)',
                    top: '25%',
                    right: '5%',
                    animation:
                        'mover1 7.5s ease-in-out infinite, cambiarColor3 15s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />

            {/* Mancha azul central derecha */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 170,
                    height: 130,
                    borderRadius: '50%',
                    background: '#64B5F6',
                    opacity: 0.28,
                    filter: 'blur(8px)',
                    bottom: '18%',
                    right: '38%',
                    animation:
                        'mover2 6s ease-in-out infinite, cambiarColor4 18s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />

            {/* Burbuja celeste izquierda */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 180,
                    height: 130,
                    borderRadius: '50%',
                    background: '#29B6F6',
                    opacity: 0.27,
                    filter: 'blur(8px)',
                    top: '18%',
                    left: '8%',
                    animation:
                        'mover2 7s ease-in-out infinite, cambiarColor5 17s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />

            {/* Burbuja violeta izquierda */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 220,
                    height: 150,
                    borderRadius: '50%',
                    background: '#7E57C2',
                    opacity: 0.25,
                    filter: 'blur(8px)',
                    top: '55%',
                    left: '18%',
                    animation:
                        'mover1 8s ease-in-out infinite reverse, cambiarColor3 19s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />

            {/* Burbuja verde inferior izquierda */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 190,
                    height: 140,
                    borderRadius: '50%',
                    background: '#00A896',
                    opacity: 0.28,
                    filter: 'blur(8px)',
                    bottom: '8%',
                    left: '22%',
                    animation:
                        'mover3 6.5s ease-in-out infinite, cambiarColor4 16s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />
            {/* Burbuja pequeña central */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 145,
                    height: 110,
                    borderRadius: '50%',
                    background: '#42A5F5',
                    opacity: 0.20,
                    filter: 'blur(8px)',
                    top: '38%',
                    left: '47%',
                    animation:
                        'mover1 9s ease-in-out infinite, cambiarColor2 18s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />

            {/* Burbuja pequeña inferior central */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 135,
                    height: 105,
                    borderRadius: '50%',
                    background: '#7E57C2',
                    opacity: 0.18,
                    filter: 'blur(8px)',
                    bottom: '12%',
                    left: '50%',
                    animation:
                        'mover3 8s ease-in-out infinite reverse, cambiarColor1 20s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />

            {/* Contenido */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: 1400,
                    mx: 'auto'
                }}
            >
                {/* Encabezado */}
                <Box
                    sx={{
                        mb: 5,
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 5,
                        p: { xs: 3, md: 4.5 },
                        color: '#FFFFFF',
                        background:
                            'linear-gradient(135deg, #00897B 0%, #00796B 45%, #1565C0 100%)',
                        boxShadow:
                            '0 14px 32px rgba(25, 118, 210, 0.22)',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            width: 280,
                            height: 280,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.08)',
                            top: -150,
                            right: -50
                        },
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: 180,
                            height: 180,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.06)',
                            bottom: -100,
                            right: 180
                        }
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 1,
                            maxWidth: 700
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                mb: 2
                            }}
                        >
                            <Box
                                sx={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor:
                                        'rgba(255, 255, 255, 0.16)',
                                    border:
                                        '1px solid rgba(255, 255, 255, 0.22)'
                                }}
                            >
                                <LocalPharmacyIcon sx={{ fontSize: 28 }} />
                            </Box>

                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 600,
                                    color: 'rgba(255,255,255,0.9)'
                                }}
                            >
                                Gestión farmacéutica
                            </Typography>
                        </Box>

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
                                color: 'rgba(255,255,255,0.82)',
                                maxWidth: 650,
                                lineHeight: 1.7
                            }}
                        >
                            Resumen general de la gestión de medicamentos,
                            categorías y empleados de la farmacia.
                        </Typography>
                    </Box>
                </Box>

                {/* Tarjetas de estadísticas */}
                <Grid
                    container
                    spacing={3}
                    sx={{ mb: 5 }}
                >
                    {tarjetas.map((tarjeta) => (
                        <Grid
                            item
                            xs={12}
                            md={4}
                            key={tarjeta.titulo}
                        >
                            <Card
                                sx={{
                                    height: '100%',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}
                            >
                                <Box
                                    sx={{
                                        height: 5,
                                        background:
                                            `linear-gradient(90deg, ${tarjeta.color}, ${tarjeta.colorClaro})`
                                    }}
                                />

                                <CardContent sx={{ p: 3 }}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="flex-start"
                                    >
                                        <Box
                                            sx={{
                                                width: 52,
                                                height: 52,
                                                borderRadius: 3,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#FFFFFF',
                                                background:
                                                    `linear-gradient(135deg, ${tarjeta.color}, ${tarjeta.colorClaro})`,
                                                boxShadow:
                                                    `0 8px 18px ${tarjeta.color}30`
                                            }}
                                        >
                                            {tarjeta.icono}
                                        </Box>

                                        <Typography
                                            variant="h3"
                                            sx={{
                                                fontWeight: 700,
                                                color: tarjeta.color,
                                                lineHeight: 1
                                            }}
                                        >
                                            {tarjeta.cantidad}
                                        </Typography>
                                    </Stack>

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mt: 3,
                                            mb: 0.5,
                                            fontWeight: 700
                                        }}
                                    >
                                        {tarjeta.titulo}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            mb: 2
                                        }}
                                    >
                                        Registros disponibles
                                    </Typography>

                                    <Button
                                        component={Link}
                                        to={tarjeta.ruta}
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            color: tarjeta.color,
                                            px: 0,
                                            '&:hover': {
                                                backgroundColor:
                                                    'transparent',
                                                color: tarjeta.color
                                            }
                                        }}
                                    >
                                        {tarjeta.texto}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Acciones rápidas */}
                <Grid
                    container
                    spacing={3}
                    sx={{ mb: 5 }}
                >
                    <Grid item xs={12} md={8}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography
                                    variant="h6"
                                    sx={{ mb: 0.5 }}
                                >
                                    Acciones rápidas
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        mb: 3
                                    }}
                                >
                                    Accedé rápidamente a las principales
                                    funciones del sistema.
                                </Typography>

                                <Stack
                                    direction={{
                                        xs: 'column',
                                        sm: 'row'
                                    }}
                                    spacing={2}
                                >
                                    <Box
                                        sx={{
                                            flex: 1,
                                            p: 2,
                                            borderRadius: 3,
                                            background:
                                                'linear-gradient(135deg, #E8F3FF 0%, #F0FAF9 100%)',
                                            border: '1px solid #D6EAF4'
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 0.5
                                            }}
                                        >
                                            Medicamentos
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                mb: 2,
                                                minHeight: 40
                                            }}
                                        >
                                            Agregá un nuevo medicamento al sistema.
                                        </Typography>

                                        <Button
                                            component={Link}
                                            to="/medicamentos"
                                            variant="contained"
                                            startIcon={<AddIcon />}
                                            sx={{
                                                background:
                                                    'linear-gradient(135deg, #1976D2, #26A69A)',
                                                '&:hover': {
                                                    background:
                                                        'linear-gradient(135deg, #1565C0, #00897B)'
                                                }
                                            }}
                                        >
                                            Nuevo medicamento
                                        </Button>
                                    </Box>

                                    <Box
                                        sx={{
                                            flex: 1,
                                            p: 2,
                                            borderRadius: 3,
                                            background:
                                                'linear-gradient(135deg, #E8FAF7 0%, #F3F0FB 100%)',
                                            border: '1px solid #D6EAE5'
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 0.5
                                            }}
                                        >
                                            Categorías
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                mb: 2,
                                                minHeight: 40
                                            }}
                                        >
                                            Creá una nueva categoría para organizar.
                                        </Typography>

                                        <Button
                                            component={Link}
                                            to="/categorias"
                                            variant="contained"
                                            startIcon={<AddIcon />}
                                            sx={{
                                                background:
                                                    'linear-gradient(135deg, #00897B, #7E57C2)',
                                                '&:hover': {
                                                    background:
                                                        'linear-gradient(135deg, #00695C, #673AB7)'
                                                }
                                            }}
                                        >
                                            Nueva categoría
                                        </Button>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Estado del sistema */}
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                position: 'relative',
                                overflow: 'hidden',
                                background:
                                    'linear-gradient(135deg, #FFFFFF 0%, #F2FBF9 100%)'
                            }}
                        >

                            <CardContent
                                sx={{
                                    p: 3,
                                    position: 'relative',
                                    zIndex: 1
                                }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={1.5}
                                    alignItems="center"
                                    sx={{ mb: 2.5 }}
                                >
                                    <Box
                                        sx={{
                                            width: 42,
                                            height: 42,
                                            borderRadius: 2.5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background:
                                                'linear-gradient(135deg, #E0F7F4, #D9F3EF)',
                                            flexShrink: 0
                                        }}
                                    >
                                        <CheckCircleIcon
                                            sx={{
                                                color: '#00897B',
                                                fontSize: 27
                                            }}
                                        />
                                    </Box>

                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{ lineHeight: 1.2 }}
                                        >
                                            Estado del sistema
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: '#00897B',
                                                fontWeight: 600
                                            }}
                                        >
                                            Todo funcionando correctamente
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        mb: 2.5,
                                        lineHeight: 1.6
                                    }}
                                >
                                    La aplicación se encuentra conectada con
                                    los servicios disponibles.
                                </Typography>

                                <Box
                                    sx={{
                                        p: 1.5,
                                        mt: 3,
                                        borderRadius: 2.5,
                                        backgroundColor: '#EAF8F5',
                                        border: '1px solid #D5EEE9',
                                        transform: 'translateY(25px)'
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1.2
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    backgroundColor: '#00A896',
                                                    flexShrink: 0
                                                }}
                                            />

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: '#00695C'
                                                }}
                                            >
                                                API conectada
                                            </Typography>
                                        </Box>

                                        <Chip
                                            label="Online"
                                            size="small"
                                            sx={{
                                                height: 28,
                                                ml: 3,
                                                color: '#00695C',
                                                backgroundColor: '#D9F3EF',
                                                fontWeight: 700,
                                                '& .MuiChip-label': {
                                                    px: 1.2
                                                }
                                            }}
                                        />
                                    </Stack>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}