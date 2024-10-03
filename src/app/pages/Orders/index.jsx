// import React from 'react'

import {
    // CloserClick, 
    Select
} from '../../../components/source.jsx';
import TableOrders from '../../../components/tableOrders/index.jsx';
import { Container, Header, InputSearch } from "./styles.jsx";

export const Orders = () => {


    return (
        <Container>

            <Header>

                <nav>
                    <label htmlFor="">
                        <p>
                            Período personalizado:
                        </p>
                        <Select
                            // label={businessRules.predeterminedPeriods[0].name}
                            // option={predeterminedPeriods}
                            // fn={[handleInput]}
                            width="5rem"
                        />

                    </label>

                    <label htmlFor="">
                        <p>
                            Pesquisar por nome:
                        </p>
                        <InputSearch
                        // label={businessRules.predeterminedPeriods[0].name}
                        // option={predeterminedPeriods}
                        // fn={[handleInput]}
                        />

                    </label>

                </nav>

            </Header>


            <TableOrders />
        </Container>
    )
} 
