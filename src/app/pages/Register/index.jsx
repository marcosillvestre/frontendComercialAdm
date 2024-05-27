
import { TableBody } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import { Row } from '../../../components/source.jsx';
import { useUser } from '../../../hooks/userContext';
import { useUsers } from '../../../hooks/users/usersContext.hook.jsx';
import { Container, Header, Tax, UserContainer } from './styles';


export function Register() {
  const { setOpenSidebar, setTypeSidebar, } = useUser()

  const { UsersQuery } = useUsers()


  const handleDrawerOpen = () => {
    setOpenSidebar(true);
    setTypeSidebar(3)
  };

  return (

    <Container>

      <Header>

        <nav>
          <div>

            <h1>Configurações</h1>
            <h2>Painel de usuários</h2>
          </div>

          <div>
            Usuários ativos
            <Tax>
              {UsersQuery.data && UsersQuery.data.length}
            </Tax>
          </div>
        </nav>

      </Header>


      <UserContainer>

        <button
          className='openDrawer'
          onClick={() => handleDrawerOpen()}
        >
          Novo usuário
        </button>

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="center">Email</TableCell>
                {/* <TableCell style={{ fontWeight: 'bold' }} align="center">Status</TableCell> */}
                <TableCell style={{ fontWeight: 'bold' }} align="left">Unidade</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="center">Cargo</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="center">Acesso</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {
                UsersQuery.data && UsersQuery.data.map((row) => (
                  <Row key={row.id} row={row} />
                ))
              }

            </TableBody>
          </Table>
        </TableContainer>
      </UserContainer>




    </Container>

  );
}

