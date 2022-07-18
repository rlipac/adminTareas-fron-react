import { Link } from "react-router-dom";


import { useEffect, useState } from 'react'
// helpers
import formatearFecha from "../helpers/formatearFecha";

import useProyectos from '../hooks/useProyectos';
// componet 
import ModalEliminarTarea from "./ModalEliminarTarea";


// hoocks
import useAdmin from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {

  // hoock para comprobar si es creador o admin del proyecto

  const admin = useAdmin()
 
  const { _id, nombre, prioridad, fechaEntrega, descripcion, estado  } = tarea;

  const { alerta, mostrarAlerta, editarTarea, modalDeleteTarea, cambiarEstadoTareas } = useProyectos();

  return (
    <div className="border-l my-2 border-b rounded-lg p-5 flex justify-between items-center ">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">Nombre: {nombre}</p>
        <p className="mb-1 text-sm text-gray-600 uppercase">Descripcion: {descripcion}</p>
        <p className="mb-1 text-md capitalize">Fecha Entrega: {formatearFecha(fechaEntrega)} </p>
        <p className="mb-1 text-gray-600 ">Prioridad: {prioridad}</p>
        { estado && <p className="text-xs text-white uppercase px-2 py-1 rounded-lg bg-green-500 ">Completado por: {tarea.completado.nombre}</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        {admin && (
          <button
            className="bg-indigo-600 mx-1 px-4 py-3 font-bold text-white uppercase rounded-md"
            data-bs-toggle="modal"
            data-bs-target="#modalForm"
            onClick={() => editarTarea(tarea)}

          >

            Editar
          </button>
        )}



        {/* <input type="text" name="tarea" hidden id="idTarea" value={_id} readOnly /> */}

     

            <button
              className={` ${estado ? 'bg-sky-600': 'bg-gray-600'} 
              mx-1 px-4 py-3 font-bold text-white uppercase rounded-md`}
              onClick={() => cambiarEstadoTareas(_id)}
            >
              { estado ? 'Completa': 'Inconpleta'}
            </button>
      
        {admin && (
          <button

            onClick={() => modalDeleteTarea(tarea)}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            className="bg-red-600 mx-1 px-4 py-3 font-bold text-white uppercase rounded-md"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  )
}

export default Tarea