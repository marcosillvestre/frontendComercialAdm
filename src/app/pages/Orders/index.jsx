// import React from 'react'

import {
    // CloserClick, 
    Select
} from '../../../components/source.jsx';
import TableOrders from '../../../components/tables/tableOrders/index.jsx';
import { useOrders } from '../../../hooks/orders/ordersContext.hook.jsx';
import businessRules from '../../utils/Rules/options.jsx';
import { Container, Header } from "./styles.jsx";

export const Orders = () => {
    const { predeterminedPeriods } = businessRules
    const { search, handleInput } = useOrders()


    const rest = predeterminedPeriods.filter(res => !res.name.includes("Personalizado"))


    return (
        <Container>

            <Header>
                <nav>
                    <label htmlFor="">
                        <p>
                            Período
                        </p>
                        <Select
                            label={search}
                            option={rest}
                            fn={[handleInput]}
                            width="5rem"
                        />

                    </label>

                    {/* <label htmlFor="">
                        <p>
                            Pesquisar por nome
                        </p>
                        <InputSearch
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />

                    </label>
                    <button className='sender' onClick={() => sender()}>
                        <SearchIcon />
                    </button> */}

                </nav>

            </Header>


            <TableOrders />

        </Container>
    )
} 
