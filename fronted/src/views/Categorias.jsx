import { useEffect, useState } from 'react';
import { getCategorias } from '../services/api';
import {
    Box, Typography, Button, TextField, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper,
    CircularProgress, IconButton
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

    useEffect(() => {
        async function cargarCategorias() {
            try {
                const data = await getCategorias();
                if (Array.isArray(data)) {
                    setCategorias(data);
                }
            } catch (error) {
                console.error("Error al cargar categorías:", error);
            } finally {
                setLoading(false);
            }
        }
        cargarCategorias();
    }, []);

    // Filtrar categorías en tiempo real por nombre
    const categoriasFiltradas = categorias.filter((cat) =>
        cat.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <Box sx={{ p: { xs: 3, md: 5 }, backgroundColor: '#f1f5f9', minHeight: '100vh' }}>

            {/* Encabezado de la vista */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                <Box>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <CategoryIcon color="primary" sx={{ fontSize: 38 }} />
                        Gestión de Categorías
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748b', mt: 0.5 }}>
                        Organiza las clasificaciones y tipos de productos farmacéuticos.
                    </Typography>
                </Box>

                {/* Botón Nueva Categoría */}
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 600, px: 3, py: 1.2 }}
                >
                    Nueva Categoría
                </Button>
            </Box>

            {/* Barra de Búsqueda */}
            <Paper sx={{ p: 2, mb: 4, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <SearchIcon color="action" />
                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Buscar categorías por nombre..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    InputProps={{ disableUnderline: true }}
                />
            </Paper>

            {/* Tabla de Datos */}
            <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700, color: '#475569' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Nombre de Categoría</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Descripción</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700, color: '#475569' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                                    <CircularProgress size={35} />
                                    <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>Cargando categorías...</Typography>
                                </TableCell>
                            </TableRow>
                        ) : categoriasFiltradas.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 6, color: '#64748b' }}>
                                    No se encontraron categorías registradas o el backend no está conectado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            categoriasFiltradas.map((cat) => (
                                <TableRow key={cat.id} sx={{ '&:hover': { backgroundColor: '#f8fafc' } }}>
                                    <TableCell sx={{ fontFamily: 'monospace', color: '#64748b' }}>#{cat.id}</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: '#0f172a' }}>{cat.nombre}</TableCell>
                                    <TableCell sx={{ color: '#475569' }}>{cat.descripcion || 'Sin descripción'}</TableCell>
                                    <TableCell align="center">
                                        <IconButton size="small" color="primary">
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" color="error">
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
    );
}