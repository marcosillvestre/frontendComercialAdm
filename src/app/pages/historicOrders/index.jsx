// import React from 'react'

import SearchIcon from '@mui/icons-material/Search';
import { useRef } from 'react';
// import { OrderMoreFilters } from '../../../components/moreFilters.orders/index.jsx';
import { SelectHistoricOrders } from '../../../components/selects/select.HistoricOrders/index.jsx';
import TableRequests from '../../../components/tables/tableRequests/index.jsx';
import { useRequests } from '../../../hooks/requests/requestsContext.hook.jsx';
import businessRules from '../../utils/Rules/options.jsx';
import { Container, Header, InputSearch } from "./styles.jsx";

export const HistoricOrders = () => {
    const { predeterminedPeriods } = businessRules

    const { search, handleInput, initialDate, endDate,
        setQuery, typeFilter, setTypeFilter } = useRequests()

    const searching = useRef()

    return (
        <Container>
            <nav
                className='over-nav'
            >
                <h3>Histórico de pedidos</h3>

            </nav>
            <Header>
                <nav className='flex'>
                    <label htmlFor="">
                        <p>
                            Período
                        </p>
                        <SelectHistoricOrders
                            label={search}
                            option={predeterminedPeriods}
                            fn={[handleInput]}
                            width="5rem"
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

                            <p>
                                Pesquisar
                            </p>
                            <InputSearch
                                placeholder="Pesquisar"
                                title='busque pelo cliente ou aluno'
                                ref={searching}
                                className='inputSearch'
                                onChange={(e) => e.target.value === "" &&
                                    setQuery(undefined)}
                            />
                        </label>

                        <button type='submit'
                            className='sender'
                            onClick={(e) => {
                                setQuery(searching.current.value)
                                e.preventDefault()
                            }}
                        >
                            <SearchIcon />
                        </button>
                    </form>


                    {/* <OrderMoreFilters /> */}

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
