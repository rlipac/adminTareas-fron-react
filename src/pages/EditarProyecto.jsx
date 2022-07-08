import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import FormularioProyectos from '../components/FormularioProyectos'

// hoocks
import useProyectos from '../hooks/useProyectos'

const EditarProyecto = () => {
  const params = useParams()
  const { id }= params;
  const { obtenerproyectoId, proyectoId, cargandon, eliminarProyecto } = useProyectos()

  const { _id, nombre,  } = proyectoId;
  //  const { email }= creador;}


  useEffect(() => {
    console.log('mi parmas id pro )=>', params)
  
    obtenerproyectoId(id) //le pasamos el ID del proyecto como parametro ppara que lo busque
  }, [])

  const handleClick =  ()=>{ // boton eliminar
    if(confirm('deseas eliminar el proyecto?')){
      console.log('si...')
      // eliminarProyecto(params.id, proyectoId)
      eliminarProyecto(id)
    }else{
      console.log('No...')
    }
   }
  

  return (
    <>

     
      <div className='flex justify-between'>
      
        <h1 className='font-black text-4xl'>Eliminar Proyecto: {nombre}</h1>
       
       
        <div className='flex items-center gap-2 text-gray-400 hover:text-black' >

        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
          <button
           className='uppercase font-bold'
           onClick={handleClick}
          >Eliminar</button>
         
        </div>

      </div>

      <FormularioProyectos />
    </>

  )
}

export default EditarProyecto