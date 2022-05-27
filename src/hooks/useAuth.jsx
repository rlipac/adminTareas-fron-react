import { useContext } from "react";

import AuthContext from "../context/AuthProvider";


const useAuth = () => {
 return useContext(AuthContext); // le pasamos el context 

}

export default useAuth;