
const formatearFecha = fecha => {


    const fechaFormateada = new Date(fecha.split('T')[0].split('-'));  
    const opciones = {
        weekday:'long', 
        year:'numeric',
        month:'long', 
        day:'numeric' 
    }
  
    return fechaFormateada.toLocaleDateString('es-Es', opciones); //? (es-Es) para que sea en español  le pasamos las opciones
    console.log(fechaFormateada);
}

export default formatearFecha;