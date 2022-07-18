
  // hoocks
import useProyectos from '../hooks/useProyectos'

const Colaborador = ({colaborador}) => {

    const { datosModalEliminar } = useProyectos()

 
  
    const {nombre, email} = colaborador;
   
  return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p >{nombre} </p>
                <p className='text-gray-700 text-sm'>{email}</p>
            </div>
            <div>
                <button
                     data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop2"
                     onClick={()=> datosModalEliminar(colaborador)}
                    className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
                >
                 Eliminar Colaborador
                </button>
            </div>
        </div>
  ) 
}

export default Colaborador