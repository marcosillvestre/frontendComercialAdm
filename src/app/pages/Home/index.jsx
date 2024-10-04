import { useLocation } from 'react-router-dom';
import { paths } from '../../constants/paths.js';
import { Control, Login } from '../source.jsx';


export const Home = () => {
    const location = useLocation()

    const { home, control } = paths

    if (location.pathname === home.path) {
        return (
            <Login />
        )
    }


    if (location.pathname === control.path) {
        return (
            <Control />

        )
    }
}
