import { useLocation } from 'react-router-dom';
import { paths } from '../../constants/paths.js';
import { Control, Login } from '../source.jsx';


export const Home = () => {
    const location = useLocation()

    return (
        <>
            {location.pathname === paths.home && <Login />}
            {location.pathname === paths.control && <Control />}
        </>
    )
}
