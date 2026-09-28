import { useEffect, useState } from 'react';

import { getMedicamentos, getCategorias } from '../services/api';

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
    const [busqueda, setBusqueda] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

    const [formularioAbierto, setFormularioAbierto] = useState(false);

    const [nuevoMedicamento, setNuevoMedicamento] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria_id: ''
    });

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

    // Actualizar los campos del formulario
    const handleCambioFormulario = (e) => {
        const { name, value } = e.target;

        setNuevoMedicamento({
            ...nuevoMedicamento,
            [name]: value
        });
    };

    // Cerrar formulario y limpiar los campos
    const cerrarFormulario = () => {
        setFormularioAbierto(false);

        setNuevoMedicamento({
            nombre: '',
            descripcion: '',
            precio: '',
            stock: '',
            categoria_id: ''
        });
    };

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 72px)',
                px: { xs: 2, md: 5 },
                py: { xs: 3, md: 5 },
                maxWidth: 1400,
                mx: 'auto'
            }}
        >
            {/* Encabezado */}
            <Box
                sx={{
                    mb: 4,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', md: 'center' },
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2
                }}
            >
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5
                        }}
                    >
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'linear-gradient(135deg, #1976D2, #26A69A)',
                                color: '#FFFFFF',
                                boxShadow: '0 5px 12px rgba(25, 118, 210, 0.2)'
                            }}
                        >
                            <LocalPharmacyIcon sx={{ fontSize: 27 }} />
                        </Box>

                        <Box>
                            <Typography
                                variant="h4"
                                component="h1"
                                sx={{
                                    fontWeight: 700,
                                    color: 'text.primary',
                                    lineHeight: 1.2
                                }}
                            >
                                Medicamentos
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    mt: 0.3
                                }}
                            >
                                Gestión del inventario farmacéutico
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setFormularioAbierto(true)}
                    sx={{
                        borderRadius: 2,
                        px: 2.5,
                        py: 1.2,
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
            </Box>

            {/* Barra de búsqueda y filtro */}
            <Paper
                sx={{
                    p: 2,
                    mb: 3,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: '0 2px 8px rgba(31, 41, 55, 0.04)'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        flexDirection: { xs: 'column', md: 'row' }
                    }}
                >
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Buscar medicamento por nombre..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
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
                            setCategoriaSeleccionada(e.target.value)
                        }
                        sx={{
                            minWidth: { xs: '100%', md: 220 }
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
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: '0 4px 14px rgba(31, 41, 55, 0.06)',
                    overflow: 'hidden'
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow
                            sx={{
                                background: 'linear-gradient(90deg, #EAF4FF 0%, #ECFAF7 100%)'
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
                                    color: '#00897B'
                                }}
                            >
                                Descripción
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
                                        No se encontraron medicamentos registrados.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            medicamentosFiltrados.map((med) => (
                                <TableRow
                                    key={med.id}
                                    sx={{
                                        transition: 'background-color 0.2s ease',
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
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                maxWidth: 300
                                            }}
                                        >
                                            {med.descripcion}
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
                                            sx={{
                                                color: '#1976D2',
                                                backgroundColor: '#EEF7FF',
                                                mr: 0.5,
                                                '&:hover': {
                                                    backgroundColor: '#DCEEFF'
                                                }
                                            }}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>

                                        <IconButton
                                            size="small"
                                            sx={{
                                                color: '#D32F2F',
                                                backgroundColor: '#FFF1F1',
                                                '&:hover': {
                                                    backgroundColor: '#FFE0E0'
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
                    Nuevo medicamento
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
                            fullWidth
                        />

                        <TextField
                            label="Descripción"
                            name="descripcion"
                            value={nuevoMedicamento.descripcion}
                            onChange={handleCambioFormulario}
                            multiline
                            rows={3}
                            fullWidth
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                flexDirection: { xs: 'column', sm: 'row' }
                            }}
                        >
                            <TextField
                                label="Precio"
                                name="precio"
                                type="number"
                                value={nuevoMedicamento.precio}
                                onChange={handleCambioFormulario}
                                fullWidth
                            />

                            <TextField
                                label="Stock"
                                name="stock"
                                type="number"
                                value={nuevoMedicamento.stock}
                                onChange={handleCambioFormulario}
                                fullWidth
                            />
                        </Box>

                        <TextField
                            select
                            label="Categoría"
                            name="categoria_id"
                            value={nuevoMedicamento.categoria_id}
                            onChange={handleCambioFormulario}
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
                        disabled
                        startIcon={<AddIcon />}
                    >
                        Guardar medicamento
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}