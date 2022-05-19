import {  useEffect, useState } from "react" // useEffec hacer cambios en el componete
import { Link, useParams } from "react-router-dom" // useParams para capturar los parametros enviados
// dependencias
import axios from "axios" // para hacer consultas a la API

// components
import Alerta from "../components/Alerta"


const ConfirmarCuenta = () => {
  
  const [ alerta, setAlerta ] = useState({})
  const [ confirmada, setConfirmada ] = useState(false)
const params = useParams();
const {id} = params;// aplicamos destructuring al objeto params
const baseUrl= import.meta.env.VITE_BACKEND_URL;

useEffect(() => {

 
        const confirmarCuenta = async ()=>{
          try {
            const URL =`${baseUrl}usuarios/confirmar-cuenta/${id}`
            const { data } = await axios(URL)
            setAlerta({
              msg: data.mensage,
              error: false
            })
            setConfirmada(true)
            console.log(data.mensage)

          } catch (error) {
            console.log(error.data.mensage)
            setConfirmada(false)
            setAlerta({
              msg: error.response.data.mensage,
              error: true
            })         
          }     
        }
      
  confirmarCuenta()
}, [])

const { msg, error } = alerta;

  return (
    <>
    <h1 className='text-sky-600 font-black text-4xl capitalize'>
      Confirma tu cuenta y administra tus {''} 
      <span className='text-slate-700'>proyectos</span>

    </h1>

    <nav className="lg:flex lg:justify-between">
      { confirmada &&  <Link className="block text-center my-5  bg-blue-600  text-white uppercase p-3 rounded-xl
                         hover:cursor-pointer hover:bg-blue-800 transition-colors"
            to="/"
          >
            Inicia Session
          </Link>
      }
         
      
       
      </nav>

      {msg && <Alerta alerta={alerta} />}
   </> 
  )
}

export default ConfirmarCuenta