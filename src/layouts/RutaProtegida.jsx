import { Outlet, Navigate } from 'react-router-dom'


//
import useAuth from '../hooks/useAuth'// hock del provider

//components
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Proyectos from '../pages/Proyectos'


const RutaProtegida = () => {


    const {auth, cargando} = useAuth()
    console.log(auth)

    if(cargando)return <h1 className='text-6xl font-medium'>Cardando...</h1>
  return (
    <>

          
          {auth._id ?
          
            (
              <div className='bg-gray-100 '>
                 <Header />
                <div className='md:flex md:min-h-screen '>
                  <Sidebar />
                  <main className='flex-1 p-10 bg-white'>
                   <Outlet />
                  </main>
                </div>
                
              </div>
            )
           : <Navigate to='/' />}
           

           
    </>  
  )
}






export default RutaProtegida