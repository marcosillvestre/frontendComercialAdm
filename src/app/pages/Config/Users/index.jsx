


import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Link } from 'react-router-dom';
import { UsersMoreFilters } from '../../../../components/multiFilters/moreFilters.users/index.jsx';
import UsersTable from '../../../../components/tables/tableUsers/index.jsx';
import { useUser } from '../../../../hooks/userContext.jsx';
import { useUsers } from '../../../../hooks/users/usersContext.hook.jsx';
import { Container, Header } from './styles.jsx';


export function Register() {
  const { setOpenSidebar, setTypeSidebar, } = useUser()

  const { setEditUser, typeFilter, setTypeFilter } = useUsers()


  const handleDrawerOpen = () => {
    setOpenSidebar(true);
    setTypeSidebar(3)
    setEditUser(null)
  };

  const handleResetFilter = () => {
    setTypeFilter([])
  }

  return (

    <Container>

      <nav className='nav'>
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

      <Header>
        <nav>


          <UsersMoreFilters />
          {
            typeFilter?.length > 0 &&
            <div>
              <button
                className='defaultButton redButton'
                onClick={() => handleResetFilter()}
              >
                Limpar filtros
              </button>
            </div>
          }

        </nav>
      </Header>

      <UsersTable />

    </Container>

  );
}

