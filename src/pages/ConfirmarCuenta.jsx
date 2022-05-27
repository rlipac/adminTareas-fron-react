import { useEffect, useState } from "react" // useEffec hacer cambios en el componete
import { Link, useParams } from "react-router-dom" // useParams para capturar los parametros enviados
// dependencias
import clienteAxios from "../config/ClienteAxios"

// components
import Alerta from "../components/Alerta"


const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [confirmada, setConfirmada] = useState(false)


  const params = useParams();
  const { id } = params;// aplicamos destructuring al objeto params
  useEffect(() => {


    const confirmarCuenta = async () => {
      try {
        const URL = `/usuarios/confirmar-cuenta/${id}`;
        console.log(URL);
        const { data } = await clienteAxios(URL);
      
        setAlerta({
          msg: data.msg,
          error: false
        })
       
        setConfirmada(true)
      } catch (error) {
        console.log(error.response.data)

        setAlerta({
          msg: error.response.data.mensage,
          error: true
        })
      }
    }

    confirmarCuenta()
  }, [])

  const { msg} = alerta;

  return (
    <>
      <h1 className='text-sky-600 font-black text-4xl capitalize'>
        Confirma tu cuenta y administra tus {''}
        <span className='text-slate-700'>proyectos</span>

      </h1>
  
      {/* {<Alerta alerta={alerta} />} */}
      <>

        {confirmada &&
          
          <nav className="lg:flex lg:justify-between">
          
            <Link className="block text-center my-5  bg-blue-600  text-white uppercase p-3 rounded-xl
                                  hover:cursor-pointer hover:bg-blue-800 transition-colors"
              to="/"
            >
              Inicia Session
            </Link>
          </nav>
        }
      </>
    </>
  )
}

export default ConfirmarCuenta