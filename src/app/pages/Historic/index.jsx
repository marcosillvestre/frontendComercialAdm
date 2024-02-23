// import React from 'react';

import { useQuery } from '@tanstack/react-query';
import LoadingSpin from 'react-loading-spin';
import { useUser } from '../../../hooks/userContext';
import URI from '../../utils/utils';
import { Container } from './styles';



export const Historic = () => {

    const { headers } = useUser()
    const { data, refetch, isPending } = useQuery({
        queryFn: () => {
            if (headers.Authorization.includes("undefined") === false) {
                return URI.get('/historico', { headers }).then(res => res.data)
            }
            //  axios.get('http://localhost:7070/historico', { headers }).then(res => res.data)
        },
        queryKey: ["historic"],
        onSuccess: (data) => {
            console.log(data.length)
        },
        onError: (err) => console.log(err)
    })


    return (
        <Container>

            <button onClick={() => refetch()}>
                Carregar o histórico
            </button>
            <table>
                {
                    isPending ?
                        <LoadingSpin
                            duration="4s"
                            width="15px"
                            timingFunction="ease-in-out"
                            direction="alternate"
                            size="60px"
                            primaryColor="#1976d2"
                            secondaryColor="#333"
                            numberOfRotationsInAnimation={3}
                        /> :
                        <>
                            <thead>
                                <td>Responsável</td>
                                <td>Campo</td>
                                <td>Alteração</td>
                                <td>Data da alteração</td>
                                <td>Contrato afetado</td>
                            </thead>
                            <tbody>
                                {

                                    data &&
                                    data.map(res => (
                                        <tr key={res.id}>
                                            <td>{res.responsible}</td>
                                            <td>{res.information.field}</td>
                                            <td>{res.information.to}</td>
                                            <td>{new Date(res.date).toLocaleString()}</td>
                                            <td>{res.information.from}</td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </>

                }

            </table>

        </Container>
    )
}
