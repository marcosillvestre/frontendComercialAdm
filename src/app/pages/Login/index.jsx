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
import { paths } from '../../constants/paths';
import URI from '../../utils/utils';
import { Box, Container, ErrorMessage, Header, Input, Powered, Submit } from './styles';

export const Login = () => {
    const [open, setOpen] = React.useState(true)

    const { putInfo } = useUser();

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

                setTimeout(() => {
                    window.location.href = paths.control.path
                }, 500)
            }
        })
    }



    return (
        <>
            <Header >
                <img src={aw} alt="American way image" />
            </Header>
            <Container>

                <div className='mainbox'>

                    <div className="hero">
                        <div className="hero-inner">
                            <h2>Sua Gestão começa aqui</h2>
                        </div>
                    </div>

                    <form
                        method='post'
                        onSubmit={handleSubmit((data) => Sender(data))}
                    >
                        <Box htmlFor="email">
                            <Input
                                autoComplete="username"
                                type='email'
                                required
                                placeholder=' '
                                name='email'
                                {...register('email')}
                            />
                            <label>email</label>
                            {errors.email && <ErrorMessage>Email é obrigatório.</ErrorMessage>}
                        </Box>

                        <Box htmlFor="password">
                            <div>
                                {open ? <Input
                                    autoComplete="current-password"
                                    type="password"
                                    required
                                    placeholder=' '
                                    name='password'
                                    className={open ? "" : "show-password"}
                                    {...register('password')}
                                /> :
                                    <Input
                                        autoComplete="current-password"
                                        type="text"
                                        required
                                        placeholder=' '
                                        name='password'
                                        className={open ? "" : "show-password"}
                                        {...register('password')}
                                    />}
                                <label>senha</label>

                                {errors.password && <ErrorMessage>Senha é obrigatória.</ErrorMessage>}
                                <div onClick={() => setOpen(!open)} >{open ? <VisibilityIcon /> : <VisibilityOffIcon />}</div>
                            </div>
                        </Box>
                        <Box><Submit className='defaultButton blueButton' type="submit" >Login</Submit></Box>
                        <Box><a href={paths.redefinePass.path}>Esqueceu a senha?</a></Box>

                    </form>

                </div >

            </Container>

            <Powered>
                powered by
                <a href='https://github.com/marcosillvestre'>
                    marcosillvestre</a>
            </Powered>
        </>
    );
}
