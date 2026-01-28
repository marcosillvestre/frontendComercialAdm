// import React from 'react'

import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
// import { OrderMoreFilters } from '../../../components/moreFilters.orders/index.jsx';
import { InputSearcher } from '../../../components/inputs/input.search/index.jsx';
import { SelectHistoricOrders } from '../../../components/selects/select.HistoricOrders/index.jsx';
import TableRequests from '../../../components/tables/tableRequests/index.jsx';
import { useRequests } from '../../../hooks/requests/requestsContext.hook.jsx';
import businessRules from '../../utils/Rules/options.jsx';
import { Container, Header } from "./styles.jsx";

export const HistoricOrders = () => {
    const { predeterminedPeriods } = businessRules
    const [searcher, setSearcher] = useState('')

    const { search, handleSelect, initialDate, endDate,
        setQuery, query, typeFilter, setTypeFilter } = useRequests()


    const handleInput = (_, data) => {
        if (!data) setQuery('')
        setSearcher(data)
    }

    return (
        <Container>
            <nav
                className='over-nav'
            >
                <h3>Histórico de pedidos</h3>

            </nav>
            <Header>
                <nav>

                    <label htmlFor="">
                        <p className='label-outside'>Período:</p>
                        <SelectHistoricOrders
                            label={search}
                            option={predeterminedPeriods}
                            fn={[handleSelect]}
                            width="13rem"
                            where="filter"
                        />

                        {
                            initialDate &&
                            `${initialDate !== null ? new Date(initialDate)
                                .toLocaleDateString() : ""} ~ ${endDate !== null ? new Date(endDate).toLocaleDateString() : ""}`
                        }
                    </label>


                    <form className='flex' >
                        <label htmlFor="">

                            <p className='label-outside'>Pesquisar:</p>

                            <InputSearcher
                                label={query}
                                field=''
                                fn={[handleInput]}
                                width='15rem'
                                border='transparent'
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

                    {
                        typeFilter?.length > 0 &&
                        <button
                            className='clean'
                            onClick={() => setTypeFilter([])}
                        >
                            limpar filtros
                        </button>
                    }

                </nav>

            </Header>


            <TableRequests />

        </Container>
    )
} 
