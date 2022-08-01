import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

//Components
import Alerta from '../components/Alerta'
import PreviewProyectos from '../components/PreviewProyectos'

//Hooks
import useProyectos from '../hooks/useProyectos'
import useAuth from '../hooks/useAuth'

// variables Globales


let socket;

const Proyectos = () => {
    const { proyectos, alerta, addColaboradorProyectos  } = useProyectos()
    const { auth } =useAuth()
 

    // conecta el soket del backEnd con el frontEnd
    useEffect(()=>{
       
      socket = io(import.meta.env.VITE_BACKEND_URL);// me conecto al servidor

    },[])

   
    // respuesta a sala juan
    useEffect(()=>{
 
      socket.emit('proyecto asignado', (proyectoActualizado)=>{

        if(proyectoActualizado.colaborador._id === auth._id){
          addColaboradorProyectos(proyectoActualizado)

        }

      })
     
  
    })
   
  //Fin conecta el soket del backEnd con el frontEnd

    const { msg }=  alerta
    
  return (
    <>
    
    { msg && <Alerta alerta={alerta} /> }
     <h1 className="text-4xl font-black">proyectos</h1>
      <div className='mt-10 flex flex-col justify-center'>
          {proyectos?.length  ?
              proyectos.map(proyecto =>(
                <PreviewProyectos
                  key={proyecto._id}
                  proyecto={proyecto}
                />
              ))
            : <h2 className='text-center text-gray-600 uppercase'>Aun no has creado ningun Proyecto</h2>}
     </div>
    </>
  
  )
}

export default Proyectos