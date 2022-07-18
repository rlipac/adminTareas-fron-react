import { useEffect, useState, Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'

// hoocks
import useProyectos from '../hooks/useProyectos'
// components

import Alerta from '../components/Alerta'
const ModalEliminarColaborador = () => {
    const { delColaborador, colaborador } = useProyectos()

  const handleColaborador= async()=>{
     await delColaborador(colaborador)
  }
    return (

        <Fragment>
    
          <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog relative w-auto pointer-events-none">
              <div
                className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div
                  className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                  <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">
                    Desea Eliminar Colaborador ?
                  </h5>
                  <button type="button"
                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body relative p-4">
                     {/* contenido del modal  */}
                </div>
                <div
                  className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                  <button type="button"
                    className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                    data-bs-dismiss="modal">Close</button>
                  <button type="button"
                    data-bs-dismiss="modal"
                    onClick={handleColaborador}
                    className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs 
                    leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg 
                    focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 
                    active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                  >Eliminar Colaborador</button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
    
      )
}

export default ModalEliminarColaborador


