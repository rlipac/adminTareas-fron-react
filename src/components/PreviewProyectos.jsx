import React from 'react'

const PreviewProyectos = ({proyecto}) => {
    const {nombre,descripcion, fechaEntrega, createdAt} = proyecto;

  return (
    <div>
        <p>Nombre:{nombre}</p>
        <p>Descrippcion:{descripcion}</p>
        <p>Fecha de Entrega: {fechaEntrega}</p>
        <p>Fecha de creacion{createdAt}</p>   
    </div>
  )
}

export default PreviewProyectos