import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
// dependecias
import DatePicker from 'react-datepicker'

import useProyectos from '../hooks/useProyectos';
import Alerta from './Alerta';


const FormularioTareas = () => {

    const OPCIONES = [
        { id: 1, prioridad: "Baja" },
        { id: 2, prioridad: "Media" },
        { id: 3, prioridad: "Alta" }
    ]

    const params = useParams(); // obtenemoms los parametros de la ruta

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState(new Date());
    const [estado, setEstado] = useState(false);
    const [prioridad, setPrioridad] = useState('false');
    //
    const [proyecto, setProyecto] = useState(params.id);// id de proyecto al quue le pertenece esta tarea

    // ? mandamos al editar tarea

    // props del provider
    const { alerta, mostrarAlerta, submitTarea, tarea, proyectoId, guardarTarea } = useProyectos(); // proyectoID objeto del la funcion proyectoId del provider


    const [id, setId] = useState(null)

    const resetInputs = () => {
        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setPrioridad('')
    }
    useEffect(() => {
        if (tarea._id) {
            setId(tarea._id)
            setNombre(tarea.nombre)
            setDescripcion(tarea.descripcion)
            setFechaEntrega(tarea.fechaEntrega?.split('T')[0])// corta el array y develve la fecha
            setPrioridad(tarea.prioridad)
            setEstado(tarea.estado)
        } else {
            resetInputs();
        }

    }, [tarea]);

    //Pasar los datos del proyecto al Provider para que lo guarde en la BD

    const handleSutmit = async (e) => {
        e.preventDefault();

        try {
            if ([nombre, descripcion, fechaEntrega, prioridad, proyecto].includes('')) {
                const error = new Error("todos los campos son obligatorios")
                console.log(' tods los campos son obligatorios ==>')
                mostrarAlerta({
                    msg: error.message,
                    error: true
                })
                return
            }

            await submitTarea({ id, nombre, descripcion, estado, fechaEntrega, prioridad, proyecto })
            resetInputs()
        } catch (error) {
            mostrarAlerta({
                msg: error.response.data.msg,
                error: true
            })
            resetInputs()
        }
    }

    const { msg } = alerta;


    return (
        <form className='bg-white py-10 px-5 w-full rounded-lg' onSubmit={handleSutmit}>
            {msg && <Alerta alerta={alerta} />}
            <div className='mb-5'>
                <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='nombre'>
                    Nombre del Tarea:
                </label>
                <input
                    id='nombre'
                    type='text'
                    placeholder='Nombre del Proyecto'
                    className='border w-full p-2 mt-2 placeholder-gray-400'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='descripcion'>
                    Descripcion:
                </label>
                <textarea
                    id='descripcion'
                    placeholder='descripcion del Proyecto'
                    className='border w-full p-2 mt-2 placeholder-gray-400'
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                ></textarea>


            </div>
            <div className='mb-5'>
                <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='prioridad'>
                    Prioridad:
                </label>
                <select
                    onChange={e => setPrioridad(e.target.value)}
                    className='border w-full p-2 mt-2 '
                    value={prioridad}
                >
                    <option>--Selecionar-- </option>
                    <option value="">-- Seleccionar Marca --</option>
                    {OPCIONES.map(opcion => (
                        <option

                            key={opcion.id}
                            value={opcion.prioridad}
                        >{opcion.prioridad}</option>
                    ))}
                </select>

            </div>
            <div className='mb-5'>
                <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='fechaEntrega'>
                    Fecha de entrega del Tarea:
                </label>

                {/* <DatePicker selected={fechaEntrega} onChange={(date) => setFechaEntrega(date)} /> */}
                <input

                    id='fechaEntrega'
                    type='date'
                    placeholder='fechaEntrega del Proyecto'
                    className='border w-full p-2 mt-2 placeholder-gray-400'
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                />

            </div>

            <button
                id="botonTareas"
                data-bs-dismiss="modal"
                type='submit'
                className='bg-blue-600 text-center uppercase  text-white rounded-md p-2 w-full cursor-pointer hover:bg-blue-700 transition-colors'
            >

                {id ? `Actualizar Tarea` : 'Crear Tarea'}

            </button>


        </form>
    )
}

export default FormularioTareas