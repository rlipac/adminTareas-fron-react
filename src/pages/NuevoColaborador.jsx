// dependecias
import { useEffect } from "react"
import { useParams } from "react-router-dom"

// components

import FormularioColaborador from "../components/FormularioColaborador"
import Cargando from '../components/Cargando'
// hooks
import useProyectos from "../hooks/useProyectos"


const NuevoColaborador = () => {
    const params = useParams()

    const { obtenerproyectoId, proyectoId, cargando, colaborador, agregarColaborador } = useProyectos();

    useEffect(() => {

        obtenerproyectoId(params.id)

    }, [])

    return (
        <>
            
                    <p className="text-xl mb-5 font-bold text-gray-400 uppercase">Proyecto:{' ' + proyectoId.nombre}</p>
                    <h1 className="text-4xl font-black">Añadir Colaborador(a) </h1>
                    <div className="mt-10 flex justify-center">
                        <FormularioColaborador />
                    </div>
                
            { cargando
                ?
                <Cargando />

                : colaborador?._id && (
                    <div className="flex justify-center mt-10">
                        <div className="bg-white py-10 px-5 md:w-full lg:w-1/2 rounded-lg shadow ">
                          
                            <h2 className="text-center mb-10 text-2xl font-bold"> Resultado</h2>
                            <div className="flex justify-between items-center">
                                <p>nombre:{colaborador.nombre}</p>
                                <button
                                    onClick={()=>  agregarColaborador({ email: colaborador.email})}
                                    className="bg-slate-500 px-5 py-2 rounded-lg uppercase
                                    text-white font-bold text-sm"
                                >Agregar al Proyecto</button>
                            </div>
                           
                        </div>
                       
                     </div>
                )
               
                   
             }

       


        </>
    )
}

export default NuevoColaborador