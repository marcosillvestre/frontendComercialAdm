import { useLocation } from 'react-router-dom';
import { Control } from "../Control";
import Login from '../Login';


const Home = () => {
    const location = useLocation()

    return (
        <>
            {location.pathname === '/' && <Login />}
            {location.pathname === 'controle-comercial' && <Control />}
        </>
    )
}

export default Home