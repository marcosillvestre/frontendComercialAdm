import { yupResolver } from '@hookform/resolvers/yup';

import { TableBody } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Row } from '../../../components/source.jsx';
import { useUser } from '../../../hooks/userContext';
import URI from '../../utils/utils';

import { Anchor, Box, Container, ErrorMessage, Header, Input, MultiOption, RegisterContainer, Selected, Selects, Submit, Tax, UserContainer } from './styles';


export function Register() {
  const [unity, setUnity] = useState([])
  const { headers, users, userData } = useUser()

  const url = useLocation()

  const schema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    admin: Yup.bool(),
    role: Yup.string().required(),
    passwordConfirm: Yup
      .string()
      .required('A senha é obrigatória')
      .oneOf([Yup.ref('password')], 'As duas senhas devem ser iguais'),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  async function Sender(body) {
    const person = {
      name: body.name,
      email: body.email,
      password: body.password,
      admin: body.admin,
      role: body.role,
      unity: unity.length < 1 ? ["Todas"] : unity,
      responsible: userData
    }
    await toast.promise(
      URI.post('/cadastro', person, { headers }),
      {
        pending: 'Conferindo os dados',
        success: 'Cadastro efetuado com sucesso',
        error: 'Alguma coisa deu errado, confira seus dados'
      }
    )
  }

  const choosingUnity = (e) => {
    if (!(unity.map(res => res === e).includes(true))) {
      if (e !== 'Todas') {
        setUnity(res => [...res, e])
      } else {
        setUnity(unity?.filter(r => r === e))
      }

    }
  }

  const deleteUnity = (e) => {
    if (unity.length === 1) {
      unity.shift()
    }
    setUnity(unity?.filter(res => res !== e))
  }

  const allUnities = [
    { id: 0, value: "" },
    { id: 1, value: "Todas" },
    { id: 2, value: "PTB" },
    { id: 3, value: "Centro" }
  ]

  return (

    <Container>

      <Header>
        <nav>
          <Anchor href="/cadastro" active={url.pathname === "/cadastro"}> Criar novo usuário</Anchor>
          <Anchor href="/cadastro/lista" active={url.pathname === "/cadastro/lista"}> Listar usuários</Anchor>
        </nav>

        <nav>
          Usuários ativos
          <Tax>
            {users.length}
          </Tax>
        </nav>

      </Header>

      {
        url.pathname === '/cadastro' &&
        <RegisterContainer onSubmit={handleSubmit((data) => Sender(data))}>
          <div className='container1'>

            <Box htmlFor="name">
              <p>Primeiro Nome:</p>
              <Input {...register('name')} />
            </Box>

            <Box htmlFor="email">
              <p>Email:</p>
              <Input {...register('email', { required: true })} />
              {errors.email && <ErrorMessage>Email is required.</ErrorMessage>}
            </Box>

            <Box htmlFor="password">
              <p>Senha:</p>
              <Input type="text" {...register('password', { required: true })} />
              {errors.password && <ErrorMessage>Password is required.</ErrorMessage>}
            </Box>

            <Box htmlFor="passwordConfirm">
              <p>Confirme a Senha:</p>
              <Input type="text" {...register('passwordConfirm', { required: true })} />
              {errors.passwordConfirm && <ErrorMessage>The password must be same.</ErrorMessage>}
            </Box>
          </div>
          <div className='container2'>
            <Box>
              <p>Cargo:</p>
              <Selected {...register("role", { required: true })}>
                <option value=""></option>
                <option value="direcao">Direção</option>
                <option value="comercial">Comercial</option>
                <option value="gerencia">Gerencia</option>
                <option value="administrativo">Administrativo</option>
              </Selected>
            </Box>

            <Box >
              <p>Unidade:</p>
              <Selects onChange={(e) => choosingUnity(e.target.value)} >
                {allUnities.map(res => (
                  <option
                    key={res.id}
                    value={res.value}>
                    {res.value}
                  </option>

                ))
                }
              </Selects>
            </Box>

            <div style={{ display: "flex", flexWrap: "wrap", }}>
              {unity[0] !== 'Todas' && unity.map(res => (
                <MultiOption
                  key={res}
                  onClick={(e) => deleteUnity(e.target.outerText)}>
                  {res}
                </MultiOption>
              ))}
            </div>

            <Box htmlFor="admin">
              <p>Acesso Administrador ? (O padrão é não)</p>
              <input type="radio" value={false} {...register("admin", { required: true })} style={{ marginRight: "2.5rem" }} />
              <input type="radio" value={true}{...register("admin", { required: true })} />
              <div>  <p>não</p> <p>sim</p></div>
            </Box>
          </div>

          <Submit type="submit" />
        </RegisterContainer>
      }

      {
        url.pathname === '/cadastro/lista' &&

        <UserContainer>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} align="center">Email</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} align="left">Unidade</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} align="center">Cargo</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} align="center">Acesso</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {
                  users && users.map((row) => (
                    <Row key={row.id} row={row} />
                  ))
                }

              </TableBody>
            </Table>
          </TableContainer>
        </UserContainer>

      }


    </Container>

  );
}

