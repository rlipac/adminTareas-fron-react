import { Outlet } from "react-router-dom" // permite mostrar los componentes hijos de Authlayout

const AuthLayout = () => {
  return (
   <>
   
   <main className="container-fluid mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center ">
   
        <div className="md:w-1/3 lg:1/2 ">
            <Outlet />  {/* // muestra los hijo de este componente */}

        </div>
   </main>
          
   </>   
   
  )
}

export default AuthLayout