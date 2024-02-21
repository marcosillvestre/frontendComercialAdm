import { useLocation } from 'react-router-dom';
import { Control, Login } from '../source.jsx';


export const Home = () => {
    const location = useLocation()

    return (
        <>
            {location.pathname === '/' && <Login />}
            {location.pathname === '/controle-comercial' && <Control />}
        </>
    )
}
