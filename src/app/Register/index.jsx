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
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Header from '../../components/header';
import { Row } from '../../components/tableUsers';
import { useUser } from '../../hooks/userContext';
import URI from '../utils/utils';
import { Box, Container, ErrorMessage, Input, MultiOption, Selected, Selects, Submit } from './styles';

function Register() {
  const [unity, setUnity] = useState([])
  const { userData, headers, users } = useUser()

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
      unity: unity
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
    if (unity.map(res => res === e).includes(true)) {
      console.log()
    } else {
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
    <>
      <Container>
        <Header data={userData} />

        <span>
          <div className='box register'>
            <form onSubmit={handleSubmit((data) => Sender(data))}>
              <Box htmlFor="name">
                <p>Primeiro Nome</p>
                <Input {...register('name')} />
              </Box>

              <Box htmlFor="email">
                <p>Email</p>
                <Input {...register('email', { required: true })} />
                {errors.email && <ErrorMessage>Email is required .</ErrorMessage>}
              </Box>

              <Box htmlFor="password">
                <p>Senha</p>
                <Input type="text" {...register('password', { required: true })} />
                {errors.password && <ErrorMessage>Password is required.</ErrorMessage>}
              </Box>

              <Box htmlFor="passwordConfirm">
                <p>Confirme a Senha</p>
                <Input type="text" {...register('passwordConfirm', { required: true })} />
                {errors.passwordConfirm && <ErrorMessage>The password must be same.</ErrorMessage>}
              </Box>

              <Box>
                <p>Cargo</p>
                <Selected {...register("role", { required: true })}>
                  <option value=""></option>
                  <option value="direcao">Direção</option>
                  <option value="comercial">Comercial</option>
                  <option value="gerencia">Gerencia</option>
                  <option value="administrativo">Administrativo</option>
                </Selected>
              </Box>

              <Box >
                <p>Unidade</p>
                <Selects onChange={(e) => choosingUnity(e.target.value)}>
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

                {unity && unity.map(res => (
                  <MultiOption
                    key={res}
                    onClick={(e) => deleteUnity(e.target.outerText)}>
                    {res}
                  </MultiOption>
                ))}

              </div>


              <Box htmlFor="admin">
                <p>Acesso Administrador ?</p>
                <input type="radio" value={true}{...register("admin", { required: true })} style={{ marginRight: "2.2rem" }} />
                <input type="radio" value={false} {...register("admin", { required: true })} />
                <div style={{ display: "flex" }}> <p>sim</p> <p>não</p></div>
              </Box>

              <Submit type="submit" />
            </form>
          </div>

          <div className='box users'>

            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="center">Email</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="right">Unidade</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="right">Cargo</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="right">Acesso</TableCell>
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
          </div>
        </span >


      </Container>
    </>
  );
}


export default Register