import { useState, useEffect, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from 'socket.io-client'
// axios
import clienteAxios from '../config/clienteAxios'

// mis hooks

import useAuth from '../hooks/useAuth'

let socket;

const ProyectosContext = createContext()

const ProyectosProvider = ({ children }) => {
    const params = useParams()
    //const { id } = params;

    const navigate = useNavigate();
    const { auth } = useAuth(); // para eliminar error al cargar proyectos al iniciar session

    // Tareas
    const [tarea, setTarea] = useState({});
    const [tareas, setTareas] = useState({});
    const [estadoTrea, setStadoTarea] = useState(false)


    // proyectos
    const [proyectos, setProyectos] = useState({})
    const [alerta, setAlerta] = useState({})
    const [proyectoId, setProyectoId] = useState({})
    const [cargando, setCargando] = useState(false)

    const [colaborador, setColaborador] = useState({})
    // const [ eliminarColaborador, setEliminarColaborador] = useState({})

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})// despues de 1 segundos se reinicia la alerta a un objeto vacio
        }, 1500)
    }

 

    useEffect(() => {
        const listarProyectos = async () => {

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return console.log('no hay token')
                }
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const URL = `/proyectos`;
                const { data } = await clienteAxios(URL, config)
                setProyectos(data.proyectos)
                setTimeout(()=>{
                    setAlerta({})
                },2000)

            } catch (error) {
                             
                setAlerta({
                    msg: error.response.data,
                    error: true
                })
               
                console.log('hubo un error', error)
                console.log(error.response.data)
            }
        }
        listarProyectos()

    }, [auth])// en el array vacio se coloca state que se espera que cambie
    //

