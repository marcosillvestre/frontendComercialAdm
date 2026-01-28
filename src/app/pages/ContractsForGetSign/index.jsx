import { useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { InputSearcher } from '../../../components/inputs/input.search/index.jsx'
import { ContractData, Select } from '../../../components/source.jsx'
import TableContracts from '../../../components/tables/tableContracts/index.jsx'
import { useSignContracts } from '../../../hooks/signContracts/sign.hook.jsx'
import { useUser } from '../../../hooks/userContext'
import { Container, Header } from './styles'


export const Contracts = () => {
    const [searcher, setSearcher] = useState('')

    const { filteredContracts, setFilteredContracts } = useUser()
    const { setSign, contractOptions, queryFunnels, setQuery, query, funnelsQuery } = useSignContracts();

    const { funnels } = queryFunnels;
    const { isPending } = funnelsQuery;

    async function dataFilter(e) {
        setSign(e)
        setFilteredContracts(undefined)
    }

    function filterData(search) {
        setQuery(search);
    }

    const handleInput = (_, data) => {
        if (!data) setQuery('')
        setSearcher(data)
    }

    return (

        <Container>
            <nav
                className='over-nav label-outside'
            >
                <h3>Criação de contratos</h3>

            </nav>
            <Header className='search'
            >
                <div className='inputs'>
                    <label htmlFor="">

                        <p className='label-outside'> Funil:</p>

                        {
                            isPending ?
                                "carregando"
                                :
                                <Select
                                    label={'Funil de Vendas PTB'}
                                    option={funnels}
                                    width="13rem"
                                    field="type"
                                    fn={[dataFilter]}
                                />
                        }
                    </label>
                    {
                        filteredContracts === undefined &&
                        <label >
                            <p className='label-outside'>Cliente: </p>
                            <form action=""
                                className='searcher'
                            >

                                <InputSearcher
                                    label={query}
                                    field=''
                                    fn={[handleInput]}
                                    width='15rem'
                                    border='transparent'
                                />

                                <button
                                    type='submit'
                                    onClick={(e) => {
                                        filterData(searcher)
                                        e.preventDefault()
                                    }}>
                                    <SearchIcon />
                                </button>
                            </form>
                            <datalist id='person' >
                                {
                                    contractOptions !== undefined &&
                                    contractOptions?.contracts.map((res, i) => (
                                        <option
                                            key={i}
                                            value={res["name"]}
                                        >
                                            Aluno: {res["student"]}
                                        </option>

                                    ))
                                }
                            </datalist>

                        </label>
                    }
                </div>

            </Header>
            {
                filteredContracts === undefined ?
                    <TableContracts /> :
                    <ContractData />
            }


        </Container>
    )

}




