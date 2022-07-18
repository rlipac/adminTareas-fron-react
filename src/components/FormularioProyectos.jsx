import  {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import Alerta from './Alerta';

const FormularioProyectos = () => {
    const params = useParams(); // obtenemoms los parametros de la ruta
    


    const [nombre, setNombre ] = useState('');
    const [descripcion, setDescripcion ] = useState('');
    const [fechaEntraga, setFechaEntrega ] = useState('');
    const [cliente, setCliente ] = useState('');

    // ? mandamos al editar Proyecto
    const [ id, setId ] = useState(null)

    // props del provider
    const {  alerta, mostrarAlerta, submitProyecto, proyectoId,  } = useProyectos() // proyectoID objeto del la funcion proyectoId del provider
   
  const resetInputs = ()=>{
    setId(null)  
    setNombre('')
    setDescripcion('')
    setFechaEntrega('')
    setCliente('')
  }

//   

  useEffect(()=>{
    if(params.id){   
        setId(proyectoId._id)    
        setNombre(proyectoId.nombre)
        setDescripcion(proyectoId.descripcion)
        setFechaEntrega(proyectoId.fechaEntrega?.split('T')[0])// corta el array y develve la fecha
        setCliente(proyectoId.cliente)
    }else{
        console.log('Nuevo Proyecto')
    }
},[params]);

        //Pasar los datos del proyecto al Provider para que lo guarde en la BD
  
  const handleSutmit = async (e) => {
    e.preventDefault();
   
        try {
            if ([nombre, descripcion, fechaEntraga, cliente].includes('')) {
                const error = new Error("todos los campos son obligatorios")
                mostrarAlerta({
                msg: error.message,
                error: true
                })
                return
            }
            await submitProyecto({ id, nombre, descripcion, fechaEntraga, cliente })
            resetInputs()
        } catch (error) {
            mostrarAlerta({
                msg: error,
                error: true
            })
            resetInputs()
        }    
  }

  const { msg } = alerta;
  return (

     <form className='bg-white py-10 px-5 md:w-1/2  rounded-lg' onSubmit={handleSutmit}>
     {msg && <Alerta alerta={alerta} />}  
         <div className='mb-5'>
             <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='nombre'>
                 Nombre del Proyecto:
             </label>
             <input
                 id='nombre'
                 type='text'
                 placeholder='Nombre del Proyecto'
                 className='border w-full p-2 mt-2 placeholder-gray-400'
                 value={nombre}
                 onChange={e => setNombre(e.target.value)}
             />
         </div>
         <div className='mb-5'>
             <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='descripcion'>
                Descripcion:
             </label>
             <textarea
                 id='descripcion'
                 placeholder='descripcion del Proyecto'
                 className='border w-full p-2 mt-2 placeholder-gray-400'
                 value={descripcion}
                 onChange={e => setDescripcion(e.target.value)}
             ></textarea>
                 
             
         </div>
         <div className='mb-5'>
             <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='fechaEntrega'>
                 Fecha de entrega del Proyecto:
             </label>
             <input
                 id='fechaEntrega'
                 type='date'
                 placeholder='fechaEntrega del Proyecto'
                 className='border w-full p-2 mt-2 placeholder-gray-400'
                 value={fechaEntraga}
                 onChange={e => setFechaEntrega(e.target.value)}
             />
         </div>
         <div className='mb-5'>
             <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='cliente'>
                 Cliente del Proyecto:
             </label>
             <input
                 id='cliente'
                 type='text'
                 placeholder='cliente del Proyecto'
                 value={cliente}
                 onChange={e => setCliente(e.target.value)}
                 className='border w-full p-2 mt-2 placeholder-gray-400'
             />
         </div>
         <input
             value={ id ? `Actualizar Proyecto` : 'Crear Proyecto'}
             type='submit'
             className='bg-blue-600 text-center uppercase  text-white rounded-md p-2 w-full cursor-pointer hover:bg-blue-700 transition-colors'
          />
 
     </form>

  )
}

export default FormularioProyectos;