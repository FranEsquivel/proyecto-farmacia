
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Farmacia App
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Dashboard
                </Button>
                <Button color="inherit" component={Link} to="/medicamentos">
                    Medicamentos
                </Button>
                <Button color="inherit" component={Link} to="/categorias">
                    Categorías
                </Button>
                <Button color="inherit" component={Link} to="/empleados">
                    Empleados
                </Button>
            </Toolbar>
        </AppBar>
    );
}