import { BrowserRouter, Routes, Route } from 'react-router-dom'
// providers
import { AuthProvider } from './context/AuthProvider' // desctrucuramos el AuthProvider
import {ProyectosProvider} from './context/ProyectosProvider'

// components
import AuthLayout from './layouts/AuthLayout'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import NuevoPassword from './pages/NuevoPassword'
import OlvidePassword from './pages/OlvidePassword'
import Registrar from './pages/Registrar'
import Proyectos from './pages/Proyectos'
import RutaProtegida from './layouts/RutaProtegida'
import NuevoProyecto from './pages/NuevoProyecto'
import Proyecto from './pages/Proyecto'
import EditarProyecto from './pages/EditarProyecto'
import NuevoColaborador from './pages/NuevoColaborador'



function App() {

  return (
    
    <BrowserRouter>
    
      <AuthProvider>
        <ProyectosProvider>
            <Routes>
              <Route path='/' element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path='registrar' element={<Registrar />} />
                <Route path='olvide-password' element={<OlvidePassword />} />
                <Route path='nuevo-password/:token' element={<NuevoPassword />} />
                <Route path='confirmar-cuenta/:id' element={<ConfirmarCuenta />} />
                <Route path=':error' element={<NotFound />} />
                {/* Hack:  colocamos como parametro :error // caquier palabra  que no coincida con la ruta de las paginas */}
              </Route>
              <Route path='/proyectos' element={<RutaProtegida />}>
                <Route index element={<Proyectos />} />
                <Route path='crear-proyecto' element={<NuevoProyecto />} />
                <Route path='nuevo-colaborador/:id' element={<NuevoColaborador />} />
                <Route path=':id' element={<Proyecto />} />
                <Route path='editar/:id' element={<EditarProyecto />} />
              </Route>
            </Routes>
            <Routes>
              {/* otras rutas */}
            </Routes>
        </ProyectosProvider>

      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
