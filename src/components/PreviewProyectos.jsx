import { Link } from "react-router-dom";

const PreviewProyectos = ({proyecto}) => {
    const {_id, nombre, descripcion, fechaEntrega, cliente, createdAt} = proyecto;
  console.log('proyecto _id', _id)
  return (
    <div className="border-b p-5 flex">
        <p className="flex-1 font-medium capitalize text-2xl">
            {nombre}
          <span className="text-sm text-gray-500 uppercase">
            {`  ${cliente}`}  
          </span>    
        </p>
      
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