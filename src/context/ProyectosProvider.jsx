import { useState, useEffect, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
// axios
import clienteAxios from '../config/clienteAxios'
// mis hooks




const ProyectosContext = createContext()

const ProyectosProvider =  ({children})=>{
    const params=useParams()
    //const { id } = params;

    const navigate = useNavigate()

    //


    // Tareas
    const [tarea, setTarea ] = useState({}) ;
    const [tareas, setTareas ] = useState({}) ;
    const [estadoTrea, setStadoTarea ] = useState(false)
   
   
    // proyectos
    const [ proyectos, setProyectos ] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyectoId, setProyectoId ] = useState({}) 
    const [cargando, setCargando ] = useState(false)

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
    },[])// en el array vacio se coloca state que se espera que cambie
    //
    const submitProyecto = async (proyecto) =>{
        console.log(proyecto.id)
        if(proyecto.id){
          await  editarProyecto(proyecto)
            //navigate('/proyectos')   
        }else{
          await  guardarProyecto(proyecto)
            //navigate('/proyectos')   
        }
       
    }

    const guardarProyecto = async (proyecto) =>{
            console.log('Guardando proyecto....')
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
                setProyectos([ ...proyectos, data]) // crea un copia del proyecto de la BD y la reescribe
              
                setAlerta({
                    msg:'datos guardados correctamente',
                    error:false
                })
              
                setTimeout(()=>{
                //    setAlerta({})  
                    navigate('/proyectos')   
                }, 500)
        } catch (error) {
                console.log(error)
                setAlerta({
                    msg: error.response.data.mensage,
                    error: true
                })
        }
    }
    const editarProyecto = async (proyecto) =>{   
            try {
                console.log('proyecto edit => ',proyecto)
                    const token = localStorage.getItem('token');
                    if(!token)return
                    const config = {
                        headers: {
                            "Content-Type":"application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                
                    const URL = `/proyectos/${proyecto.id}`;
                    const { data } = await clienteAxios.put(URL, proyecto, config)// 1-URL , 2- datos, 3-configiracion

                    // sincronisado el state //? proyectoState:es la lista de proyectos que estan  en memoria del state  
                    const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id == data.proyectoActualizado._id ? data.proyectoActualizado : proyectoState);
                    setProyectos(proyectosActualizados);
                setAlerta({
                        msg:'El Proyecto se Actualizo ! correctamente',
                        error:false
                    })
                
                    setTimeout(()=>{
                        setAlerta({})
                         navigate('/proyectos')
                       
                        
                    }, 1000)
        } catch (error) {
                console.log(error)
                setAlerta({
                    msg: error.response.data.mensage,
                    error: true
                })
        }
    }
  
  

    const obtenerproyectoId= async (id) =>{ // pasamos el Id como parametro
         setCargando(true)
       
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
           
            const URL = `/proyectos/${id}`;
            const { data } = await clienteAxios(URL, config) // 1-URL , 2- datos, 3-configiracion
             setProyectoId(data.proyecto)
           
            
         
        } catch (error) {
            console.log(error)
        }
        setCargando(false)
       
    }
    


    const eliminarProyecto = async (id) =>{
        console.log('proyecto con id: ', id ,' eliminado')

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
            const URL = `/proyectos/${id}`;
            const { data } = await clienteAxios.delete(URL, config) // 1-URL , 2- datos, 3-configiracion
            console.log(data)
            // sincronizando el state proyectos
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id )
            setProyectos(proyectosActualizados)  
             //Fin sincronizando el state proyectos
            setAlerta({
                msg:'El Proyecto se ELIMINO! correctamente',
                error:false
            })
        
            setTimeout(()=>{
                setAlerta({})
                navigate('/proyectos')
                
            }, 1000)       
        } catch (error) {
              console.log(error.response.data.msg.message)
        }
        setCargando(false)
       
    }
    //? Tareas

    const submitTarea = async (tarea) =>{
        console.log('tarea id ',tarea.id)
        if(tarea.id){
          await  updateTarea(tarea);
            console.log('editar TareaID =>', tarea.id)
        //   await  editarTarea(tarea)
            //navigate('/proyectos')   
        }else{
          await  guardarTarea(tarea);
            console.log('Guardar.. Tarea=>', tarea)
        //   await  guardarTarea(tarea)
            //navigate('/proyectos')   
        }
       
    }
    const editarTarea = async (tarea) =>{ 
       
        setTarea(tarea)
    }

    const updateTarea = async (tarea) =>{ 
        try {
            console.log('tarea edit => ',tarea)
                const token = localStorage.getItem('token');
                if(!token)return
                const config = {
                    headers: {
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            
                const URL = `/tareas/${tarea.id}`;
                const { data } = await clienteAxios.put(URL, tarea, config)// 1-URL , 2- datos, 3-configiracion
                setTarea(data.tareaActualizada)
                // sincronisado el state //? 
            
                const proyectoIdActualizado = {...proyectoId}; //paso 1 creamos una copia del proyectoId 
                //paso 2 recorremos proyecotID
                // paso 3 comparamos y remplazamos ( buscamos la tarea que tenga el id que sea igual al id de la tarea actualizada y la remplazamos)
                proyectoIdActualizado.tareas = proyectoIdActualizado.tareas.map(tareaState => // devuelve un ternario
                    tareaState._id === data.tareaActualizada._id ? data.tareaActualizada : tareaState  )
                    setProyectoId(proyectoIdActualizado);
               
            setAlerta({
                    msg:'El Proyecto se Actualizo ! correctamente',
                    error:false
                })
            
                setTimeout(()=>{
                    setAlerta({})
                    //  navigate('/proyectos')
                   
                    
                }, 1000)
    } catch (error) {
            console.log(error)
            setAlerta({
                msg: error.response.data.mensage,
                error: true
            })
    }
    }
   
    const guardarTarea = async (tarea) =>{
        console.log('Guardando tarea....')
    try {
            const token = localStorage.getItem('token');
            if(!token)return
            const config = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const URL = `/tareas`;
            const { data } = await clienteAxios.post(URL, tarea, config)// 1-URL , 2- datos, 3-configiracion
             const proyectoActualizado = proyectoId.tareas.push(data.tareaGuardada); // actualiza el state Tareas
          setTareas(proyectoActualizado) 
            // setTareas(data.tareaGuardada)
            setAlerta({
                msg:'datos guardados correctamente',
                error:false
            })
          
            setTimeout(()=>{
                 setAlerta({}) 
                   
            }, 2000)
    } catch (error) {
            console.log(error)
            setAlerta({
                msg: error.response.data,
                error: true
            })
    }
}

const eliminarTarea = async (tarea) =>{
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
        const URL = `/tareas/${tarea._id}`;
      
        const { data } = await clienteAxios.delete(URL, config) // 1-URL , 2- datos, 3-configiracion
       // console.log(data.tarea._id)
        // sincronizando el state proyectos
        const proyectoIdActualizado = {...proyectoId};
        proyectoIdActualizado.tareas = proyectoIdActualizado.tareas.filter(tareaState =>
             tareaState._id != data.tarea._id )
        // const result = words.filter(word => word != 'spray');
        setProyectoId(proyectoIdActualizado) 
       
        
        //  setTareas(tareasActualizadas)
       
         //Fin sincronizando el state proyectos
        setAlerta({
            msg:'El Proyecto se ELIMINO! correctamente',
            error:false
        })
    
        setTimeout(()=>{
            setAlerta({})
            //   navigate(`/proyectos/${tarea._id}`)
            
        }, 10)       
    } catch (error) {
          console.log(error.response.data.msg)
    }
    setCargando(false)
     
}

const cambiarEstadoTareas = async (tarea) =>{
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
        const URL = `/tareas/estado/${tarea._id}`;
        // tarea.estado = true;
      
        const { data } = await clienteAxios.put(URL,  config) // 1-URL , 2- datos, 3-configiracion
       // console.log(data.tarea._id)
        // sincronizando el state proyectos
        const proyectoIdActualizado = {...proyectoId};
        proyectoIdActualizado.tareas = proyectoIdActualizado.tareas.filter(tareaState =>
             tareaState._id != data.tarea._id )
        // const result = words.filter(word => word != 'spray');
        setProyectoId(proyectoIdActualizado) 
       
        
        //  setTareas(tareasActualizadas)
       
         //Fin sincronizando el state proyectos
        setAlerta({
            msg:'El Proyecto se ELIMINO! correctamente',
            error:false
        })
    
        setTimeout(()=>{
            setAlerta({})
            //   navigate(`/proyectos/${tarea._id}`)
            
        }, 10)       
    } catch (error) {
          console.log(error.response.data.msg)
    }
    setCargando(false)
     
}


const modalDeleteTarea = async (tarea) =>{
    console.log('tareaModal', tarea)
    setTarea(tarea)

}


 
const limpiarTarea = ()=>{
    setTarea({})
    console.log('limpiando tarea')
  
}


    return(
        <ProyectosContext.Provider
            value={{
                cargando,
                alerta,
                mostrarAlerta,
                submitProyecto,
                obtenerproyectoId,
                eliminarProyecto,
                proyectos,
                proyectoId,
                tarea,
                tareas,
                submitTarea,
                limpiarTarea,
                eliminarTarea,
                modalDeleteTarea,
                editarTarea,
                guardarTarea,
                cambiarEstadoTareas
                
                
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