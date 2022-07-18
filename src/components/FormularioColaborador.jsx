// dependencias

import { useState } from "react"
// hooks

// componets
import Alerta from '../components/Alerta'

import useProyectos from '../hooks/useProyectos'

const FormularioColaborador = () => {

    const { alerta, mostrarAlerta, submitColaborador, colaborador  } = useProyectos()

    const [ email, setEmail] = useState('')
    console.log(colaborador)

    const handleSubmit = e => {
        e.preventDefault();
        if(email === ''){
            mostrarAlerta({
                msg:'El Email es OPbligatorio',
                error:true
            })
            return
        }
        const isValidarEmail =(email)=>{
            return  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
               
          }
         isValidarEmail(email)
         if( isValidarEmail(email) === false){
            mostrarAlerta({
                msg: `el correo ${email} No es valido`,
                error:true
            })
           setEmail('')
           
            return
          }

        submitColaborador(email);
        setTimeout(()=>{
            setEmail('')
        },2000)
    }

    const {msg}= alerta;

  return (
    <form action=""
        className="bg-white py-10 px-5 md:w-full lg:w-1/2  rounded-lg shadow"
        onSubmit={handleSubmit}
    >
        
        { msg && <Alerta  alerta={alerta} /> }
        <div className='mb-5'>
             <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='email'>
                 Email Colaborador:
             </label>
             <input
                 id='email'
                 type='email'
                 placeholder='Nombre del Proyecto'
                 className='border w-full p-2 mt-2 placeholder-gray-400'
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
             />
         </div>

         
         <button
                id="botonTareas"
                data-bs-dismiss="modal"
                type='submit'
                className='bg-blue-600 text-center uppercase  text-white rounded-md p-2 w-full cursor-pointer hover:bg-blue-700 transition-colors'
            >

               Buscar colaborador

            </button>


    </form>
  )
}

export default FormularioColaborador