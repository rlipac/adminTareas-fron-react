import Alerta from '../components/Alerta'
import PreviewProyectos from '../components/PreviewProyectos'
import useProyectos from '../hooks/useProyectos'

const Proyectos = () => {
    const { proyectos, alerta  } = useProyectos()
      
 
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