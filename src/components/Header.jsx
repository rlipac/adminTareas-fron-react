import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className=" px-4 py-5 bg-white border-b">
       <div className="flex flex-col md:flex-row justify-between jusify-between   ">
            <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
                UpTask
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-4  ">
              <button className="text-white text-md font-bold uppercase p-2 bg-sky-500 rounded-lg">
                Buscar Proyectos
              </button>
                <Link
                    to='/proyectos'
                    className="font-bold uppercase"
                >
                        Proyectos
                </Link>
                <button
                        className="bg-blue-600 text-center text-white rounded-sm px-2 py-1 uppercase font-bold "
                    >
                        Cerrar Sesion
                </button>
            </div>
     </div> 
      
        
    </header>
  )
}

export default Header