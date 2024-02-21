// import React from 'react';

import { useEffect, useState } from 'react';
import MiniDrawer from '../../../components/sideBar';
import { useUser } from '../../../hooks/userContext';
import { Container, List } from './styles';



export const Historic = () => {

    const { HistoricData, historic } = useUser()

    const [realData, setRealData] = useState([])

    useEffect(() => {
        HistoricData.mutate()
    }, [])

    return (
        <Container>
            <MiniDrawer />
            <div>
                Período
                <select name="" id="">

                </select>
                Tipo de alteração

                <select name="" id="">

                </select>
                Responsável

                <select name="" id="">

                </select>
            </div>

            {
                realData &&
                realData.map(res => (
                    <List key={res.id}>

                        <p>
                            <strong>{res.responsible}</strong> alterou o campo <strong>{res.information.field}</strong> para <strong>{res.information.to}</strong> no contrato : {res.information.from}
                        </p>

                        ás {new Date(res.date).toLocaleString()}
                    </List>
                ))
            }

        </Container>
    )
}
