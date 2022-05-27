import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//dependencias
import clienteAxios from "../config/ClienteAxios";
import useAuth from "../hooks/useAuth";
// components
import Alerta from "../components/Alerta";

const Login = () => {
  const [alerta, setAlerta] = useState({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

// Hoock provider

const  { setAuth } = useAuth();



  const resetInpust = ()=>{
    setEmail('')
    setPassword('')
  }

  const handleSutmit = async (e) => {
    e.preventDefault();

    // Inicio  validaciones
    if ([email, password].includes('')) {
      const error = new Error("todos los campos son obligatorios")
      setAlerta({
        msg: error.message,
        error: true
      })
      resetInpust()
      return
    }if (password.length < 6) {
      const error = new Error("El password es muy corto")
      setAlerta({
        msg: error.message,
        error: true
      })
     
      return
    }if (email == '' || email.length < 6) {
      setAlerta({
        msg: 'El campo esta vacio o es muy corto para ser un email valido',
        error: true
      })
     
      return
    }
   
    const isValidarEmail =(email)=>{
      return  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
         
    }
   isValidarEmail(email)
    
    if( isValidarEmail(email) === false){
    
      setAlerta({
        msg: `el correo ${email} No es valido`,
        error: true
      })
     
      return
    }
    // fin de validaciones
        try {
          const URL =`/usuarios/login`;
          const { data } = await clienteAxios.post(URL, {email, password})
          resetInpust()
          localStorage.setItem('token', data.jwtToken);//guardando el token en localStorage
          setAuth(data)
            
        } catch (error) {
          setAlerta({
            msg:error.response.data.mensage,
            error:true
          })
          resetInpust()
         
        }

  }

  const { msg } = alerta;

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Inicia session y administra tus {''} 
        <span className='text-slate-700'>proyectos</span>
      </h1>
      { msg && <Alerta alerta={alerta} /> }
      <form className="mt-10 mb-5 bg-white shadow rounded-lg p-10"
        onSubmit={handleSutmit}
      >
        <div className="my-5  ">
          <label className="uppercase text-gray-600 block font-bold text-xl"
           htmlFor="email"
           >Email</label>
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
        <input type="submit" value="Iniciar session" 
              className="bg-sky-600 w-full py-3 mb-6 text-white uppercase font-bold rounded
                          hover:cursor-pointer hover:bg-sky-700 transition-colors"
        />
        
      </form>

      <nav className="lg:flex lg:justify-between">
          <Link className="block text-center my-5  text-slate-500 uppercase text-sm hover:cursor-pointer hover:text-blue-700 transition-colors"
            to="registrar"
          >
            ¿Notienes una cuenta? Registrate.
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

export default Login