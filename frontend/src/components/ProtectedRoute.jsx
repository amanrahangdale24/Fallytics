import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import LoaderPage from "./Loader";

export const ProtectedRoute = ({children})=>{
    const {isAuthChecking, authUser} = useAuthStore(); 
    if(isAuthChecking){
        return <LoaderPage/>
    }
    if(!authUser){
        return <Navigate to="/login" replace />;
    }
    return children; 
}