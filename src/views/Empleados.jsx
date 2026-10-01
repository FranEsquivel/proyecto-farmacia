import { useEffect, useState } from 'react';

import {
    getEmpleados,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
} from '../services/api';

import {
    Box,
    Typography,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    IconButton,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions

} from '@mui/material';

import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Empleados() {
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [formularioAbierto, setFormularioAbierto] = useState(false);

    const [empleadoEditando, setEmpleadoEditando] = useState(null);

    const [nuevoEmpleado, setNuevoEmpleado] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        email: '',
        cargo: ''
    });

    const [erroresFormulario, setErroresFormulario] = useState({});

    useEffect(() => {
        async function cargarEmpleados() {
            try {
                const data = await getEmpleados();

                if (Array.isArray(data)) {
                    setEmpleados(data);
                }
            } catch (error) {
                console.error('Error al cargar empleados:', error);
            } finally {
                setLoading(false);
            }
        }

        cargarEmpleados();
    }, []);

    // Filtrar empleados por nombre o apellido
    const empleadosFiltrados = empleados.filter((emp) => {
        const nombreCompleto =
            `${emp.nombre || ''} ${emp.apellido || ''}`.toLowerCase();

        return (
            nombreCompleto.includes(busqueda.toLowerCase()) ||
            emp.cargo?.toLowerCase().includes(busqueda.toLowerCase())
        );
    });

    const abrirFormulario = () => {
        setNuevoEmpleado({
            nombre: '',
            apellido: '',
            dni: '',
            email: '',
            cargo: ''
        });

        setErroresFormulario({});
        setEmpleadoEditando(null);
        setFormularioAbierto(true);
    };

    const cerrarFormulario = () => {
        setFormularioAbierto(false);

        setNuevoEmpleado({
            nombre: '',
            apellido: '',
            dni: '',
            email: '',
            cargo: ''
        });

        setErroresFormulario({});
        setEmpleadoEditando(null);
    };

    const handleCambioFormulario = (e) => {
        const { name, value } = e.target;

        setNuevoEmpleado({
            ...nuevoEmpleado,
            [name]: value
        });

        setErroresFormulario({
            ...erroresFormulario,
            [name]: ''
        });
    };

    const validarFormulario = () => {
        const errores = {};

        if (!nuevoEmpleado.nombre.trim()) {
            errores.nombre = 'El nombre es obligatorio.';
        }

        if (!nuevoEmpleado.apellido.trim()) {
            errores.apellido = 'El apellido es obligatorio.';
        }

        if (!nuevoEmpleado.dni.trim()) {
            errores.dni = 'El DNI es obligatorio.';
        }

        if (!nuevoEmpleado.email.trim()) {
            errores.email = 'El email es obligatorio.';
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                nuevoEmpleado.email
            )
        ) {
            errores.email = 'El email no es válido.';
        }

        if (!nuevoEmpleado.cargo.trim()) {
            errores.cargo = 'El cargo es obligatorio.';
        }

        setErroresFormulario(errores);

        return Object.keys(errores).length === 0;
    };

    const editarEmpleado = (empleado) => {
        setEmpleadoEditando(empleado);

        setNuevoEmpleado({
            nombre: empleado.nombre,
            apellido: empleado.apellido,
            dni: empleado.dni,
            email: empleado.email,
            cargo: empleado.cargo
        });

        setErroresFormulario({});
        setFormularioAbierto(true);
    };

    const guardarEmpleado = async () => {
        if (!validarFormulario()) {
            return;
        }

        const datosEmpleado = {
            nombre: nuevoEmpleado.nombre.trim(),
            apellido: nuevoEmpleado.apellido.trim(),
            dni: nuevoEmpleado.dni.trim(),
            email: nuevoEmpleado.email.trim(),
            cargo: nuevoEmpleado.cargo.trim()
        };

        try {
            if (empleadoEditando) {
                const resultado = await actualizarEmpleado(
                    empleadoEditando.id,
                    datosEmpleado
                );

                setEmpleados(
                    empleados.map((empleado) =>
                        empleado.id === empleadoEditando.id
                            ? resultado.empleado
                            : empleado
                    )
                );
            } else {
                const resultado = await crearEmpleado(datosEmpleado);

                setEmpleados([
                    ...empleados,
                    resultado.empleado
                ]);
            }

            cerrarFormulario();
        } catch (error) {
            console.error('Error al guardar empleado:', error);
        }
    };

    const borrarEmpleado = async (id) => {
        try {
            await eliminarEmpleado(id);

            setEmpleados(
                empleados.filter((empleado) => empleado.id !== id)
            );
        } catch (error) {
            console.error('Error al eliminar empleado:', error);
        }
    };

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
                }
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
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: {
                            xs: 'flex-start',
                            md: 'center'
                        },
                        flexDirection: {
                            xs: 'column',
                            md: 'row'
                        },
                        gap: 3,
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            width: 280,
                            height: 280,
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.08)',
                            top: -150,
                            right: -50
                        },
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: 180,
                            height: 180,
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.06)',
                            bottom: -100,
                            right: 180
                        }
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 1
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
                                <PeopleIcon sx={{ fontSize: 28 }} />
                            </Box>

                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 600,
                                    opacity: 0.9,
                                    letterSpacing: 0.4
                                }}
                            >
                                Gestión farmacéutica
                            </Typography>
                        </Box>

                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                mb: 1
                            }}
                        >
                            Empleados
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                opacity: 0.9,
                                maxWidth: 650,
                                lineHeight: 1.7
                            }}
                        >
                            Administrá el personal, roles y datos de
                            contacto de la farmacia.
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={abrirFormulario}
                        startIcon={<AddIcon />}
                        sx={{
                            position: 'relative',
                            zIndex: 1,
                            flexShrink: 0,
                            color: '#1565C0',
                            backgroundColor: '#FFFFFF',
                            px: 2.5,
                            py: 1.2,
                            borderRadius: 2,
                            boxShadow:
                                '0 6px 16px rgba(0, 0, 0, 0.16)',
                            '&:hover': {
                                backgroundColor: '#F4F9FD',
                                boxShadow:
                                    '0 8px 20px rgba(0, 0, 0, 0.2)'
                            }
                        }}
                    >
                        Nuevo empleado
                    </Button>
                </Box>

                {/* Barra de búsqueda */}
                <Paper
                    sx={{
                        p: 2,
                        mb: 3,
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        background: 'rgba(255, 255, 255, 0.55)',
                        boxShadow:
                            '0 2px 8px rgba(31, 41, 55, 0.04)'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            flexDirection: {
                                xs: 'column',
                                md: 'row'
                            }
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Buscar empleado por nombre, apellido o cargo..."
                            value={busqueda}
                            onChange={(e) =>
                                setBusqueda(e.target.value)
                            }

                            InputProps={{
                                startAdornment: (
                                    <SearchIcon
                                        sx={{
                                            color: 'primary.main',
                                            mr: 1
                                        }}
                                    />
                                )
                            }}
                        />
                    </Box>
                </Paper>

                {/* Tabla de datos */}
                <TableContainer
                    component={Paper}
                    sx={{
                        backgroundColor: '#FFFFFF',
                        position: 'relative',
                        zIndex: 2
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow
                                sx={{
                                    background:
                                        'linear-gradient(90deg, #EAF4FF 0%, #ECFAF7 100%)'
                                }}
                            >
                                <TableCell
                                    sx={{
                                        fontWeight: 700,
                                        color: '#1565C0',
                                        py: 2
                                    }}
                                >
                                    ID
                                </TableCell>

                                <TableCell
                                    sx={{
                                        fontWeight: 700,
                                        color: '#1565C0'
                                    }}
                                >
                                    Nombre y Apellido
                                </TableCell>

                                <TableCell
                                    sx={{
                                        fontWeight: 700,
                                        color: '#00897B'
                                    }}
                                >
                                    Puesto / Rol
                                </TableCell>

                                <TableCell
                                    sx={{
                                        fontWeight: 700,
                                        color: '#00897B'
                                    }}
                                >
                                    Contacto
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        fontWeight: 700,
                                        color: '#7E57C2'
                                    }}
                                >
                                    Acciones
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        align="center"
                                        sx={{ py: 6 }}
                                    >
                                        <CircularProgress color="primary" />

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 1 }}
                                        >
                                            Cargando empleados...
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : empleadosFiltrados.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        align="center"
                                        sx={{ py: 6 }}
                                    >
                                        <Typography color="text.secondary">
                                            No se encontraron empleados
                                            registrados.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                empleadosFiltrados.map((emp) => (
                                    <TableRow
                                        key={emp.id}
                                        sx={{
                                            transition:
                                                'background-color 0.2s ease',
                                            '&:hover': {
                                                backgroundColor: '#F5FAFC'
                                            },
                                            '&:last-child td': {
                                                borderBottom: 0
                                            }
                                        }}
                                    >
                                        <TableCell>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontFamily: 'monospace',
                                                    fontWeight: 600,
                                                    color: 'text.secondary'
                                                }}
                                            >
                                                #{emp.id}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontWeight: 700,
                                                    color: 'text.primary'
                                                }}
                                            >
                                                {emp.nombre} {emp.apellido}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Chip
                                                label={
                                                    emp.cargo || 'General'
                                                }
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                                sx={{
                                                    fontWeight: 600,
                                                    borderRadius: 2
                                                }}
                                            />
                                        </TableCell>

                                        <TableCell>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'text.secondary'
                                                }}
                                            >
                                                {emp.email || 'Sin contacto'}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center">
                                            <IconButton
                                                size="small"
                                                onClick={() => editarEmpleado(emp)}
                                                sx={{
                                                    color: '#1976D2',
                                                    backgroundColor: '#EEF7FF',
                                                    mr: 0.5,
                                                    '&:hover': {
                                                        backgroundColor:
                                                            '#DCEEFF'
                                                    }
                                                }}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>

                                            <IconButton
                                                size="small"
                                                onClick={() => borrarEmpleado(emp.id)}
                                                sx={{
                                                    color: '#D32F2F',
                                                    backgroundColor: '#FFF1F1',
                                                    '&:hover': {
                                                        backgroundColor:
                                                            '#FFE0E0'
                                                    }
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Dialog
                open={formularioAbierto}
                onClose={cerrarFormulario}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle
                    sx={{
                        fontWeight: 700
                    }}
                >
                    {empleadoEditando
                        ? 'Editar empleado'
                        : 'Nuevo empleado'}
                </DialogTitle>

                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            pt: 1
                        }}
                    >
                        <TextField
                            label="Nombre"
                            name="nombre"
                            value={nuevoEmpleado.nombre}
                            onChange={handleCambioFormulario}
                            error={Boolean(erroresFormulario.nombre)}
                            helperText={erroresFormulario.nombre}
                            fullWidth
                        />

                        <TextField
                            label="Apellido"
                            name="apellido"
                            value={nuevoEmpleado.apellido}
                            onChange={handleCambioFormulario}
                            error={Boolean(erroresFormulario.apellido)}
                            helperText={erroresFormulario.apellido}
                            fullWidth
                        />

                        <TextField
                            label="DNI"
                            name="dni"
                            value={nuevoEmpleado.dni}
                            onChange={handleCambioFormulario}
                            error={Boolean(erroresFormulario.dni)}
                            helperText={erroresFormulario.dni}
                            fullWidth
                        />

                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={nuevoEmpleado.email}
                            onChange={handleCambioFormulario}
                            error={Boolean(erroresFormulario.email)}
                            helperText={erroresFormulario.email}
                            fullWidth
                        />

                        <TextField
                            label="Cargo"
                            name="cargo"
                            value={nuevoEmpleado.cargo}
                            onChange={handleCambioFormulario}
                            error={Boolean(erroresFormulario.cargo)}
                            helperText={erroresFormulario.cargo}
                            fullWidth
                        />
                    </Box>
                </DialogContent>

                <DialogActions
                    sx={{
                        px: 3,
                        pb: 3
                    }}
                >
                    <Button
                        onClick={cerrarFormulario}
                        sx={{
                            color: 'text.secondary'
                        }}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        onClick={guardarEmpleado}
                        startIcon={<AddIcon />}
                    >
                        {empleadoEditando
                            ? 'Guardar cambios'
                            : 'Guardar empleado'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}