import { Link  } from "react-router-dom";


const NuevoPassword = () => {

  return (
    <>
      <h1 className='text-sky-600 font-black text-4xl capitalize'>
       Rescablece tu contraseña y administra tus {''} 
        <span className='text-slate-700'>proyectos</span>
      </h1>

      <form className="mt-10 mb-5 bg-white shadow rounded-lg p-10" >
        
     
        <div className="my-5  ">
          <label className="uppercase text-gray-600 block font-bold text-xl"
           htmlFor="password"
           >password</label>
          <input
          id="password"
            className=" w-full mt-3 p-2 border rounded-md bg-gray-50 "
            type="password"
            placeholder="Ingrese su password"
          />
        </div>
      
        <input type="submit" value="Guardar Nuevo password" 
              className="bg-sky-600 w-full py-3 mb-6 text-white uppercase font-bold rounded
                          hover:cursor-pointer hover:bg-sky-700 transition-colors"
        />
        
      </form>

      <nav className="lg:flex lg:justify-between">
          <Link className="block text-center my-5  text-slate-500 uppercase text-sm hover:cursor-pointer hover:text-blue-700 transition-colors"
            to="/"
          >
            ¿Inicia sesscion
          </Link>
      
       4
      </nav>
    </>
    
  )
}

export default NuevoPassword