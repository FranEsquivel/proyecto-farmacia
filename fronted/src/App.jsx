import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Importación de tus vistas y componentes
import Navbar from './components/Navbar'; // (Ajusta la ruta de tu Navbar si es diferente)
import Dashboard from './views/Dashboard';
import Medicamentos from './views/Medicamentos';
import Categorias from './views/Categorias';
import Empleados from './views/Empleados';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normaliza estilos y aplica el fondo general del tema */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/medicamentos" element={<Medicamentos />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/empleados" element={<Empleados />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;