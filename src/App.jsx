import { BrowserRouter, Routes, Route } from 'react-router-dom'

// components
import AuthLayout from './layouts/AuthLayout'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import NuevoPassword from './pages/NuevoPassword'
import OlvidePassword from './pages/OlvidePassword'
import Registrar from './pages/Registrar'

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={ <Login /> } />
          <Route path='registrar' element={ <Registrar /> } />
          <Route path='olvide-password' element={ <OlvidePassword /> } />
          <Route path='nuevo-password/:token' element={ <NuevoPassword /> } />
          <Route path='confirmar-cuenta/:id' element={ <ConfirmarCuenta />} />  
          <Route path=':error' element={ <NotFound />} />  
          {/* Hack:  colocamos como parametro :error // caquier palabra  que no coincida con la ruta de las paginas */}
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
