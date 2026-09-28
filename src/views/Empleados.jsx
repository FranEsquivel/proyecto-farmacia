import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getEmpleados } from '../services/api';

export default function Empleados() {
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function cargarEmpleados() {
            try {
                const data = await getEmpleados();
                if (Array.isArray(data)) {
                    setEmpleados(data);
                }
            } catch (error) {
                console.error("Error al cargar empleados:", error);
            } finally {
                setLoading(false);
            }
        }

        cargarEmpleados();
    }, []);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Gestión de Empleados
            </Typography>

            <Paper sx={{ width: '100%', mt: 3, boxShadow: 3 }}>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Cargo / Rol</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Correo Electrónico</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">Cargando empleados...</TableCell>
                                </TableRow>
                            ) : empleados.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">No hay empleados registrados o el backend no está conectado.</TableCell>
                                </TableRow>
                            ) : (
                                empleados.map((emp) => (
                                    <TableRow key={emp.id}>
                                        <TableCell>{emp.id}</TableCell>
                                        <TableCell>{emp.nombre}</TableCell>
                                        <TableCell>{emp.cargo}</TableCell>
                                        <TableCell>{emp.email}</TableCell>
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