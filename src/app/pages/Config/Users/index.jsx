


import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Link } from 'react-router-dom';
import UsersTable from '../../../../components/tables/tableUsers/index.jsx';
import { useUser } from '../../../../hooks/userContext.jsx';
import { useUsers } from '../../../../hooks/users/usersContext.hook.jsx';
import { Container, Header } from './styles.jsx';


export function Register() {
  const { setOpenSidebar, setTypeSidebar, } = useUser()

  const { setEditUser } = useUsers()


  const handleDrawerOpen = () => {
    setOpenSidebar(true);
    setTypeSidebar(3)
    setEditUser(null)
  };

  return (

    <Container>

      <nav>
        <span>
          <Link
            to="/config"
          >
            <ArrowUpwardIcon />
          </Link>
          <h3>Configurações - Painel de usuários</h3>
        </span>

        <button
          className='openDrawer defaultButton blueButton'

          onClick={() => handleDrawerOpen()}
        >
          Novo usuário
        </button>


      </nav>

      <Header />

      <UsersTable />

    </Container>

  );
}