///?? sokect io
    useEffect(()=>{
      
   
        socket = io(import.meta.env.VITE_BACKEND_URL);// me conecto al servidor
       // socket.emit('abrir proyecto', id);// le digo enque proyecto estoy
        
      },[])

    const submitProyecto = async (proyecto) => {
        console.log(proyecto.id)
        if (proyecto.id) {
            await editarProyecto(proyecto)
            //navigate('/proyectos')   
        } else {
            await guardarProyecto(proyecto)
            //navigate('/proyectos')   
        }

    }

    const guardarProyecto = async (proyecto) => {
        console.log('Guardando proyecto....')
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const URL = `/proyectos`;
            const { data } = await clienteAxios.post(URL, proyecto, config)// 1-URL , 2- datos, 3-configiracion
            setProyectos([...proyectos, data]) // crea un copia del proyecto de la BD y la reescribe

            setAlerta({
                msg: 'datos guardados correctamente',
                error: false
            })
            navigate('/proyectos')
          
        } catch (error) {
            console.log(error)
            setAlerta({
                msg: error.response.data.mensage,
                error: true
            })
        }
    }
    const editarProyecto = async (proyecto) => {
        try {
            console.log('proyecto edit => ', proyecto)
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const URL = `/proyectos/${proyecto.id}`;
            const { data } = await clienteAxios.put(URL, proyecto, config)// 1-URL , 2- datos, 3-configiracion

            // sincronisado el state //? proyectoState:es la lista de proyectos que estan  en memoria del state  
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id == data.proyectoActualizado._id ? data.proyectoActualizado : proyectoState);
            setProyectos(proyectosActualizados);
            setAlerta({
                msg: 'El Proyecto se Actualizo ! correctamente',
                error: false
            })

            setTimeout(() => {
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

    const obtenerproyectoId = async (id) => { // pasamos el Id como parametro


        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return console.log('no hay token')
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const URL = `/proyectos/${id}`;
            const { data } = await clienteAxios(URL, config) // 1-URL , 2- datos, 3-configiracion
            setProyectoId(data.proyecto)
            setAlerta({

            })

        } catch (error) {
            navigate('/proyectos')
            setProyectoId({})
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(()=>{
              
                setAlerta({
                  
                })
            },2000)
    
        }



    }

    const eliminarProyecto = async (id) => {
        console.log('proyecto con id: ', id, ' eliminado')

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return console.log('no hay token')
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const URL = `/proyectos/${id}`;
            const { data } = await clienteAxios.delete(URL, config) // 1-URL , 2- datos, 3-configiracion
            console.log(data)
            // sincronizando el state proyectos
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados)
            //Fin sincronizando el state proyectos
            setAlerta({
                msg: 'El Proyecto se ELIMINO! correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
                setCargando(false)
            }, 1000)
        } catch (error) {
            console.log(error.response.data.msg.message)
        }


    }
    //? Tareas

    const submitTarea = async (tarea) => {
       
        if (tarea.id) {
            await updateTarea(tarea);
            // console.log('editar TareaID =>', tarea.id)
            //   await  editarTarea(tarea)
            //navigate('/proyectos')   
        } else {
            await guardarTarea(tarea);
            // console.log('Guardar.. Tarea=>', tarea)
            //   await  guardarTarea(tarea)
            //navigate('/proyectos')   
        }

    }
    const editarTarea = async (tarea) => {

        setTarea(tarea)
    }

    const updateTarea = async (tarea) => {
        try {
            console.log('tarea edit => ', tarea)
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const URL = `/tareas/${tarea.id}`;
            const { data } = await clienteAxios.put(URL, tarea, config)// 1-URL , 2- datos, 3-configiracion
           
            // SOCKET IO
             socket.emit('editar tarea', data.tareaActualizada)

            setAlerta({
                msg: 'El Proyecto se Actualizo ! correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                //  navigate('/proyectos')


            }, 1000)
        } catch (error) {
            console.log(error)
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const guardarTarea = async (tarea) => {

       
        // console.log('Guardando tarea....')
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const URL = `/tareas`;
            const { data } = await clienteAxios.post(URL, tarea, config)// 1-URL , 2- datos, 3-configiracion
          
            setAlerta({
                msg: 'datos guardados correctamente',
                error: false
            })

            // soket.io
            socket.emit('nueva tarea', data.tareaGuardada)
            // setTimeout(() => {
            //     setAlerta({})
            //     navigate('/proyectos')
            // }, 1000)
        } catch (error) {
            console.log(error)
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const eliminarTarea = async (tarea) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return console.log('no hay token')
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const URL = `/tareas/${tarea._id}`;

            const { data } = await clienteAxios.delete(URL, config) // 1-URL , 2- datos, 3-configiracion
            // console.log(data.tarea._id)
            // sincronizando el state proyectos

            // const proyectoIdActualizado = { ...proyectoId };
            // proyectoIdActualizado.tareas = proyectoIdActualizado.tareas.filter(tareaState =>
            //     tareaState._id != data.tarea._id)
            // // const result = words.filter(word => word != 'spray');
            // setProyectoId(proyectoIdActualizado)


            //  setTareas(tareasActualizadas)

            //Fin sincronizando el state proyectos


            // socket.IO

            socket.emit('eliminar tarea', tarea);

            setAlerta({
                msg: 'El Proyecto se ELIMINO! correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                //   navigate(`/proyectos/${tarea._id}`)

            }, 10)
        } catch (error) {
            console.log(error.response.data.msg)
        }
        setCargando(false)

    }

   

    const modalDeleteTarea = async (tarea) => {
        console.log('tareaModal', tarea)
        setTarea(tarea)

    }

 const cambiarEstadoTareas = async (id) => {

  const estadoTarea= proyectoId.tareas[0].estado;

  const cambio =confirm( !estadoTarea ?
                          'Deseas Completar la tarea' : 
                          'Deseas Volver a hacer la Tarea' );
      
      if(!cambio){
        return  console.log('rechazaste la funcion', cambio)
      }
     
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return console.log('no hay token')
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const URL = `/tareas/estado/${id}`;
          
            const { data } = await clienteAxios.post(URL, {}, config); // 1-URL , 2- datos, 3-configiracion

                // SOCKET
                socket.emit('cambiar estado', data.tareaCompletada )

            setTarea({})
        } catch (error) {
            console.log(error.response.data.msg)
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
        setCargando(false)

    }


    const limpiarTarea = () => {
        setTarea({})
        console.log('limpiando tarea')

    }
    // colaboradorres

    const submitColaborador = async (email) => {
        console.log('email __-->> ', email);
        setCargando(true)

        try {

            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const URL = `/proyectos/colaborador`;
            const { data } = await clienteAxios.post(URL, { email }, config)

            setColaborador(data)

        } catch (error) {
            console.log(error.response.data.msg)
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 2000)
        } finally {

            setCargando(false)
        }


    }

    const agregarColaborador = async email => {
        // console.log('agregar colaborador...', email)
       
        try {

            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const URL = `/proyectos/colaborador/${proyectoId._id}`;
            const { data } = await clienteAxios.post(URL, email, config)
            console.log(data.proyecto)

            //SOCKET
            socket.emit('agregar colaborador', data.proyecto)

            setAlerta({
                msg: data.msg,
                error: false
            })
            setColaborador({})
            setTimeout(() => {
                navigate(`/proyectos/${proyectoId._id}`)
                setAlerta({})
            }, 500)
        } catch (error) {
            console.log(error.response.data.msg);
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 2000)

        }
    }

    const saveColaborador = (req, res) => {
        console.log();
    }
    const datosModalEliminar = (colaborador) => {
        console.log('datosModalEliminar-->')
        setColaborador(colaborador)
    }

    const delColaborador = async (colaborador) => {
        console.log('dete colaborador provider -->', colaborador)
        setColaborador(colaborador)

        console.log(proyectoId)
        try {

            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const URL = `/proyectos/eliminar-colaborador/${proyectoId._id}`;
            const { data } = await clienteAxios.post(URL, { idColaborador: colaborador._id }, config)

            const proyectoActualizado = { ...proyectoId }
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)
            setProyectoId(proyectoActualizado)
            console.log('data -->> ', data.proyecto)
            //   setProyectoId(data.proyecto)

            setAlerta({
                msg: data.msg,
                error: false
            })
            setColaborador({})
            setTimeout(() => {
                setAlerta({})
            }, 2000)
        } catch (error) {
            console.log(error.response.data.msg);
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 2000)

        }

    }


        // buscarproyecots
        const buscadorDeProyectos=(id)=>{
           
                navigate(`/proyectos/${id}`) 
        }
   
