import { useEffect, useState } from 'react';

import { getMedicamentos, getCategorias, crearMedicamento, actualizarMedicamento, eliminarMedicamento } from '../services/api';

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
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';

import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Medicamentos() {

    const [medicamentos, setMedicamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [formularioAbierto, setFormularioAbierto] = useState(false);
    const [medicamentoEditando, setMedicamentoEditando] = useState(null);
    

    const [nuevoMedicamento, setNuevoMedicamento] = useState({
        nombre: '',
        precio: '',
        stock: '',
        categoria_id: '',
        fecha_vencimiento: ''
    });

    const [erroresFormulario, setErroresFormulario] = useState({});

    useEffect(() => {
        async function cargarDatos() {
            try {
                const [medicamentosData, categoriasData] = await Promise.all([
                    getMedicamentos(),
                    getCategorias()
                ]);

                if (Array.isArray(medicamentosData)) {
                    setMedicamentos(medicamentosData);
                }

                if (Array.isArray(categoriasData)) {
                    setCategorias(categoriasData);
                }
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setLoading(false);
            }
        }

        cargarDatos();
    }, []);

    // Filtrar medicamentos por nombre
    const medicamentosFiltrados = medicamentos.filter((med) =>
        med.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Validar un campo del formulario
    const validarCampo = (name, value) => {
        let error = '';

        if (name === 'nombre' && !value.trim()) {
            error = 'El nombre es obligatorio.';
        }

        if (name === 'precio') {
            if (value === '') {
                error = 'El precio es obligatorio.';
            } else if (Number(value) <= 0) {
                error = 'El precio debe ser mayor a 0.';
            }
        }

        if (name === 'stock') {
            if (value === '') {
                error = 'El stock es obligatorio.';
            } else if (Number(value) < 0) {
                error = 'El stock no puede ser negativo.';
            }
        }

        if (name === 'categoria_id' && !value) {
            error = 'La categoría es obligatoria.';
        }

        if (name === 'fecha_vencimiento') {
            if (!value) {
                error = 'La fecha es obligatoria.';
            } else if (Number.isNaN(new Date(value).getTime())) {
                error = 'La fecha no es válida.';
            }
        }

        return error;
    };

    // Actualizar los campos del formulario
    const handleCambioFormulario = (e) => {
        const { name, value } = e.target;

        setNuevoMedicamento({
            ...nuevoMedicamento,
            [name]: value
        });

        const error = validarCampo(name, value);

        setErroresFormulario({
            ...erroresFormulario,
            [name]: error
        });
    };

    // Validar todos los campos
    const validarFormulario = () => {
        const nuevosErrores = {};

        Object.keys(nuevoMedicamento).forEach((campo) => {
            const error = validarCampo(
                campo,
                nuevoMedicamento[campo]
            );

            if (error) {
                nuevosErrores[campo] = error;
            }
        });

        setErroresFormulario(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;
    };

    const editarMedicamento = (medicamento) => {
        setMedicamentoEditando(medicamento);

        setNuevoMedicamento({
            nombre: medicamento.nombre,
            precio: medicamento.precio,
            stock: medicamento.stock,
            categoria_id: medicamento.categoria_id,
            fecha_vencimiento: medicamento.fecha_vencimiento
        });

        setErroresFormulario({});
        setFormularioAbierto(true);
    };
    // Cerrar formulario y limpiar los campos
    const cerrarFormulario = () => {
        setFormularioAbierto(false);

        setNuevoMedicamento({
            nombre: '',
            precio: '',
            stock: '',
            categoria_id: '',
            fecha_vencimiento: ''
        });

        setErroresFormulario({});
        setMedicamentoEditando(null);
    };

    const guardarMedicamento = async () => {
        if (!validarFormulario()) {
            return;
        }

        try {
            const datosMedicamento = {
                nombre: nuevoMedicamento.nombre,
                precio: Number(nuevoMedicamento.precio),
                stock: Number(nuevoMedicamento.stock),
                categoria_id: Number(nuevoMedicamento.categoria_id),
                fecha_vencimiento: nuevoMedicamento.fecha_vencimiento
            };

            if (medicamentoEditando) {
                const resultado = await actualizarMedicamento(
                    medicamentoEditando.id,
                    datosMedicamento
                );

                setMedicamentos(
                    medicamentos.map((med) =>
                        med.id === medicamentoEditando.id
                            ? resultado.medicamento
                            : med
                    )
                );
            } else {
                const resultado = await crearMedicamento(datosMedicamento);

                setMedicamentos([
                    ...medicamentos,
                    resultado.medicamento
                ]);
            }

            cerrarFormulario();
            setMedicamentoEditando(null);
        } catch (error) {
            console.error('Error al guardar medicamento:', error);
        }
    };

    const borrarMedicamento = async (id) => {
        try {
            await eliminarMedicamento(id);

            setMedicamentos(
                medicamentos.filter((med) => med.id !== id)
            );
        } catch (error) {
            console.error('Error al eliminar medicamento:', error);
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

            {/* Contenedor principal de contenido */}
            <Box
                sx={{
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
                        alignItems: { xs: 'flex-start', md: 'center' },
                        flexDirection: { xs: 'column', md: 'row' },
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
                                <LocalPharmacyIcon
                                    sx={{ fontSize: 28 }}
                                />
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
                            Medicamentos
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                opacity: 0.9,
                                maxWidth: 500,
                                lineHeight: 1.7
                            }}
                        >
                            Gestioná el inventario de medicamentos
                            registrados en la farmacia.
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setFormularioAbierto(true)}
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
                        Nuevo medicamento
                    </Button>
                </Box>

                {/* Barra de búsqueda y filtro */}
                <Paper
                    sx={{
                        p: 2,
                        mb: 3,
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider',
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
                            placeholder="Buscar medicamento por nombre..."
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

                        <TextField
                            select
                            label="Categoría"
                            value={categoriaSeleccionada}
                            onChange={(e) =>
                                setCategoriaSeleccionada(
                                    e.target.value
                                )
                            }
                            sx={{
                                minWidth: {
                                    xs: '100%',
                                    md: 220
                                }
                            }}
                        >
                            <MenuItem value="">
                                Todas las categorías
                            </MenuItem>

                            {categorias.map((categoria) => (
                                <MenuItem
                                    key={categoria.id}
                                    value={categoria.id}
                                >
                                    {categoria.nombre}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </Paper>

                {/* Tabla de Datos */}
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
                                    Nombre
                                </TableCell>

                                <TableCell
                                    sx={{
                                        fontWeight: 700,
                                        color: '#1565C0'
                                    }}
                                >
                                    Precio
                                </TableCell>

                                <TableCell
                                    sx={{
                                        fontWeight: 700,
                                        color: '#00897B'
                                    }}
                                >
                                    Stock
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
                                        colSpan={6}
                                        align="center"
                                        sx={{ py: 6 }}
                                    >
                                        <CircularProgress color="primary" />

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 1 }}
                                        >
                                            Cargando inventario...
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : medicamentosFiltrados.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        align="center"
                                        sx={{ py: 6 }}
                                    >
                                        <Typography color="text.secondary">
                                            No se encontraron medicamentos
                                            registrados.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                medicamentosFiltrados.map((med) => (
                                    <TableRow
                                        key={med.id}
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
                                                #{med.id}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontWeight: 700,
                                                    color: 'text.primary'
                                                }}
                                            >
                                                {med.nombre}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontWeight: 700,
                                                    color: '#1565C0'
                                                }}
                                            >
                                                ${med.precio}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Chip
                                                label={`${med.stock} unidades`}
                                                size="small"
                                                color={
                                                    med.stock > 10
                                                        ? 'success'
                                                        : 'error'
                                                }
                                                sx={{
                                                    fontWeight: 600,
                                                    borderRadius: 2
                                                }}
                                            />
                                        </TableCell>

                                        <TableCell align="center">
                                            <IconButton
                                                size="small"
                                                onClick={() => editarMedicamento(med)}
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
                                                onClick={() => borrarMedicamento(med.id)}
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

                {/* Formulario de nuevo medicamento */}
                <Dialog
                    open={formularioAbierto}
                    onClose={cerrarFormulario}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle
                        sx={{
                            fontWeight: 700,
                            pb: 1
                        }}
                    >
                        {medicamentoEditando
                            ? 'Editar medicamento'
                            : 'Nuevo medicamento'}
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
                                value={nuevoMedicamento.nombre}
                                onChange={handleCambioFormulario}
                                error={Boolean(
                                    erroresFormulario.nombre
                                )}
                                helperText={
                                    erroresFormulario.nombre
                                }
                                fullWidth
                            />

                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    flexDirection: {
                                        xs: 'column',
                                        sm: 'row'
                                    }
                                }}
                            >
                                <TextField
                                    label="Precio"
                                    name="precio"
                                    type="number"
                                    value={nuevoMedicamento.precio}
                                    onChange={handleCambioFormulario}
                                    error={Boolean(
                                        erroresFormulario.precio
                                    )}
                                    helperText={
                                        erroresFormulario.precio
                                    }
                                    fullWidth
                                />

                                <TextField
                                    label="Stock"
                                    name="stock"
                                    type="number"
                                    value={nuevoMedicamento.stock}
                                    onChange={handleCambioFormulario}
                                    error={Boolean(
                                        erroresFormulario.stock
                                    )}
                                    helperText={
                                        erroresFormulario.stock
                                    }
                                    fullWidth
                                />
                            </Box>

                            <TextField
                                select
                                label="Categoría"
                                name="categoria_id"
                                value={
                                    nuevoMedicamento.categoria_id
                                }
                                onChange={handleCambioFormulario}
                                error={Boolean(
                                    erroresFormulario.categoria_id
                                )}
                                helperText={
                                    erroresFormulario.categoria_id
                                }
                                fullWidth
                            >
                                <MenuItem value="">
                                    Seleccionar categoría
                                </MenuItem>

                                {categorias.map((categoria) => (
                                    <MenuItem
                                        key={categoria.id}
                                        value={categoria.id}
                                    >
                                        {categoria.nombre}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                label="Fecha de vencimiento"
                                name="fecha_vencimiento"
                                type="date"
                                value={nuevoMedicamento.fecha_vencimiento}
                                onChange={handleCambioFormulario}
                                error={Boolean(
                                    erroresFormulario.fecha_vencimiento
                                )}
                                helperText={
                                    erroresFormulario.fecha_vencimiento
                                }
                                slotProps={{
                                    inputLabel: {
                                        shrink: true
                                    }
                                }}
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
                            onClick={guardarMedicamento}
                            startIcon={<AddIcon />}
                        >
                            {medicamentoEditando
                                ? 'Guardar cambios'
                                : 'Guardar medicamento'}
                        </Button>
                    </DialogActions>
                </Dialog>

            </Box>
        </Box>
    );
}