import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const PreviewProyectos = ({proyecto}) => {

    const { auth  } = useAuth()
  

    const {_id, nombre, descripcion, fechaEntrega, cliente, createdAt, creador} = proyecto;

  
  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
      <div className="flex items-center gap-2">
      <p className="flex-1 font-medium capitalize text-2xl">
            {nombre}
          <span className="text-sm text-gray-500 uppercase">
            {`  ${cliente}`}  
          </span>    
        </p>
        { auth._id !== creador._id && ( 
          <p className="bg-green-500 text-white uppercase 
                      font-bold py-1 px-2 rounded lg text-xs">
          Colaborador
          </p>
        )} 
      </div>
       

  
         
          <Link
          to={`${_id}`}
          className="text-gray-600 hover:text-gray-900 uppercase text-sm font-bop"
          >
          Ver proyecto
        </Link>
       
      
      
    </div>
  )
}

export default PreviewProyectos