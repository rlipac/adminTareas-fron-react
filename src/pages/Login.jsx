import { Link  } from "react-router-dom";

const Login = () => {
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Inicia session y administra tus {''} 
        <span className='text-slate-700'>proyectos</span>
      </h1>

      <form className="mt-10 mb-5 bg-white shadow rounded-lg p-10" >
        <div className="my-5  ">
          <label className="uppercase text-gray-600 block font-bold text-xl"
           htmlFor="email"
           >Email</label>
          <input
          id="email"
            className=" w-full mt-3 p-2 border rounded-md bg-gray-50 "
            type="email"
            placeholder="Ingrese su email"
          />
        </div>
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
        <input type="submit" value="Iniciar session" 
              className="bg-sky-600 w-full py-3 mb-6 text-white uppercase font-bold rounded
                          hover:cursor-pointer hover:bg-sky-700 transition-colors"
        />
        
      </form>

      <nav className="lg:flex lg:justify-between">
          <Link className="block text-center my-5  text-slate-500 uppercase text-sm hover:cursor-pointer hover:text-blue-700 transition-colors"
            to="registrar"
          >
            ¿Notienes una cuenta? Registrate.
          </Link>
      
          <Link className="block text-center my-5  text-slate-500 uppercase text-sm hover:cursor-pointer hover:text-blue-700 transition-colors"
            to="olvide-password"
          >
            Olvide mi password
          </Link>
      </nav>
    </>
    
  )
}

export default Login