
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import aw from '../../assets/aw.png';
import projects from '../../assets/und2.svg';
import URI from '../utils/utils';
import { Box, Container, ErrorMessage, Header, Input, Submit } from './styles';

function RecoverPassword() {
    const [recCode, setRecCode] = React.useState(false)

    const schema = Yup.object({
        email: Yup.string().required(),
        code: Yup.string(),
        newPassword: Yup.string(),

    })



    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    async function Sender(body) {
        let recover = {
            email: body.email
        }
        let newPassword = {
            email: body.email,
            code: body.code,
            newPassword: body.newPassword
        }
        // axios.post(recCode ? 'http://localhost:7070/nova-senha' : 'http://localhost:7070/redefinir-senha',

        await toast.promise(
            URI.post(recCode ? '/nova-senha' : '/redefinir-senha',
                recCode ? newPassword : recover
            ).then(res => {
                if (res.status === 200) {
                    setRecCode(true)
                    recCode === true ? window.location.href = "/" : ""

                }
            }),
            {
                pending: 'Conferindo os dados',
                success: 'Email de recuperação enviado',
                error: 'Alguma coisa deu errado, confira seus dados'
            }
        )
    }



    return (
        <>
            <Header >
                <img src={aw} alt="American way image" />
            </Header>
            <Container>
                <span>
                    <div>
                        <h1>American Way</h1>
                        <img src={projects} alt="many-projects-handle" />

                    </div>


                    <div className='pwb'>
                        powered by
                        <a href='https://github.com/marcosillvestre'>
                            marcosillvestre</a>
                    </div>
                </span>

                <div className='mainbox'>
                    <form onSubmit={handleSubmit((data) => Sender(data))}>
                        <h2>Recuperação de senha</h2>

                        <Box htmlFor="email">
                            <h5>Email:</h5>
                            <Input {...register('email', { required: true })} />
                            {errors.email && <ErrorMessage>Email is required.</ErrorMessage>}
                        </Box>

                        {
                            recCode ? <Box htmlFor="email">
                                <h5>Código:</h5>
                                <Input {...register('code', { required: true })} />
                                {errors.code && <ErrorMessage>Code is required.</ErrorMessage>}

                                <h5>Nova senha:</h5>
                                <Input {...register('newPassword', { required: true })} />
                                {errors.newPassword && <ErrorMessage>New Password is required.</ErrorMessage>}
                            </Box>
                                : ""

                        }
                        <Submit type="submit" />
                    </form>
                </div >


            </Container>
        </>
    );
}

export default RecoverPassword