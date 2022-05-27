import axios from "axios";

const miUrl = import.meta.env.VITE_BACKEND_URL;

const clienteAxios = axios.create({
    baseURL:`${miUrl}/API`
    
})

export default clienteAxios;