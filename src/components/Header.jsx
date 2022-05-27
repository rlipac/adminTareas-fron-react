import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className=" px-4 py-5 bg-white border-b">
       <div className="flex  justify-between md:flex jusify-between ">
            <h2 className="text-4xl text-sky-600 font-black text-center">
                UpTask
            </h2>
            <input
            type="search"
            placeholder="Buscar proyecto"
            className="rounded-lg lg:w-96  block p-2 border"
             />
            <div className="flex items-center gap-4 ">
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