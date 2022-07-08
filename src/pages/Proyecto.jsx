import { useEffect, useState, Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'


// hoocks
import useProyectos from '../hooks/useProyectos'
// components
//import FormularioTareaModal from '../components/FomularioTareaModal'
import ModalFormTarea from '../components/ModalFormTarea'
import ModalEliminarTarea from '../components/ModalEliminarTarea'
import Tarea from '../components/Tarea'
import Alerta from '../components/Alerta'


const Proyecto = () => {
  const [modal, setModal] = useState(false);

 
  const params = useParams();
  
  const { obtenerproyectoId,  proyectoId,  cargando, alerta, limpiarTarea } = useProyectos();

 
   const { nombre, descripcion, cliente, tareas,   _id  } = proyectoId;

  
  const { id } = params;
  
  
  useEffect(() => {
  

    obtenerproyectoId(id) //le pasamos el ID del proyecto como parametro ppara que lo busque
   
  }, [])

  const { msg }=  alerta
  return (
    cargando ? <div className="border border-blue-300 shadow rounded-md p-4 max-w-full w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3  ">
            <div className="grid grid-cols-3 gap-4 content-center">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
            {/* hasta aqui llega el template original */}
            <div className="grid grid-cols-3 gap-4 content-center">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="h-2 bg-slate-700 rounded"></div>

          </div>


        </div>
      </div>
    </div>
      : (
        <Fragment>

       

          <div className='flex justify-between'>
            <h1 className='font-black text-4xl'>Proyecto:{nombre}</h1>
            <div className='flex items-center gap-2 text-gray-400 hover:text-black' >

              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <Link
                className='uppercase font-bold'
                to={`/proyectos/editar/${id}`}
                
              >
                Editar</Link>
            </div>

          </div>
      

          <button
            className='text-sm px-5 py-3 mt-5 w-full md:w-auto rounded-lg
                      uppercase font-bold bg-sky-400 text-white text-center
                      flex gap-2 items-center justify-center'
            data-bs-toggle="modal"
            data-bs-target="#modalForm"

            onClick={limpiarTarea}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            nueva tarea
          </button>



          <ModalFormTarea />

            

          <ModalEliminarTarea />


          
                { msg && <Alerta alerta={alerta} /> }
                <p className="font-bold text-xl mt-10">Tareas del Proyecto</p>
                  <div className='bg-white shadow  mt-10 rounded-lg'>
                      {tareas?.length  ? //?   --=> ? operador (si esiste el objeto tareas conparar si hay tareas si no no ejecuta el if)
                          tareas.map(tarea =>(
                              <Tarea
                                key={tarea._id}
                                tarea={tarea}
                            />
                            
                            
                          ))
                        : <h2 className='text-center text-gray-600 my-5 p-10'>Aun no has creado ningun Tarea</h2>}
                </div>
           

          </Fragment>

      )
  )
}

export default Proyecto