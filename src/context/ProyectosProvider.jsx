import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
// axios
import clienteAxios from '../config/clienteAxios'


const ProyectosContext = createContext()

const ProyectosProvider =  ({children})=>{

    const navigate = useNavigate()

    const [ proyectos, setProyectos ] = useState([])
    const [alerta, setAlerta] = useState([])

    const mostrarAlerta = alerta =>{
        setAlerta(alerta)

        setTimeout(()=>{
            setAlerta({})// despues de 5 segundos se reinicia la alerta a un objeto vacio
        },5000)
    }

    useEffect(()=>{
        const listarProyectos = async()=>{
            try {
                const token = localStorage.getItem('token');
                if(!token){
                    return console.log('no hay token')
                } 
                const config = {
                    headers: {
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const URL = `/proyectos`;
                const { data } = await clienteAxios(URL, config) 
                setProyectos(data.proyectos)
              
            } catch (error) {
                setAlerta({
                    msg:error.response.data,
                    error:true
                })
                console.log('hubo un error', error )
                console.log(error.response.data)
            }
        }
        listarProyectos()
    },[])
    //
    const submitProyecto = async (proyecto) =>{
            // gardando el proyecto en la BD
        try {
            const token = localStorage.getItem('token');
            if(!token)return
            const config = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const URL = `/proyectos`;
            const { data } = await clienteAxios.post(URL, proyecto, config)// 1-URL , 2- datos, 3-configiracion
             
            setAlerta({
                msg:'datos guardados correctamente',
                error:false
            })
            setTimeout(()=>{
               setAlerta({})  
               navigate('/proyectos')   
            }, 2000)
        } catch (error) {
           console.log(error)
          setAlerta({
            msg: error.response.data.mensage,
            error: true
          })
        }
    }


    return(
        <ProyectosContext.Provider
            value={{
                proyectos,
                alerta,
                mostrarAlerta,
                submitProyecto
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider
}

export default ProyectosContext