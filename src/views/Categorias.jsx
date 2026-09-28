import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getCategorias } from '../services/api';

export default function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Gestión de Categorías
            </Typography>

            <Paper sx={{ width: '100%', mt: 3, boxShadow: 3 }}>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Nombre de Categoría</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">Cargando categorías...</TableCell>
                                </TableRow>
                            ) : categorias.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">No hay categorías registradas o el backend no está conectado.</TableCell>
                                </TableRow>
                            ) : (
                                categorias.map((cat) => (
                                    <TableRow key={cat.id}>
                                        <TableCell>{cat.id}</TableCell>
                                        <TableCell>{cat.nombre}</TableCell>
                                        <TableCell>{cat.descripcion}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}