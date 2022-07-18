import useProyectos from "./useProyectos"
import useAuth from "./useAuth"

const useAdmin = () => {
 const { proyectoId } = useProyectos();
 const { auth } = useAuth();

 return proyectoId.creador === auth._id
}

export default useAdmin