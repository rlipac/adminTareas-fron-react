import { Link, useParams } from "react-router-dom"


import ModalBuscador from './ModalBuscador'

const Header = () => {

  const params = useParams();
  console.log('id-> ', params.id)

  return (
    <header className=" px-4 py-5 bg-white border-b">
       <div className="flex flex-col md:flex-row justify-between jusify-between   ">
            <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
                UpTask
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-4  ">

              {/*  muestra el boton Buscar proyecto SOLO si exite el id */}
            { params.id ? '' : (
                  
                  <button  className="text-white text-md font-bold uppercase p-2 bg-sky-500 rounded-lg"
                  data-bs-toggle="modal" data-bs-target="#modalBuscador"
                   >
                      Buscar Proyectos
                   </button>
                  ) }
             
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

               
                <ModalBuscador />
                
            </div>
     </div> 
      
        
    </header>
  )
}

export default Header