//?Funciones para  SOCKET IO

const submitTareasproyecto = (tarea) =>{
    
   const proyectoActualizado = { ...proyectoId }; // creamos una copia
   proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea] // actulizamos el state
   setProyectoId(proyectoActualizado)
}

const eliminarTareaProyecto =(tarea)=>{

     const proyectoIdActualizado = { ...proyectoId };
            proyectoIdActualizado.tareas = proyectoIdActualizado.tareas.filter(tareaState =>
                tareaState._id != tarea._id)
            // const result = words.filter(word => word != 'spray');
            setProyectoId(proyectoIdActualizado)

}

const  editarTareaProyecto =(tarea)=>{
    console.log('-->', tarea)
    const proyectoActualizado = { ...proyectoId }
    proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState =>
    tareaState._id === tarea._id ? tarea : tareaState )

     setProyectoId(proyectoActualizado);
}

const  cambioEstadoTareaProyecto =(tarea)=>{
  //  sincronizando el state proyectos
            //?compara tareaState._id con data.tarea._id si es igual develeve data.tarea si no es igual mantiene tareaState 
            const proyectoIdActualizado = { ...proyectoId };
            proyectoIdActualizado.tareas = proyectoIdActualizado.tareas.map(
                tareaState => tareaState._id == tarea._id ? tarea : tareaState);
            setProyectoId(proyectoIdActualizado)

}

const  addColaboradorProyectos = (proyecto)=>{

    console.log('proyecto actualizado -> ', proyecto)

    const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id == proyecto._id ? proyecto : proyectoState);
    setProyectos(proyectosActualizados);
}

/// cerrar sesion 
const cerrarSesionProyectos = ()=>{
    setProyectoId({})
    setProyectos({})
    setAlerta({})
}

    return (
        <ProyectosContext.Provider
            value={{

                cargando,
                alerta,
                buscadorDeProyectos,
                mostrarAlerta,
                submitProyecto,
                obtenerproyectoId,
                eliminarProyecto,
                submitColaborador,
                agregarColaborador,
                datosModalEliminar,
                delColaborador,
                colaborador,
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
                cambiarEstadoTareas,
                // Funciones para Socket Io(crud real time)
                submitTareasproyecto,
                eliminarTareaProyecto,
                editarTareaProyecto,
                cambioEstadoTareaProyecto,
                addColaboradorProyectos,
                // cerrar sesion
                cerrarSesionProyectos
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