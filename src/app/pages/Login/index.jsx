import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import aw from '../../../assets/aw.png';
import projects from '../../../assets/und.svg';
import { useUser } from '../../../hooks/userContext';
import URI from '../../utils/utils';
import { Box, Container, ErrorMessage, Header, Input, Submit } from './styles';


export const Login = () => {
    const [open, setOpen] = React.useState(true)

    const { putInfo } = useUser()
    const schema = Yup.object({
        email: Yup.string().required(),
        password: Yup.string().required(),
    })


    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    async function Sender(body) {
        await toast.promise(
            URI.post('/login', {
                email: body.email,
                password: body.password
            }),
            {
                pending: 'Conferindo os dados',
                success: 'Login efetuado com sucesso',
                error: 'Alguma coisa deu errado, confira seus dados'
            }
        ).then(async res => {
            if (res.status === 200) {
                putInfo(res.data)
                window.location.href = "/controle-comercial"
            }
        })
    }



    return (
        <>
            <Header >
                <img src={aw} alt="American way image" />
            </Header>
            <Container>
                <span>
                    <div className='intituitional'>
                        <h1>SCCM</h1>
                        <p>
                            Este é um sistema voltado para gestão de matrículas e finanças para empresas.
                            Confie em nós para simplificar o processo e otimizar o sucesso de sua organização.
                            Junte-se a nós para simplificar e aprimorar a gestão administrativa.</p>

                        <img src={projects} alt="many-projects-handle" />
                    </div >


                    <div className='pwb'>
                        powered by
                        <a href='https://github.com/marcosillvestre'>
                            marcosillvestre</a>
                    </div>
                </span>
                <div className='mainbox'>
                    <form onSubmit={handleSubmit((data) => Sender(data))}>
                        <h2>Controle Comercial</h2>

                        <Box htmlFor="email">
                            <h5>Email:</h5>
                            <Input {...register('email', { required: true })} />
                            {errors.email && <ErrorMessage>Email is required.</ErrorMessage>}
                        </Box>

                        <Box htmlFor="password">
                            <h5>Password:</h5>
                            <div>
                                <Input type={open ? "password" : "text"} {...register('password', { required: true })} />
                                {errors.password && <ErrorMessage>Password is required.</ErrorMessage>}
                                <div onClick={() => setOpen(!open)} >{open ? <VisibilityIcon /> : <VisibilityOffIcon />}</div>
                            </div>
                            <a href="/redefinir-senha">Esqueceu a senha ? Clique aqui</a>
                        </Box>

                        <Submit type="submit" />

                    </form>

                </div >


            </Container>
        </>
    );
}
