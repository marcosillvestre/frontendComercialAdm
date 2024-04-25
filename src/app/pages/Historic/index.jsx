// import React from 'react';
import LoadingSpin from 'react-loading-spin';
import { useUser } from '../../../hooks/userContext';

import businessRules from '../../utils/Rules/options.jsx';
import { Container } from './styles';

export const Historic = () => {

    const { historic, refetchHistoric, isPendingHistoric } = useUser()
    const { fields } = businessRules

    return (
        <Container>
            <button onClick={() => refetchHistoric()}>
                Carregar o histórico
            </button>
            <table>
                {
                    isPendingHistoric ?
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

                                    historic &&
                                    historic.map(res => (
                                        <tr key={res.id}>
                                            <td>{res.responsible}</td>
                                            <td>{fields[res.information.field]}</td>
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
