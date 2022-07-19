import { useState, useEffect } from 'react'
// import { io } from 'socket.io-client'

//Components
import Alerta from '../components/Alerta'
import PreviewProyectos from '../components/PreviewProyectos'

//Hooks
import useProyectos from '../hooks/useProyectos'

// variables 
// let socket;

const Proyectos = () => {
    const { proyectos, alerta  } = useProyectos()
    // const [ misProyectos, setMisproyectos ] = useState({})
    // setMisproyectos(proyectos)

    // conecta el soket del backEnd con el frontEnd
    // useEffect(()=>{
      
    //   const urlBack = import.meta.env.VITE_BACKEND_URL; // url servidor back
    //   socket = io(urlBack);
    //   socket.emit('hola', proyectos)
    //   socket.on('respuesta',()=>{
    //     console.log('hola desde el Front')
    //   })
    // })
   
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