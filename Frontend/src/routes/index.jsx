import { useRoutes } from "react-router-dom";
import mainRoutes from "./routes";


export default function Routes(){
    const Routing = useRoutes(mainRoutes)
    return <>{Routing}</>

}