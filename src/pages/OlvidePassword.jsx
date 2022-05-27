import { useState } from "react";
import { Link } from "react-router-dom";

 import clienteAxios from "../config/ClienteAxios";

// components
import Alerta from '../components/Alerta'




const OlvidePassword = () => {
  const [alerta, setAlerta] = useState({})
  const [email, setEmail] = useState('')


  console.log('olvide mi password')
  const handleSubmit = async e => {
   
    e.preventDefault();
    if (email == '' || email.length < 6) {
      setAlerta({
        msg: 'El campo esta vacio o es muy corto para ser un email valido',
        error: true
      })
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
    }


    try {
      // craer la variable url porque en colocarla directo no funciona no funciona
        const URL = `/usuarios/olvide-password`;
        const { data } = await clienteAxios.post(URL,{email});
        console.log(email, '...mi email')
        setAlerta({
          msg:`hola  ${data.msg}`,
          error:false
        })
    } catch (error) {
      console.log(error.response.data);
      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
    
    }

  

  }
  const { msg } = alerta

  return (
    <>
      <h1 className='text-sky-600 font-black text-5xl capitalize'>
        Recupera tu cuenta y administra tus {''}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      { msg && <Alerta alerta={alerta}  />}
      <form className="mt-10 mb-5 bg-white shadow rounded-lg p-10"
            onSubmit={handleSubmit}
      >
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
            onChange={ e=>setEmail(e.target.value)}
          />
        </div>

        <input type="submit" value="Recuperar cuenta"
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


      </nav>
    </>

  )
}


export default OlvidePassword;
