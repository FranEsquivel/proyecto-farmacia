import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './views/Dashboard';
import Medicamentos from './views/Medicamentos';
import Categorias from './views/Categorias';
import Empleados from './views/Empleados';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/medicamentos" element={<Medicamentos />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/empleados" element={<Empleados />} />
      </Routes>
    </Router>
  );
}

export default App;