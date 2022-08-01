import { useState, useEffect, createContext} from 'react';
import clienteAxios from '../config/ClienteAxios';
import  { useNavigate } from 'react-router-dom'

const AuthContext = createContext();

const AuthProvider =({ children })=>{// con children le asamos la informacion a todos loscomponentes

const [ auth, setAuth] = useState({})
const [ cargando, setCargando] = useState(true)

const navigate = useNavigate()

useEffect(()=>{
      const autenticarUsuario =async ()=>{
          const token = localStorage.getItem('token')
          if(!token){
              console.log('no hay token')
              setCargando(false)// se ejecuta si no hay token 
              return 
          }
        
          try {
              const config = {
                   
                    headers: {
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${token}`
                    }
              }
              const URL = `/usuarios/perfil/ok`;
              const { data } = await clienteAxios(URL, config)// le pasamos el config
              setAuth(data)
            //   navigate('/proyectos')
              
          } catch (error) {
              console.log(error)
              setAuth({})
          }
          
          setCargando(false)
      }
     autenticarUsuario() 
},[])

// logout

const cerrarSesionAuth=()=>{
    setAuth({})
}
return(
    <AuthContext.Provider
        value={{
            auth,
            setAuth,
            cargando,
            //cerrarSescion
            cerrarSesionAuth
        }}
    >
        { children } 
       
    </AuthContext.Provider>
    )
}

export {
    AuthProvider // con el redeamos la App y se exporta como funcion
}

export default AuthContext ; // como defaul 