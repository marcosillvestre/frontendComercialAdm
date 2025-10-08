// import React from 'react'

import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { InputSearcher } from '../../../components/inputs/input.search/index.jsx';
import { OrderMoreFilters } from '../../../components/multiFilters/moreFilters.orders/index.jsx';
import { SelectOrders } from '../../../components/selects/select.Orders';
import TableOrders from '../../../components/tables/tableOrders/index.jsx';
import { useOrders } from '../../../hooks/orders/ordersContext.hook.jsx';
import businessRules from '../../utils/Rules/options.jsx';
import { Container, Header } from "./styles.jsx";

export const Orders = () => {
    const { predeterminedPeriods } = businessRules;

    const { search, handleSelect, initialDate, endDate,
        setQuery, query, typeFilter, setTypeFilter } = useOrders();

    const [searcher, setSearcher] = useState('')


    const handleInput = (_, data) => {
        if (!data) setQuery('')
        setSearcher(data)
    }

    return (
        <Container>
            <nav
                className='over-nav'
            >
                <h3>Controle de pedidos</h3>

            </nav>
            <Header>
                <nav className='flex'>
                    <label htmlFor="">
                        <p>
                            Período
                        </p>
                        <SelectOrders
                            label={search}
                            option={predeterminedPeriods}
                            fn={[handleSelect]}
                            width="5rem"
                            where="filter"
                        />


                        {
                            initialDate &&
                            `${initialDate !== null ? new Date(initialDate).toLocaleDateString() : ""} ~ ${endDate !== null ? new Date(endDate).toLocaleDateString() : ""}`
                        }
                    </label>


                    <form className='flex' >
                        <label htmlFor="">

                            <p>
                                Pesquisar
                            </p>

                            <InputSearcher
                                label={query}
                                field=''
                                fn={[handleInput]}
                                width='15rem'
                                border='transparent'
                                color='#dfe6f1'
                            />

                        </label>

                        <button type='submit'
                            className='sender'
                            onClick={(e) => {
                                setQuery(searcher)
                                e.preventDefault()
                            }}
                        >
                            <SearchIcon />
                        </button>
                    </form>


                    <OrderMoreFilters />

                    {
                        typeFilter?.length > 0 &&
                        <button
                            className='defaultButton redButton'
                            onClick={() => setTypeFilter([])}
                        >
                            limpar filtros
                        </button>
                    }

                </nav>

            </Header>


            <TableOrders />

        </Container>
    )
} 
