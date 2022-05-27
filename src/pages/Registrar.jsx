import { useState } from "react";
import { Link } from "react-router-dom";

import clienteAxios from "../config/ClienteAxios";

//components
import Alerta from "../components/Alerta";

// console.log(import.meta.env.VITE_BACKEND_URL)
const Registrar = () => {
// datos(estado) del formulario
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmarPassword, setConfirmarPassword] = useState('')

 

  const resetInputs = ()=>{
    setNombre('')
    setEmail('')
    setPassword('')
    setConfirmarPassword('')
  }
  // datos del concopnete alerta
  const [alerta, setAlerta] = useState({})

  const handleSutmit = async (e) => {
    e.preventDefault();
    if ([nombre, email, password, confirmarPassword].includes('')) {
      const error = new Error("todos los campos son obligatorios")
      setAlerta({
        msg: error.message,
        error: true
      })
      return
    }if (password !== confirmarPassword) {
      const error = new Error("Los password no son iguales")
      setAlerta({
        msg: error.message,
        error: true
      })
      return
    }if (password.length < 6) {
      const error = new Error("El password es muy corto")
      setAlerta({
        msg: error.message,
        error: true
      })
      return
    }

  
   // creado usuario con la Api Backend
    try {
      
      const URL = `/usuarios`;
      
      const { data } = await clienteAxios.post(URL,{ nombre, email, password })
      console.log(URL)
      console.log(data)
      resetInputs()
      setAlerta({
        msg: data.mensage,
        error: false
      })
     
     
    } catch (error) {
      console.log(error.response)
        }
    
    
  }
 
  const { msg } = alerta;
  return (
    <>
      <h1 className='text-sky-600 font-black text-4xl capitalize'>
        Crea una cuenta y administra tus {''}
        <span className='text-slate-700'>proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta} />}  {/* si hay mensage muestra la Alerta   */}
      <form className="mt-10 mb-5 bg-white shadow rounded-lg p-10"
        onSubmit={handleSutmit}

      >

        <div className="my-5  ">
          <label className="uppercase text-gray-600 block font-bold text-xl"
            htmlFor="Nombre-apellido"
          >Nombre y apellido</label>
          <input
            id="Nombre-apellido"
            className=" w-full mt-3 p-2 border rounded-md bg-gray-50 "
            type="Nombre y apellido"
            placeholder="Ingrese su Nombre y apellido"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className="my-5  ">
          <label className="uppercase text-gray-600 block font-bold text-xl"
            htmlFor="email"
          >email</label>
          <input
            id="email"
            className=" w-full mt-3 p-2 border rounded-md bg-gray-50 "
            type="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5  ">
          <label className="uppercase text-gray-600 block font-bold text-xl"
            htmlFor="password"
          >password</label>
          <input
            id="password"
            className=" w-full mt-3 p-2 border rounded-md bg-gray-50 "
            type="password"
            placeholder="Ingrese su password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5  ">
          <label className="uppercase text-gray-600 block font-bold text-xl"
            htmlFor="confirmar-password"
          >confirmar password</label>
          <input
            id="confirmar-password"
            className=" w-full mt-3 p-2 border rounded-md bg-gray-50 "
            type="password"
            placeholder="Ingrese su confirmar password"
            value={confirmarPassword}
            onChange={e => setConfirmarPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Registrar"
          className="bg-sky-600 w-full py-3 mb-6 text-white uppercase font-bold rounded
                          hover:cursor-pointer hover:bg-sky-700 transition-colors"
        />

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5  text-slate-500 uppercase text-sm hover:cursor-pointer hover:text-blue-700 transition-colors"
          to="/"
        >
          ¿Ya tiene cuenta? Inicia sesscion
        </Link>

        <Link className="block text-center my-5  text-slate-500 uppercase text-sm hover:cursor-pointer hover:text-blue-700 transition-colors"
            to="/olvide-password"
          >
            Olvide mi password
          </Link>
      </nav>
    </>

  )
}

export default Registrar