import { useState, useEffect } from 'react'

//Hooks
import useProyectos from '../hooks/useProyectos'

const ModalBuscador = () => {

    const [busqueda, setBusqueda] = useState('')
    const [proyectoName, setProyectoName] = useState('')


    const { buscadorDeProyectos, proyectos } = useProyectos()
   
    // si busqueda esta vacio: devuelve un arreglo vacio
    // si no filtra proyecto.nombre y compara si algun proyecto incluye la palabra que esta en la busqueda
    const  proyectosFiltrados = busqueda === '' ? [] : proyectos.filter(proyecto =>
        proyecto.nombre.toLowerCase().includes(busqueda.toLocaleLowerCase()))

    
     

    

        const handleBuscar = ()=>{
           
            buscadorDeProyectos(proyectoName)
           
           setBusqueda('');
        }


    return (
        <>



            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="modalBuscador" tabIndex="-1" aria-labelledby="modalBuscador" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-lg relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        {/* <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">


                            <button type="button"
                                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                data-bs-dismiss="modal" aria-label="Close"></button>
                        </div> */}
                        <div className="modal-body relative ">
                            {/* contenido Modal */}
                            <div className="mb-3 w-full">
                         
                                <input
                                    type="text"
                                    name='busqueda'
                                    id='busqueda'
                                    value={busqueda}
                                    onChange={e => setBusqueda(e.target.value)}
                                    className="
                                        form-control block w-full px-3 py-1.5 text-base font-normal
                                        text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                                        rounded transition ease-in-out m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                                    autoComplete='off'
                                  
                                />
                               
                                {proyectosFiltrados.length > 0 && (
                                    <div className="flex justify-center">
                                        
                                        <div className="mb-3 w-full">
                                            <select
                                                onChange={e => setProyectoName(e.target.value)}
                                                value={proyectoName}
                                                type="hidden"
                                                className="form-select appearance-none block w-full
                                                                px-3 py-1.5 text-base font-normal text-gray-700
                                                              bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300
                                                                rounded transition ease-in-out m-0
                                                              focus:text-gray-700 focus:bg-white
                                                                focus:border-blue-600 focus:outline-none"
                                                aria-label=""
                                               
                                                size={proyectosFiltrados.length < 15 ? proyectosFiltrados.length : '10'}
                                               
                                                >
                                                
                                                {proyectosFiltrados.map(proyecto => (                                                   
                                                    <option 
                                                        onClick={handleBuscar}                                              
                                                        className="hover:bg-gray-200 my-1"
                                                        key={proyecto._id}
                                                        value={proyecto._id}
                                                        data-bs-dismiss="modal"
                                                    >{proyecto.nombre}</option>
                                                   
                                                    
                                                ))}

                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}

export default ModalBuscador