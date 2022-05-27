import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


import clienteAxios from "../config/ClienteAxios";

// components
import Alerta from '../components/Alerta'

const NuevoPassword = () => {
  const [ alerta, setAlerta ] = useState({})
  const [ newPassword, setNewPassword ] = useState('')
  const [ tokenValido, setTokenValido ] = useState(false)
  const [ cambioPassword, setCambioPassword ] = useState(false)


  const params = useParams();
  const { token } = params;
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
      
        await clienteAxios(`usuarios/nuevo-password/${token}`)
        setTokenValido(true)
        setAlerta({
          msg: data.msg,
          error: false
        })
      } catch (error) {

        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken()

  }, [])

  const resetInputs = () => {
    setNewPassword('')
  }
  const handleSubmit = async e => {
    e.preventDefault();
    if (newPassword == '' || newPassword.length < 6) {
      setAlerta({
        msg: 'El campo esta vacio o es muy corto para ser un email valido',
        error: true
      })
      return
    }
    try {
      
      const URL = `/usuarios/nuevo-password/${token}`;
      console.log(token, URL);
      const { data } = await clienteAxios.post(URL, { newPassword })
      setAlerta({
        msg: data.msg,
        error: false
      })
      resetInputs()
      setCambioPassword(true)

    } catch (error) {
      console.log(error)
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }


  const { msg } = alerta;

  return (
    <>

      <h1 className='text-sky-600 font-black text-4xl capitalize'>
        Rescablece tu contraseña y administra tus {''}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}  {/* si hay mensage muestra la Alerta   */}

      {tokenValido &&
        
          <form className="mt-10 mb-5 bg-white shadow rounded-lg p-10"
            onSubmit={handleSubmit}
          >


            <div className="my-5  ">
              <label className="uppercase text-gray-600 block font-bold text-xl"
                htmlFor="password"
              >password</label>
              <input
                id="password"
                className=" w-full mt-3 p-2 border rounded-md bg-gray-50 "
                type="password"
                placeholder="Ingrese su password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
            </div>

            <input type="submit" value="Guardar Nuevo password"
              className="bg-sky-600 w-full py-3 mb-6 text-white uppercase font-bold rounded
                           hover:cursor-pointer hover:bg-sky-700 transition-colors"
            />
          </form>
      }
      { 
      cambioPassword && 
          <nav className="lg:flex lg:justify-between">
          <Link className="block  text-center my-5 bg-blue-600  text-white  uppercase
                             text-sm hover:cursor-pointer p-2 rounded-md 
                           hover:bg-blue-700  transition-colors"
            to="/"
          >
            Inicia sesscion!!
          </Link>
        </nav>
      }
    </>

  )
}

export default NuevoPassword