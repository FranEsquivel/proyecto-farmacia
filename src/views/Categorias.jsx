import { useEffect, useState } from 'react';
import { getCategorias } from '../services/api';
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputAdornment
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');

    const [dialogoAbierto, setDialogoAbierto] = useState(false);

    const [nuevaCategoria, setNuevaCategoria] = useState({
        nombre: '',
        descripcion: ''
    });

    const [errorNombre, setErrorNombre] = useState('');

    useEffect(() => {
        async function cargarCategorias() {
            try {
                const data = await getCategorias();

                if (Array.isArray(data)) {
                    setCategorias(data);
                }
            } catch (error) {
                console.error('Error al cargar categorías:', error);
            } finally {
                setLoading(false);
            }
        }

        cargarCategorias();
    }, []);

    const categoriasFiltradas = categorias.filter((cat) =>
        cat.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );

    const abrirDialogo = () => {
        setNuevaCategoria({
            nombre: '',
            descripcion: ''
        });
        setErrorNombre('');
        setDialogoAbierto(true);
    };

    const cerrarDialogo = () => {
        setDialogoAbierto(false);
    };

    const handleCambioCategoria = (e) => {
        const { name, value } = e.target;

        setNuevaCategoria((anterior) => ({
            ...anterior,
            [name]: value
        }));

        if (name === 'nombre') {
            setErrorNombre('');
        }
    };

    const guardarCategoria = () => {
        if (!nuevaCategoria.nombre.trim()) {
            setErrorNombre('El nombre es obligatorio.');
            return;
        }

        const categoriaDuplicada = categorias.some(
            (categoria) =>
                categoria.nombre?.trim().toLowerCase() ===
                nuevaCategoria.nombre.trim().toLowerCase()
        );

        if (categoriaDuplicada) {
            setErrorNombre('Ya existe una categoría con ese nombre.');
            return;
        }

        console.log('Categoría validada:', nuevaCategoria);
        cerrarDialogo();
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: 'background.default',
                p: { xs: 3, md: 5 }
            }}
        >
            <Box
                sx={{
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
                                gap: 1.5,
                                mb: 0.5
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
                                    background:
                                        'linear-gradient(135deg, #26A69A, #00A896)',
                                    color: '#FFFFFF',
                                    boxShadow:
                                        '0 6px 14px rgba(0, 168, 150, 0.18)'
                                }}
                            >
                                <CategoryIcon sx={{ fontSize: 27 }} />
                            </Box>

                            <Box>
                                <Typography
                                    variant="h4"
                                    component="h1"
                                    sx={{
                                        fontWeight: 700,
                                        lineHeight: 1.15
                                    }}
                                >
                                    Gestión de Categorías
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        mt: 0.4
                                    }}
                                >
                                    Organiza las categorías de los medicamentos.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={abrirDialogo}
                        sx={{
                            background:
                                'linear-gradient(135deg, #1976D2, #26A69A)',
                            boxShadow:
                                '0 6px 14px rgba(25, 118, 210, 0.18)',
                            '&:hover': {
                                background:
                                    'linear-gradient(135deg, #1565C0, #00897B)',
                                boxShadow:
                                    '0 8px 18px rgba(25, 118, 210, 0.24)'
                            }
                        }}
                    >
                        Nueva Categoría
                    </Button>
                </Box>

                {/* Búsqueda */}
                <Paper
                    sx={{
                        p: 2,
                        mb: 3,
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="Buscar categorías por nombre..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            )
                        }}
                    />
                </Paper>

                {/* Tabla */}
                <TableContainer
                    component={Paper}
                    sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        overflow: 'hidden'
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell align="center">
                                    Acciones
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        align="center"
                                        sx={{ py: 7 }}
                                    >
                                        <CircularProgress
                                            size={34}
                                            color="primary"
                                        />

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                mt: 1.5
                                            }}
                                        >
                                            Cargando categorías...
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : categoriasFiltradas.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        align="center"
                                        sx={{ py: 7 }}
                                    >
                                        <CategoryIcon
                                            sx={{
                                                fontSize: 42,
                                                color: 'text.disabled',
                                                mb: 1
                                            }}
                                        />

                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: 600,
                                                color: 'text.primary'
                                            }}
                                        >
                                            No se encontraron categorías
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                mt: 0.5
                                            }}
                                        >
                                            {busqueda
                                                ? 'Probá con otro término de búsqueda.'
                                                : 'Todavía no hay categorías disponibles.'}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                categoriasFiltradas.map((cat) => (
                                    <TableRow
                                        key={cat.id}
                                        hover
                                    >
                                        <TableCell
                                            sx={{
                                                color: 'text.secondary',
                                                fontFamily: 'monospace'
                                            }}
                                        >
                                            #{cat.id}
                                        </TableCell>

                                        <TableCell>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1.2
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 34,
                                                        height: 34,
                                                        borderRadius: 2,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        backgroundColor: '#E8F8F5',
                                                        color: '#00897B'
                                                    }}
                                                >
                                                    <CategoryIcon
                                                        sx={{ fontSize: 19 }}
                                                    />
                                                </Box>

                                                <Typography
                                                    sx={{
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {cat.nombre}
                                                </Typography>
                                            </Box>
                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                color: 'text.secondary'
                                            }}
                                        >
                                            {cat.descripcion ||
                                                'Sin descripción'}
                                        </TableCell>

                                        <TableCell align="center">
                                            <IconButton
                                                size="small"
                                                color="primary"
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>

                                            <IconButton
                                                size="small"
                                                color="error"
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

            {/* Dialog */}
            <Dialog
                open={dialogoAbierto}
                onClose={cerrarDialogo}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle
                    sx={{
                        fontWeight: 700
                    }}
                >
                    Nueva Categoría
                </DialogTitle>

                <DialogContent>
                    <TextField
                        fullWidth
                        label="Nombre"
                        name="nombre"
                        value={nuevaCategoria.nombre}
                        onChange={handleCambioCategoria}
                        error={Boolean(errorNombre)}
                        helperText={errorNombre}
                        margin="normal"
                        autoFocus
                    />

                    <TextField
                        fullWidth
                        label="Descripción"
                        name="descripcion"
                        value={nuevaCategoria.descripcion}
                        onChange={handleCambioCategoria}
                        multiline
                        rows={3}
                        margin="normal"
                    />
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        onClick={cerrarDialogo}
                        color="inherit"
                    >
                        Cancelar
                    </Button>

                    <Button
                        onClick={guardarCategoria}
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(135deg, #1976D2, #26A69A)',
                            boxShadow: '0 5px 12px rgba(25, 118, 210, 0.18)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #1565C0, #00897B)',
                                boxShadow: '0 7px 16px rgba(25, 118, 210, 0.24)'
                            }
                        }}
                    >
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}