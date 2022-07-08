import { Link } from "react-router-dom";


import  {useEffect, useState } from 'react'
// helpers
import formatearFecha  from "../helpers/formatearFecha";

import useProyectos from '../hooks/useProyectos';
// componet 
import ModalEliminarTarea from "./ModalEliminarTarea";

const Tarea = ({tarea}) => {
    const {_id,nombre, prioridad, fechaEntrega, descripcion, estado} = tarea;

    const {  alerta, mostrarAlerta,  editarTarea, modalDeleteTarea,  cambiarEstadoTareas } = useProyectos();
    
  // const handleButon = (id)=>{
  //   console.log('tarea_id => ', id);
   
  //   cambiarEstado(tarea, id);
  // }

//   const capturarId = (id)=>{
//     const tareaId = document.getElementById("idTarea").value;
//     console.log('catrurarUId', tareaId)
//     obtenerTarea(tareaId);
// }

 

    return (
      <div className="border-l my-2 border-b rounded-lg p-5 flex justify-between">
        <div>
          <p className="mb-1 text-xl">Nombre: {nombre}</p>
          <p className="mb-1 text-sm text-gray-600 uppercase">Descripcion: {descripcion}</p>
          <p className="mb-1 text-md capitalize">Fecha Entrega: {formatearFecha(fechaEntrega)} </p>
          <p className="mb-1 text-gray-600 ">Prioridad: {prioridad}</p>
        </div>
        
        <div>

          <button
            className="bg-indigo-600 mx-1 px-4 py-3 font-bold text-white uppercase rounded-md"
            data-bs-toggle="modal"
            data-bs-target="#modalForm"
            onClick={()=> editarTarea(tarea)}
            
          >
           
             Editar
          </button>
          <input type="text" name="tarea" hidden id="idTarea" value={_id} readOnly />
        
          {
            estado ? (
              <button
              className="bg-sky-600 mx-1 px-4 py-3 font-bold text-white uppercase rounded-md"
            >
                Completa
            </button>
            ):(

              

                <button
                className="bg-gray-600 mx-1 px-4 py-3 font-bold text-white uppercase rounded-md"
                 onClick={ ()=> cambiarEstadoTareas(tarea)}
                >
                  Inconpleta
              </button>    
            )
          }    
          <button
         
            onClick={()=> modalDeleteTarea(tarea)}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            className="bg-red-600 mx-1 px-4 py-3 font-bold text-white uppercase rounded-md"
          >
             Eliminar
          </button>
          
        </div>
        
        
        
      </div>
    )
}

export default Tarea