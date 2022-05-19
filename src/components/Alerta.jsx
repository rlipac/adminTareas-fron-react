import React from 'react'
import { Link } from 'react-router-dom'

const Alerta = ({ alerta }) => {
    return (
        <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-sky-500 to-sky-700'} 
    bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10 `}
        > 
        <Link 
            to="/"
          >
               {alerta.msg}
          </Link>
       
        </div>
    )
}

export default Alerta