// import React from 'react'

import SearchIcon from '@mui/icons-material/Search';
import { useRef } from 'react';
import { OrderMoreFilters } from '../../../components/moreFilters.orders/index.jsx';
import { SelectOrders } from '../../../components/selects/select.Orders';
import TableOrders from '../../../components/tables/tableOrders/index.jsx';
import { useOrders } from '../../../hooks/orders/ordersContext.hook.jsx';
import businessRules from '../../utils/Rules/options.jsx';
import { Container, Header, InputSearch } from "./styles.jsx";

export const Orders = () => {
    const { predeterminedPeriods } = businessRules
    const { search, handleInput, initialDate, endDate, setQuery } = useOrders()
    const searching = useRef()

    return (
        <Container>

            <Header>
                <nav className='flex'>
                    <label htmlFor="">
                        <p>
                            Período
                        </p>
                        <SelectOrders
                            label={search}
                            option={predeterminedPeriods}
                            fn={[handleInput]}
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
                            <InputSearch
                                placeholder='pesquisar...'
                                title='busque por nome, livro ou unidade'
                                ref={searching}
                                onChange={(e) => e.target.value === "" && setQuery(undefined)}
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


                    <OrderMoreFilters />

                </nav>

            </Header>


            <TableOrders />

        </Container>
    )
} 
